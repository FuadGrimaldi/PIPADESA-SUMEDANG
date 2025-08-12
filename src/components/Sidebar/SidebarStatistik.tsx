"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart3,
  Users,
  GraduationCap,
  Heart,
  Briefcase,
  Building,
  Shield,
  Zap,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/clsx";

// Menu data structure
const menuData = [
  {
    title: "Kependudukan",
    icon: Users,
    items: [
      { title: "Jenis Kelamin", url: "/statistik/jenis-kelamin" },
      {
        title: "Kelompok Umur - Jenis Kelamin",
        url: "/statistik/jenis-kelamin/kelompok-umur",
      },
      { title: "Agama", url: "/statistik/agama" },
      { title: "Status Perkawinan", url: "/status-perkawinan" },
      {
        title: "Kelompok Umur - Status Perkawinan",
        url: "/kelompok-umur-status-perkawinan",
      },
    ],
  },
  {
    title: "Pendidikan",
    icon: GraduationCap,
    items: [
      { title: "Partisipasi Sekolah", url: "/partisipasi-sekolah" },
      { title: "Ijazah", url: "/ijazah" },
    ],
  },
  {
    title: "Kesehatan",
    icon: Heart,
    items: [
      { title: "Jaminan Kesehatan", url: "/jaminan-kesehatan" },
      { title: "Disabilitas", url: "/disabilitas" },
      { title: "Penyakit Kronis", url: "/penyakit-kronis" },
    ],
  },
  {
    title: "Ketenagakerjaan",
    icon: Briefcase,
    items: [{ title: "Lapangan Usaha", url: "/lapangan-usaha" }],
  },
  {
    title: "Perumahan & Aset",
    icon: Building,
    items: [
      { title: "Perumahan", url: "/perumahan" },
      { title: "Kepemilikan Aset", url: "/kepemilikan-aset" },
      { title: "Bahan Bakar Utama", url: "/bahan-bakar-utama" },
      { title: "Sumber Air Minum Utama", url: "/sumber-air-minum-utama" },
      { title: "Pembuangan Akhir Tinja", url: "/pembuangan-akhir-tinja" },
    ],
  },
  {
    title: "Struktur Bangunan",
    icon: Shield,
    items: [
      { title: "Jenis Lantai Terluas", url: "/jenis-lantai-terluas" },
      { title: "Jenis Atap Terluas", url: "/jenis-atap-terluas" },
      { title: "Jenis Dinding", url: "/jenis-dinding" },
      { title: "Kualitas Atap Terluas", url: "/kualitas-atap-terluas" },
      { title: "Kualitas Dinding", url: "/kualitas-dinding" },
    ],
  },
  {
    title: "Utilitas",
    icon: Zap,
    items: [{ title: "Sumber Daya Listrik", url: "/sumber-daya-listrik" }],
  },
];

export default function VillageSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [openSections, setOpenSections] = React.useState<string[]>([]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Close mobile menu on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-[#C0B099] text-white rounded-xl shadow-lg hover:bg-[#A0906B] transition-all duration-200"
        aria-label="Toggle navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 overflow-x-hidden",
          "transform transition-transform duration-300 ease-in-out lg:transform-none",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "bg-white rounded-none lg:rounded-xl shadow-2xl lg:shadow-lg border-r lg:border border-gray-200"
        )}
        aria-label="Statistics navigation"
      >
        {/* Sidebar Header */}
        <header className="relative overflow-hidden border-b border-white/20 bg-gradient-to-r from-slate-800 to-slate-700 p-4 sm:p-6 rounded-none lg:rounded-t-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg flex-shrink-0">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold text-white truncate">
                  Desa Cipeundeuy
                </h1>
                <p className="text-xs sm:text-sm text-white/90 truncate">
                  Portal Statistik
                </p>
              </div>
            </div>
            <button
              onClick={toggleMobile}
              className="lg:hidden flex-shrink-0 ml-2 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Sidebar Content */}
        <div className=" overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          <nav className="p-3 sm:p-4 space-y-2" role="navigation">
            {menuData.map((item, index) => (
              <div
                key={item.title}
                className="group backdrop-blur-xl rounded-xl bg-gradient-to-b from-slate-800 to-slate-700 border border-white/10"
              >
                <div className="space-y-1">
                  <button
                    onClick={() => toggleSection(item.title)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl text-left transition-all duration-300",
                      "text-white hover:text-white font-medium hover:shadow-lg hover:shadow-black/10",
                      "relative overflow-hidden group focus:outline-none"
                    )}
                    aria-expanded={openSections.includes(item.title)}
                    aria-controls={`section-${item.title}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white/90 group-hover:text-white transition-all duration-300 group-hover:scale-110 flex-shrink-0" />
                    <span className="flex-1 text-sm sm:text-base truncate">
                      {item.title}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-white/70 transition-transform duration-300 flex-shrink-0",
                        openSections.includes(item.title) ? "rotate-180" : ""
                      )}
                    />
                  </button>

                  <div
                    id={`section-${item.title}`}
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openSections.includes(item.title)
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="ml-4 sm:ml-6 mt-2 space-y-1 border-l-2 border-white/20 pl-3 sm:pl-4 px-6">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subItem.title}
                          href={subItem.url}
                          onClick={() => setIsMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-300",

                            pathname === subItem.url
                              ? "bg-white text-black font-semibold "
                              : "text-white/80 hover:text-white hover:bg-white/15"
                          )}
                          style={{
                            animationDelay: `${subIndex * 50}ms`,
                          }}
                        >
                          <span className="relative truncate ">
                            {subItem.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
