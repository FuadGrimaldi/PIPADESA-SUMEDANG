import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDesaById } from "@/lib/prisma-services/profileDesaService";
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  const desa = await getDesaById(Number(session?.user?.desaId));
  return (
    <div>
      <h1 className="text-2xl font-bold text-black">
        Dashboard Admin {desa?.nama_desa}
      </h1>
      <p>Ini adalah halaman dashboard untuk admin desa.</p>
      {/* Add more content as needed */}
    </div>
  );
}
