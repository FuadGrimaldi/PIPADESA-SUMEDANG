// src/app/subdomain/dashboard/layout.tsx
import AdminDesSidabar from "@/components/Sidebar/SidebarAdminDesa";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard Admin Desa",
  description: "Panel kontrol admin desa",
};

export default async function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div>
      {/* Main Layout Grid */}
      <div className="grid z-10 grid-cols-1 lg:grid-cols-[220px_1fr] xl:grid-cols-[230px_1fr] gap-4 sm:gap-6 lg:gap-8 items-start my-[80px] bg-gradient-to-b from-white via-[#C0B099] via-50% to-white">
        {/* Sidebar */}
        <div className="order-2 lg:order-1 bg-white">
          <AdminDesSidabar />
        </div>
        {/* Content */}

        <main className="order-1 lg:order-2 w-full">
          <div className=" rounded-lg shadow p-4 min-h-[80vh] bg-white mx-6 border border-gray-200">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
