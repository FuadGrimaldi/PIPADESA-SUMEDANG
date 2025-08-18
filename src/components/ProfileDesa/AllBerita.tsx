"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import CardNews from "../Card/NewsCard";
import { motion } from "framer-motion";

type NewsItem = {
  id: number;
  des_id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
};

const newsData: NewsItem[] = [
  {
    id: 1,
    des_id: 1,
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
    des_id: 1,
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
    des_id: 1,
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
    des_id: 1,
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
    des_id: 1,
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
    des_id: 1,
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
    des_id: 1,
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

  const getPageFromURL = () => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const page = parseInt(urlParams.get("page") || "1", 10);
      return Math.max(1, page);
    }
    return 1;
  };
  // Function to update URL with page param
  const updateURL = (page) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (page === 1) {
        url.searchParams.delete("page");
      } else {
        url.searchParams.set("page", page.toString());
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  // Initialize page from URL on component mount
  useEffect(() => {
    const pageFromURL = getPageFromURL();
    setCurrentPage(pageFromURL);
  }, []);

  // Update URL when page changes
  useEffect(() => {
    updateURL(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(newsData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = newsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };
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
              id={news.id}
              key={news.id}
              date={news.date}
              CardTitle={news.title}
              CardDescription={news.excerpt}
              image={news.image}
              category={news.category}
            />
          ))}
        </motion.div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center space-y-4 mt-6">
            <div className="flex items-center justify-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex space-x-1">
                {getPageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
              >
                Next
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Page Info */}
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, newsData.length)} of{" "}
              {newsData.length} services
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBerita;
