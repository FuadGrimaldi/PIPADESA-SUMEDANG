// src/app/subdomain/dashboard/layout.tsx
import "../globals.css";
import DashboardLayoutClient from "./AdmindesaLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard Admin Desa",
  description: "Panel kontrol admin desa",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    return null;
  }

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
