import type { Metadata } from "next";
import "../globals.css";
import SubdomainNavGuest from "@/components/Navbar/SubdomainNavGuest";
import { headers } from "next/headers";

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
        <main className="min-h-screen">{children}</main>

        <footer className="bg-gray-800 text-white p-6 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Website Desa. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
