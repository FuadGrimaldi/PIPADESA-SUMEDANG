import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDesaById } from "@/lib/prisma-services/profileDesaService";
import Dashboard from "@/components/Admindesa/Dashboard";
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  const desa = await getDesaById(Number(session?.user?.desaId));
  return (
    <div>
      <Dashboard desaId={Number(session?.user?.desaId)} />
      {/* Add more content as needed */}
    </div>
  );
}
