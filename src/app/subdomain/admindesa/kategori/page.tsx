import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDesaById } from "@/lib/prisma-services/profileDesaService";
import KategoriManager from "@/components/Admindesa/Kategori";

export default async function OrganisasiAdminDesaPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  const desa = await getDesaById(Number(session?.user?.desaId));
  if (!desa) {
    return <div className="container min-h-screen">Desa not found</div>;
  }
  return (
    <div className="container min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Official {desa?.nama_desa}</h1>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <KategoriManager desaId={Number(desa.id)} />
    </div>
  );
}
