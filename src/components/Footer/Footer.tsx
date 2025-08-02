"use client";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Home,
  User,
  BarChart2,
  Newspaper,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#5F5D7E] text-white px-6 lg:px-[100px] py-3 pt-0 lg:pt-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & Info */}
        <div className="space-y-4">
          <Image
            src="/assets/logo-fix/logo-sumedang-500.png"
            alt="Logo Sumedang"
            width={100}
            height={100}
            className="object-contain transition-transform duration-300 hover:scale-110"
          />
          <h2 className="font-bold text-lg">Kab. Sumedang</h2>
          <p className="text-sm">026 - 202056</p>
          <div className="flex gap-4 mt-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#5F5D7E] hover:opacity-80 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2C5.678 2 4 3.678 4 5.75v12.5C4 20.322 5.678 22 7.75 22h8.5C18.322 22 20 20.322 20 18.25V5.75C20 3.678 18.322 2 16.25 2h-8.5zM12 18.5c-3.313 0-6-2.686-6-6 0-3.314 2.687-6 6-6 3.314 0 6 2.686 6 6 0 3.314-2.686 6-6 6zm0-1.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div>
          <h3 className="font-semibold text-lg mb-4 relative">
            Menu
            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-white/30"></div>
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="group">
              <Link
                href="/"
                className="flex items-center gap-2 transition-all duration-300 hover:text-white/80 hover:translate-x-2 relative"
              >
                <Home
                  size={16}
                  className="transition-colors duration-300 group-hover:text-blue-300"
                />
                <span className="relative">
                  Beranda
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            </li>
            <li className="group">
              <Link
                href="/profil"
                className="flex items-center gap-2 transition-all duration-300 hover:text-white/80 hover:translate-x-2 relative"
              >
                <User
                  size={16}
                  className="transition-colors duration-300 group-hover:text-blue-300"
                />
                <span className="relative">
                  Profil
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            </li>
            <li className="group">
              <Link
                href="/statistik"
                className="flex items-center gap-2 transition-all duration-300 hover:text-white/80 hover:translate-x-2 relative"
              >
                <BarChart2
                  size={16}
                  className="transition-colors duration-300 group-hover:text-blue-300"
                />
                <span className="relative">
                  Statistik
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            </li>
            <li className="group">
              <Link
                href="/berita"
                className="flex items-center gap-2 transition-all duration-300 hover:text-white/80 hover:translate-x-2 relative"
              >
                <Newspaper
                  size={16}
                  className="transition-colors duration-300 group-hover:text-blue-300"
                />
                <span className="relative">
                  Berita & Informasi
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Layanan */}
        <div>
          <h3 className="font-semibold text-lg mb-4 relative">
            Layanan
            <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-white/30"></div>
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="group">
              <Link
                href="/layanan"
                className="flex items-center gap-2 transition-all duration-300 hover:text-white/80 hover:translate-x-2 relative"
              >
                <LayoutGrid
                  size={16}
                  className="transition-colors duration-300 group-hover:text-green-300"
                />
                <span className="relative">
                  Layanan Publik
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            </li>
            <li className="group">
              <Link
                href="/instansi"
                className="flex items-center gap-2 transition-all duration-300 hover:text-white/80 hover:translate-x-2 relative"
              >
                <User
                  size={16}
                  className="transition-colors duration-300 group-hover:text-green-300"
                />
                <span className="relative">
                  Daftar Instansi
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Download App */}
        <div className="space-y-6">
          <div className="group">
            <h3 className="font-semibold text-lg relative">
              Download Aplikasi MPP
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-white/30"></div>
            </h3>
            <p className="text-sm mt-1 mb-2">
              Download aplikasi antrian MPP, silahkan klik icon di bawah
            </p>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/assets/logo-fix/playstore.png"
                alt="Google Play MPP"
                width={120}
                height={36}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              />
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </div>
          </div>

          <div className="group">
            <h3 className="font-semibold text-lg relative">
              Download Aplikasi Tahu Sumedang
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-white/30"></div>
            </h3>
            <p className="text-sm mt-1 mb-2">
              Download aplikasi Tahu Sumedang, silahkan klik icon di bawah
            </p>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/assets/logo-fix/playstore.png"
                alt="Google Play Tahu"
                width={120}
                height={36}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              />
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-6 border-t border-white/20 text-center text-sm text-white/70 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        © 2025 Kabupaten Sumedang. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
