import type { Metadata } from "next";
import "../../globals.css";
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
    title: `SID Desa ${subdomain || ""}`,
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
    <>
      <SubdomainNavGuest
        subdomain={subdomain}
        desaId={desaId}
        username={session?.user?.username || null}
      />
      <main className="bg-gray-100">{children}</main>
      <Footer />
    </>
  );
}
