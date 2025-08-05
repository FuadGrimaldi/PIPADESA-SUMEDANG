"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

type AgendaItem = {
  id: number;
  desa_id: number;
  judul: string;
  slug: string;
  kategori: string;
  deskripsi: string;
  lokasi: string;
  waktu: string; // ISO date string
  poster: string;
  created_by: number;
  status: string;
  created_at: string;
  updated_at: string;
};

const agendaData: AgendaItem[] = [
  {
    id: 1,
    desa_id: 1,
    judul: "Gotong Royong Bersih Desa",
    slug: "gotong-royong-bersih-desa",
    kategori: "Kegiatan Sosial",
    deskripsi:
      "Kegiatan gotong royong membersihkan lingkungan desa bersama warga.",
    lokasi: "Balai Desa",
    waktu: "2025-08-10T08:00:00Z",
    poster:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-03.jpg",
    created_by: 1,
    status: "Aktif",
    created_at: "2025-08-01T10:00:00Z",
    updated_at: "2025-08-01T10:00:00Z",
  },
  {
    id: 2,
    desa_id: 1,
    judul: "Pelatihan Digital Marketing UMKM",
    slug: "pelatihan-digital-marketing-umkm",
    kategori: "Pelatihan",
    deskripsi:
      "Pelatihan khusus untuk pelaku UMKM agar bisa memasarkan produknya secara online.",
    lokasi: "Aula Desa",
    waktu: "2025-08-15T09:00:00Z",
    poster:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-01.jpg",
    created_by: 2,
    status: "Aktif",
    created_at: "2025-08-02T11:00:00Z",
    updated_at: "2025-08-02T11:00:00Z",
  },
  {
    id: 3,
    desa_id: 1,
    judul: "Lomba Agustusan",
    slug: "lomba-agustusan",
    kategori: "Lomba",
    deskripsi:
      "Lomba 17 Agustus untuk memeriahkan HUT RI dengan berbagai perlombaan seru.",
    lokasi: "Lapangan Desa",
    waktu: "2025-08-17T07:30:00Z",
    poster:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-02.jpg",
    created_by: 3,
    status: "Aktif",
    created_at: "2025-08-03T12:00:00Z",
    updated_at: "2025-08-03T12:00:00Z",
  },
  {
    id: 4,

    desa_id: 1,
    judul: "Peringatan Hari Kemerdekaan",
    slug: "peringatan-hari-kemerdekaan",
    kategori: "Peringatan",
    deskripsi:
      "Peringatan Hari Kemerdekaan Republik Indonesia dengan upacara bendera dan berbagai kegiatan",
    lokasi: "Lapangan Desa",
    waktu: "2025-08-17T08:00:00Z",
    poster:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-02.jpg",
    created_by: 4,

    status: "Aktif",
    created_at: "2025-08-04T13:00:00Z",
    updated_at: "2025-08-04T13:00:00Z",
  },
  {
    id: 5,

    desa_id: 1,
    judul: "Peringatan Hari Kemerdekaan",
    slug: "peringatan-hari-kemerdekaan",
    kategori: "Peringatan",
    deskripsi:
      "Peringatan Hari Kemerdekaan Republik Indonesia dengan upacara bendera dan berbagai kegiatan",
    lokasi: "Lapangan Desa",
    waktu: "2025-08-17T08:00:00Z",
    poster:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-02.jpg",
    created_by: 4,

    status: "Aktif",
    created_at: "2025-08-04T13:00:00Z",
    updated_at: "2025-08-04T13:00:00Z",
  },
  // Tambahkan lebih banyak dummy data kalau mau test pagination
];

const ITEMS_PER_PAGE = 6;

const AllAgenda = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(agendaData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = agendaData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const formatWaktu = (isoString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta", // Mengonversi ke Waktu Indonesia Barat
      timeZoneName: "short",
    };
    const date = new Date(isoString);
    // Menggunakan 'id-ID' untuk format bahasa Indonesia
    return date.toLocaleString("id-ID", options).replace(/\./g, ":");
  };
  if (currentItems.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Agenda Desa
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Temukan berbagai kabar terbaru, pengumuman resmi, dan informasi
              penting seputar kegiatan dan perkembangan di lingkungan kita.
            </p>
          </div>
        </div>
        <div className="text-center text-gray-500">
          Tidak ada agenda yang tersedia.
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Agenda Desa
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Temukan berbagai kabar terbaru, pengumuman resmi, dan informasi
              penting seputar kegiatan dan perkembangan di lingkungan kita.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full grid grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentItems.map((agenda) => (
            <div
              key={agenda.id}
              className="bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 rounded-xl overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={agenda.poster}
                  alt={agenda.judul}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{agenda.judul}</h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                  {agenda.kategori}
                </span>
                <p className="text-sm text-gray-600 mb-2">{agenda.deskripsi}</p>
                <p className="text-sm text-gray-500 ">
                  Lokasi: <span className="font-bold"> {agenda.lokasi}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Waktu:
                  <span className="font-bold">
                    {" "}
                    {formatWaktu(agenda.waktu)}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllAgenda;
