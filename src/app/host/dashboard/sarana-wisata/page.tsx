import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SaranaWisataManager from "@/components/AdminKab/SaranaWisata";

export default async function SaranaWisataAdminKabPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div>
        <SaranaWisataManager />
      </div>
    </div>
  );
}
