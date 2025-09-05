import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardAdminKab from "@/components/AdminKab/Dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <main>
      <DashboardAdminKab />
      {/* Add more content as needed */}
    </main>
  );
}
