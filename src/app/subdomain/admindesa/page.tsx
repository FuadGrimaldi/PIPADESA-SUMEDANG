import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Admindesa/Dashboard";
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <main>
      <Dashboard desaId={Number(session?.user?.desaId)} />
      {/* Add more content as needed */}
    </main>
  );
}
