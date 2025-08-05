"use client";
import Image from "next/image";
import React, { useState } from "react";
import CardNews from "../Card/NewsCard";
import { motion } from "framer-motion";

type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
};

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Gotong Royong Bersihkan Lingkungan",
    category: "Berita Desa",
    excerpt:
      "Warga Desa Cikeusi melaksanakan kegiatan gotong royong membersihkan jalan utama desa...",
    date: "2025-07-30",
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-01.jpg",
  },
  {
    id: 2,
    title: "Pelatihan UMKM untuk Warga",
    category: "Berita Desa",
    excerpt:
      "Pelatihan UMKM dilaksanakan untuk meningkatkan keterampilan usaha mikro masyarakat...",
    date: "2025-07-28",
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-02.jpg",
  },
  {
    id: 3,
    title: "Penyaluran Bantuan Sosial",
    category: "Berita Desa",
    excerpt:
      "Desa Cikeusi menyalurkan bantuan sosial kepada warga kurang mampu...",
    date: "2025-07-25",
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-03.jpg",
  },
  {
    id: 4,
    title: "Pembukaan Jalan Baru",
    category: "Berita Desa",
    excerpt:
      "Jalan penghubung antar dusun resmi dibuka untuk memudahkan akses transportasi...",
    date: "2025-07-20",
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-03.jpg",
  },
  {
    id: 5,
    title: "Penyaluran Bantuan Sosial",
    category: "Berita Desa",
    excerpt:
      "Desa Cikeusi menyalurkan bantuan sosial kepada warga kurang mampu...",
    date: "2025-07-25",
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-03.jpg",
  },
  {
    id: 6,
    title: "Pembukaan Jalan Baru",
    category: "Berita Desa",
    excerpt:
      "Jalan penghubung antar dusun resmi dibuka untuk memudahkan akses transportasi...",
    date: "2025-07-20",
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-03.jpg",
  },
  {
    id: 7,
    title: "Pembukaan Jalan Baru",
    category: "Kegiatan Desa",
    excerpt:
      "Jalan penghubung antar dusun resmi dibuka untuk memudahkan akses transportasi...",
    date: "2025-07-20",
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-03.jpg",
  },
];
const ITEMS_PER_PAGE = 6;
const AllBerita = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(newsData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = newsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  if (currentItems.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Berita & Informasi Desa
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Temukan berbagai kabar terbaru, pengumuman resmi, dan informasi
              penting seputar kegiatan dan perkembangan di lingkungan kita.
            </p>
          </div>
        </div>
        <div className="text-center text-gray-500">
          Tidak ada berita yang tersedia.
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
              Berita & Informasi Desa
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
          className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentItems.map((news) => (
            <CardNews
              key={news.id}
              date={news.date}
              CardTitle={news.title}
              CardDescription={news.excerpt}
              image={news.image}
              category={news.category}
            />
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

export default AllBerita;
