import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import PengaduanAspirasiManager from "@/components/AdminKab/AspirasiPengaduan";

export default async function AspirasiPengaduanAdminKabPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div>
        <PengaduanAspirasiManager />
      </div>
    </div>
  );
}
