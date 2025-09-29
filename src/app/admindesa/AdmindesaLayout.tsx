"use client";

import { SidebarProvider } from "@/context/SidebarContext";
import AppSidebar, {
  MobileMenuButton,
} from "@/components/Sidebar/SidebarAdminDesa";
import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { useSidebar } from "@/context/SidebarContext";
import AdminDesaFooter from "@/components/Footer/FooterAdminDesa";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Sidebar Fixed */}
      <div className="fixed z-30  md:hidden">
        <MobileMenuButton />
      </div>
      <div className="fixed  z-40">
        <AppSidebar />
      </div>

      {/* Main Content (ml-64 kalau expanded, ml-16 kalau collapse) */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded ? "ml-64" : "lg:ml-16 ml-0"
        }`}
      >
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 lg:mt-0 mt-12">
          {children}
        </div>
        <AdminDesaFooter />
      </div>
    </div>
  );
}

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </SidebarProvider>
    </ThemeProvider>
  );
}
