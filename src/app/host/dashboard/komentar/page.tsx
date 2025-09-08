import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import KomentarManager from "@/components/AdminKab/Komentar";

export default async function OrganisasiAdminKabPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div>
        <KomentarManager />
      </div>
    </div>
  );
}
