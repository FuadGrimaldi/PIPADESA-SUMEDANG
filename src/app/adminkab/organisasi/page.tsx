import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import KategoriManager from "@/components/AdminKab/Kategori";
import OrganisasiManager from "@/components/AdminKab/Organisasi";

export default async function OrganisasiAdminKabPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div>
        <OrganisasiManager />
      </div>
    </div>
  );
}
