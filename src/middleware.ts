import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const hostname = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  // // Tidak login → arahkan ke /login
  // if (!token) {
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }

  // // Role Admin Kab → hanya boleh akses host
  // if (token.role === "admin_kab") {
  //   if (hostname.includes(".")) {
  //     url.pathname = "/login";
  //     return NextResponse.redirect(url);
  //   }
  //   if (!url.pathname.startsWith("/adminkab")) {
  //     url.pathname = "/adminkab";
  //     return NextResponse.redirect(url);
  //   }
  // }

  // // Role Admin Desa → hanya boleh akses subdomain
  // if (token.role === "admin_desa") {
  //   const parts = hostname.split(".");
  //   const subdomain = parts.length > 1 ? parts[0] : null;

  //   if (!subdomain || subdomain === "localhost") {
  //     url.pathname = "/login";
  //     return NextResponse.redirect(url);
  //   }

  //   // Cocokkan desaId dengan subdomain
  //   if (token.desaId !== subdomain) {
  //     url.pathname = "/login";
  //     return NextResponse.redirect(url);
  //   }

  //   if (!url.pathname.startsWith("/admindesa")) {
  //     url.pathname = "/admindesa";
  //     return NextResponse.redirect(url);
  //   }
  // }

  // Handle logout req
  if (req.nextUrl.pathname === "/logout") {
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    // Redirect ke login di subdomain yang sama
    const loginUrl = `${protocol}://${hostname}/login`;
    const response = NextResponse.redirect(loginUrl);
    // Hapus cookie NextAuth session
    response.cookies.set("next-auth.session-token", "", {
      maxAge: 0,
      path: "/",
      domain: hostname.includes("localhost")
        ? undefined
        : `.${hostname.split(".").slice(-2).join(".")}`, // Set domain untuk subdomain
    });
    response.cookies.set("__Secure-next-auth.session-token", "", {
      maxAge: 0,
      path: "/",
      domain: hostname.includes("localhost")
        ? undefined
        : `.${hostname.split(".").slice(-2).join(".")}`,
    });
    return response;
  }

  // Untuk development dengan localhost
  const isLocalhost = hostname.includes("localhost");

  if (isLocalhost) {
    // Cek apakah ada subdomain di localhost
    const parts = hostname.split(".");
    if (parts.length > 1 && parts[0] !== "localhost") {
      // Ada subdomain (misal: cikeusi.localhost:3000)
      const subdomain = parts[0];

      // Check if subdomain exists via API
      return checkSubdomainAndRewrite(subdomain, url, req);
    } else {
      // Tidak ada subdomain (localhost:3000)
      // console.log("No subdomain detected, using host");
      // Rewrite ke folder host
      url.pathname = `/host${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  } else {
    // Untuk production domain
    const mainDomain = "yourdomain.com"; // Ganti dengan domain Anda
    const parts = hostname.split(".");
    if (parts.length > 2 || (parts.length === 2 && parts[0] !== "www")) {
      // Ada subdomain
      const subdomain = parts[0];

      // Check if subdomain exists via API
      return checkSubdomainAndRewrite(subdomain, url, req);
    } else {
      // Domain utama (dengan atau tanpa www)
      url.pathname = `/host${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }
}

async function checkSubdomainAndRewrite(
  subdomain: string,
  url: URL,
  req: NextRequest
) {
  try {
    // Create API URL to check subdomain
    const apiUrl = new URL(`/api/desa/subdomain/${subdomain}`, req.url);

    // Make internal API call
    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Subdomain exists, rewrite to subdomain folder
      // console.log("Subdomain exists:", subdomain);
      url.pathname = `/subdomain${url.pathname}`;
      return NextResponse.rewrite(url);
    } else {
      // Subdomain doesn't exist, redirect to root/host
      // console.log("Subdomain not found, redirecting to host");
      const protocol = req.headers.get("x-forwarded-proto") || "http";
      const hostname = req.headers.get("host") || "";
      const baseHostname = hostname.includes("localhost")
        ? "localhost:3000"
        : hostname.split(".").slice(-2).join("."); // Get main domain

      const redirectUrl = `${protocol}://${baseHostname}${url.pathname}${url.search}`;
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    // If API call fails, default to host behavior
    console.error("Error checking subdomain:", error);
    url.pathname = `/host${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|logo|news|images|fonts).*)",
  ],
};
