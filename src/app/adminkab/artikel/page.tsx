import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ArtikelManagerKab from "@/components/AdminKab/Artikel";

export default async function ArtikelAdminKabPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  const userId = Number(session.user.id);
  return (
    <div className="container min-h-screen">
      <div>
        <ArtikelManagerKab userId={userId} />
      </div>
    </div>
  );
}
