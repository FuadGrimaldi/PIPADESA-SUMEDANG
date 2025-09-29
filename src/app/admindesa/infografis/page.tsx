import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDesaById } from "@/lib/prisma-services/profileDesaService";
import InfografisManager from "@/components/Admindesa/Infografis";

export default async function InfografisAdminDesaPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const desa = await getDesaById(Number(session?.user?.desaId));
  if (!desa) {
    return <div className="container min-h-screen">Desa not found</div>;
  }
  return (
    <div className="container min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Infografis {desa?.nama_desa}</h1>
      <InfografisManager desaId={desa.id} />
    </div>
  );
}
