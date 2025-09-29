import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import OfficialManagerKab from "@/components/AdminKab/Struktur";

export default async function StrukturAdminKabPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div>
        <OfficialManagerKab />
      </div>
    </div>
  );
}
