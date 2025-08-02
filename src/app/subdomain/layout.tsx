import type { Metadata } from "next";
import "../globals.css";
import SubdomainNavGuest from "@/components/Navbar/SubdomainNavGuest";
import { headers } from "next/headers";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Website Desa",
  description: "Website resmi desa",
};

export default function SubdomainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  return (
    <html lang="id">
      <body>
        <header>
          <SubdomainNavGuest subdomain={subdomain} />
        </header>
        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
