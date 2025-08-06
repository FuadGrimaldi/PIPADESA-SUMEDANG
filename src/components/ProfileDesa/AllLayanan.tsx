"use client";
import CardLayanan from "../Card/LayananCard";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type LayananItems = {
  id: number;
  alt: string;
  link: string;
  nama_layanan: string;
  nama_instansi: string;
};

const layananData: LayananItems[] = [
  {
    id: 1,
    alt: "A",
    link: "/layanan/akta-kelahiran",
    nama_layanan: "Akta Kelahiran",
    nama_instansi: "Dinas Kependudukan",
  },
  {
    id: 2,
    alt: "B",
    link: "/layanan/bantuan-sosial",
    nama_layanan: "Bantuan Sosial",
    nama_instansi: "Dinas Sosial",
  },
  {
    id: 3,
    alt: "C",
    link: "/layanan/cuci-darah",
    nama_layanan: "Cuci Darah Gratis",
    nama_instansi: "Dinas Kesehatan",
  },
  {
    id: 4,
    alt: "D",
    link: "/layanan/dokumen-umum",
    nama_layanan: "Dokumen Umum",
    nama_instansi: "Kelurahan",
  },
  {
    id: 5,
    alt: "E",
    link: "/layanan/e-ktp",
    nama_layanan: "E-KTP",
    nama_instansi: "Dinas Kependudukan",
  },
  {
    id: 6,
    alt: "F",
    link: "/layanan/fasilitas-olahraga",
    nama_layanan: "Fasilitas Olahraga",
    nama_instansi: "Dinas Pemuda & Olahraga",
  },
  {
    id: 7,
    alt: "G",
    link: "/layanan/gerakan-kebersihan",
    nama_layanan: "Gerakan Kebersihan",
    nama_instansi: "Dinas Lingkungan Hidup",
  },
  {
    id: 8,
    alt: "H",
    link: "/layanan/home-care",
    nama_layanan: "Home Care",
    nama_instansi: "Dinas Kesehatan",
  },
  {
    id: 9,
    alt: "I",
    link: "/layanan/izin-usaha",
    nama_layanan: "Izin Usaha",
    nama_instansi: "Dinas Penanaman Modal",
  },
  {
    id: 10,
    alt: "J",
    link: "/layanan/jaminan-kesehatan",
    nama_layanan: "Jaminan Kesehatan",
    nama_instansi: "BPJS Kesehatan",
  },
];

const ITEMS_PER_PAGE = 6;

const AllLayanan = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Function to get page from URL params
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

  const totalPages = Math.ceil(layananData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = layananData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
              Daftar Layanan
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Tidak ada layanan yang tersedia saat ini. Silakan hubungi
              administrator untuk informasi lebih lanjut.
            </p>
          </div>
        </div>
        <div className="text-center text-gray-500 py-12">
          <div className="mb-4">
            <svg
              className="mx-auto w-24 h-24 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            Tidak ada layanan yang tersedia
          </h3>
          <p className="text-gray-400">
            Silakan hubungi administrator untuk informasi lebih lanjut.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Daftar Layanan
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Temukan instansi dan layanan yang tersedia untuk masyarakat.
              Setiap instansi menyediakan berbagai layanan yang dapat diakses
              secara online.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {currentItems.map((layanan, index) => (
            <motion.div
              key={layanan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CardLayanan
                id={layanan.id}
                key={layanan.id}
                alt={layanan.alt}
                link={layanan.link}
                nama_layanan={layanan.nama_layanan}
                nama_instansi={layanan.nama_instansi}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center space-y-4">
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
              {Math.min(startIndex + ITEMS_PER_PAGE, layananData.length)} of{" "}
              {layananData.length} services
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllLayanan;
