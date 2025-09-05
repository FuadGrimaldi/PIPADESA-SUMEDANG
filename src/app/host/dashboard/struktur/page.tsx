import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DesaManagerKab from "@/components/AdminKab/Desa";
import OfficialManagerKab from "@/components/AdminKab/Struktur";

export default async function VideoAdminDesaPage() {
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
