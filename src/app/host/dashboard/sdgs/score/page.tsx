import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SdgsManager from "@/components/AdminKab/Sdgs";
import SdgsScoreManager from "@/components/AdminKab/SdgsScore";

export default async function SdgsScoreAdminKabPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div className="container min-h-screen">
      <div>
        <SdgsScoreManager />
      </div>
    </div>
  );
}
