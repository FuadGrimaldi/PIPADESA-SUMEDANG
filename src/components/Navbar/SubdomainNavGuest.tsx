"use client";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  User,
  Settings,
  BarChart3,
  FileText,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Kategori {
  id: number;
  nama_kategori: string;
}

export default function SubdomainNavGuest({
  nama_desa,
  username,
  desaId,
}: {
  nama_desa: string | null;
  username: string | null;
  desaId: number | null;
}) {
  const [kategoris, setKategoris] = useState<Kategori[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchKategoris() {
      try {
        const res = await fetch("/api/organisasi/kategori/subdomain/" + desaId);
        if (!res.ok) throw new Error("Failed to fetch kategori");
        const data = await res.json();
        setKategoris(data);
      } catch (error) {
        setKategoris([]);
      }
    }
    fetchKategoris();
  }, [desaId]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const menuItems = [
    { name: "Beranda", href: "/", icon: Home },
    {
      name: "Profil Desa",
      icon: User,
      submenu: [
        { name: "Visi Misi", href: "/visi-misi" },
        { name: "Struktur", href: "/struktur" },
        { name: "Sejarah", href: "/sejarah" },
        { name: "Kontak", href: "/kontak" },
      ],
    },
    {
      name: "Layanan",
      icon: Settings,
      submenu: [
        { name: "Daftar Instansi", href: "/instansi" },
        { name: "Daftar Layanan", href: "/layanan" },
        // { name: "Lapor!", href: "/pengaduan" },
        { name: "Pengaduan dan Aspirasi", href: "/pengaduan-aspirasi" },
      ],
    },
    {
      name: "Statistik Desa",
      icon: BarChart3,
      submenu: [
        {
          name: "Desa Cantik",
          href: `https://e-officedesa.sumedangkab.go.id/dashboard_desa_cantik/desa/${desaId}`,
        },
        {
          name: "E-Sakip Desa",
          href: `https://e-officedesa.sumedangkab.go.id/dashboard_sakip/desa/${desaId}`,
        },
        {
          name: "Desa Simpatik",
          href: `https://e-officedesa.sumedangkab.go.id/dashboard_simpatik/desa/${desaId}`,
        },
        { name: "Status SDGS", href: "/sdgs" },
      ],
    },
    {
      name: "Publikasi",
      icon: FileText,
      submenu: [
        { name: "Berita & Informasi", href: "/berita" },
        { name: "Agenda", href: "/agenda" },
        { name: "Galeri", href: "/galeri" },
        { name: "Video", href: "/video" },
        { name: "Informasi Lainnya", href: "/informasi-tambahan" },
      ],
    },
    {
      name: "Direktori",
      icon: BookOpen,
      submenu: [
        ...kategoris.map((kategori) => ({
          name: kategori.nama_kategori,
          href: `/direktori/${kategori.nama_kategori.toLowerCase()}`,
        })),
        { name: "Sarana", href: "/sarana" },
        { name: "Wisata", href: "/wisata" },
      ],
    },
  ];

  return (
    <>
      {/* Navbar */}
      <div
        className={`fixed w-[87%] mx-auto z-30 top-2 left-0 right-0 transition-all duration-300 rounded-2xl     ${
          isScrolled
            ? "backdrop-blur-md bg-white/80 shadow-lg border-b border-gray-200/50"
            : "backdrop-blur-sm bg-white/60"
        }`}
      >
        <div className=" sm:px-6 lg:px-1 mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src="/assets/logo-fix/logo-sumedang-500.png"
                  alt="Logo Sumedang"
                  width={60}
                  height={60}
                  className="object-contain"
                  unoptimized
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-lg leading-tight">
                  Desa {nama_desa || ""}
                </span>
                <span className="text-xs text-gray-600 leading-tight">
                  Sumedang
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.submenu ? (
                    <div className="relative">
                      <button className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                      </button>
                      <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200/50 py-2">
                          {item.submenu.map((subitem, subindex) => (
                            <Link
                              key={subindex}
                              href={subitem.href}
                              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium"
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Auth Button & Mobile Menu Toggle */}
            <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-lg">
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 bg-white${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleMobileMenu}
        />

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full bg-white/95 backdrop-blur-md shadow-2xl border-l border-gray-200/50">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Desa</div>
                  <div className="text-xs text-gray-600">Sumedang</div>
                </div>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-2 px-4">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index}>
                      {item.submenu ? (
                        <div>
                          <button
                            onClick={() => toggleDropdown(`mobile-${index}`)}
                            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          >
                            <div className="flex items-center space-x-3">
                              <IconComponent size={20} />
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                activeDropdown === `mobile-${index}`
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-200 ${
                              activeDropdown === `mobile-${index}`
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="pl-12 pr-4 py-2 space-y-1">
                              {item.submenu.map((subitem, subindex) => (
                                <a
                                  key={subindex}
                                  href={subitem.href}
                                  className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                  onClick={toggleMobileMenu}
                                >
                                  {subitem.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          onClick={toggleMobileMenu}
                        >
                          <IconComponent size={20} />
                          <span className="font-medium">{item.name}</span>
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
