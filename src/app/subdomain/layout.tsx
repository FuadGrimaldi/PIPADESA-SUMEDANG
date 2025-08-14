import type { Metadata } from "next";
import "../globals.css";
import SubdomainNavGuest from "@/components/Navbar/SubdomainNavGuest";
import { headers } from "next/headers";
import Footer from "@/components/Footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const headersList = headers();
const host = headersList.get("host") || "";
const subdomain = host.split(".")[0];

export const metadata: Metadata = {
  title: `Website Desa ${subdomain || ""}`,
  description: "Website resmi desa",
};

export default async function SubdomainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="id">
      <body>
        <header>
          <SubdomainNavGuest
            subdomain={subdomain}
            username={session?.user?.username || null} // Pass username if available
          />
        </header>
        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
