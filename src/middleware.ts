import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // Untuk development dengan localhost
  const isLocalhost = hostname.includes("localhost");

  if (isLocalhost) {
    // Cek apakah ada subdomain di localhost
    const parts = hostname.split(".");

    if (parts.length > 1 && parts[0] !== "localhost") {
      // Ada subdomain (misal: cikeusi.localhost:3000)
      const subdomain = parts[0];
      console.log("Detected subdomain:", subdomain);

      // Rewrite ke folder subdomain
      url.pathname = `/subdomain${url.pathname}`;
      return NextResponse.rewrite(url);
    } else {
      // Tidak ada subdomain (localhost:3000)
      console.log("No subdomain detected, using host");

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
      url.pathname = `/subdomain${url.pathname}`;
      return NextResponse.rewrite(url);
    } else {
      // Domain utama (dengan atau tanpa www)
      url.pathname = `/host${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
