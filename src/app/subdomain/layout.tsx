import type { Metadata } from "next";
import "../globals.css";
import SubdomainNavGuest from "@/components/Navbar/SubdomainNavGuest";
import { headers } from "next/headers";
import Footer from "@/components/Footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDesaBySubdomain } from "@/lib/prisma-services/profileDesaService";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];

  return {
    title: `Website Desa ${subdomain || ""}`,
    description: "Website resmi desa",
  };
}

export default async function SubdomainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const session = await getServerSession(authOptions);
  const desa = await getDesaBySubdomain(subdomain);
  const desaId = Number(desa?.id) || null;

  return (
    <html lang="id">
      <body>
        <header>
          <SubdomainNavGuest
            subdomain={subdomain}
            desaId={desaId}
            username={session?.user?.username || null}
          />
        </header>
        <main className="bg-gray-100">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
