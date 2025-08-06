"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

type GaleriItem = {
  id: number;
  desa_id: number;
  judul: string;
  gambar_url: string;
};

const galeriData: GaleriItem[] = [
  {
    id: 1,
    desa_id: 1,
    judul: "Kegiatan Gotong Royong",
    gambar_url:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-01.jpg",
  },
  {
    id: 2,
    desa_id: 1,
    judul: "Pembangunan Jalan Desa",
    gambar_url:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-02.jpg",
  },
  {
    id: 3,
    desa_id: 1,
    judul: "Peringatan Hari Kemerdekaan",
    gambar_url:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-03.jpg",
  },
  {
    id: 4,
    desa_id: 1,
    judul: "Pelatihan Keterampilan Warga",
    gambar_url:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-02.jpg",
  },
  {
    id: 5,
    desa_id: 1,
    judul: "Kegiatan Gotong Royong",
    gambar_url:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-01.jpg",
  },
  {
    id: 6,
    desa_id: 1,
    judul: "Pembangunan Jalan Desa",
    gambar_url:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-02.jpg",
  },
  {
    id: 7,
    desa_id: 1,
    judul: "Peringatan Hari Kemerdekaan",
    gambar_url:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-03.jpg",
  },
];

const ITEMS_PER_PAGE = 6;

const Galeri = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(galeriData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = galeriData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  if (currentItems.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Galeri Desa
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Temukan berbagai foto dan momen berharga dari kegiatan dan
              peristiwa di desa kita.
            </p>
          </div>
        </div>
        <div className="text-center text-gray-500">
          Tidak ada galeri yang tersedia.
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
              Galeri Desa
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Temukan berbagai foto dan momen berharga dari kegiatan dan
              peristiwa di desa kita.
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
              className="group relative bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={agenda.gambar_url}
                  alt={agenda.judul}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Overlay Gradient + Title */}
              <div className="absolute inset-0 flex items-end">
                <div className="w-full h-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:h-1/2 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                  <h3 className="lg:text-lg text-[10px] font-bold">
                    {agenda.judul}
                  </h3>
                </div>
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

export default Galeri;
