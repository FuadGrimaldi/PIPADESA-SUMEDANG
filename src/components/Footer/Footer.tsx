"use client";

import { Home, User, BarChart2, Newspaper, LayoutGrid } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-800 to-slate-700 text-white px-6 lg:px-[100px] py-3 pt-0 lg:pt-5">
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
          <p className="text-sm">Jl. Prabu Gajah Agung No. 1 Sumedang</p>
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
