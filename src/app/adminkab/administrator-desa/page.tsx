import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import OfficialManagerKab from "@/components/AdminKab/Struktur";
import UserManagerKab from "@/components/AdminKab/Users";

export default async function UsersAdminKabPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div>
        <UserManagerKab role="admin_desa" />
      </div>
    </div>
  );
}
