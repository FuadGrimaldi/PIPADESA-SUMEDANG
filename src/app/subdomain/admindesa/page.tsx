import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDesaById } from "@/lib/prisma-services/profileDesaService";

export default async function AdminDesaPage() {
  const session = await getServerSession(authOptions);
  const desa = await getDesaById(Number(session?.user?.desaId));

  return (
    <div className="container min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin {desa?.nama_desa}</h1>
      <p>Ini adalah halaman utama untuk admin desa.</p>
      {/* Add more content as needed */}
    </div>
  );
}
