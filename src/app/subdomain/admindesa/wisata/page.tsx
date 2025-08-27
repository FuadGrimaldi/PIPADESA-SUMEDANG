import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDesaById } from "@/lib/prisma-services/profileDesaService";
import SaranaManager from "@/components/Admindesa/Sarana";

export default async function WisataAdminDesaPage() {
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
      <h1 className="text-2xl font-bold mb-4">Wisata {desa?.nama_desa}</h1>
      <SaranaManager desaId={desa.id} tipe="wisata" />
    </div>
  );
}
