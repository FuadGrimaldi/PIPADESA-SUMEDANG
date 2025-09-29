import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDesaById } from "@/lib/prisma-services/profileDesaService";
import ArticleManager from "@/components/Admindesa/article";
export default async function StrukturAdminDesaPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  const desa = await getDesaById(Number(session?.user?.desaId));
  const userId = Number(session?.user?.id);
  if (!desa) {
    return <div className="container min-h-screen">Desa not found</div>;
  }
  return (
    <div className="container min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Official {desa?.nama_desa}</h1>
      {/* komponen yang menampilkan prodfile dari desa cipeundeuy */}
      <ArticleManager desaId={desa.id} userId={userId} />
    </div>
  );
}
