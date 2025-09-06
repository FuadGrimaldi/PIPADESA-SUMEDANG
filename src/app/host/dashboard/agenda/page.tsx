import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AgendaManagerKab from "@/components/AdminKab/Agenda";

export default async function AgendaAdminKabPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  const userId = Number(session.user.id);
  return (
    <div className="container min-h-screen">
      <div>
        <AgendaManagerKab />
      </div>
    </div>
  );
}
