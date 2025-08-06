"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CardInstansi from "../Card/InstansiCard";

type InstansiItem = {
  id: number;
  nama_instansi: string;
  nama_layanan?: string;
  kontak: string;
  jenis: string;
};

// Dummy data untuk instansi
const instansiData: InstansiItem[] = [
  {
    id: 1,
    nama_instansi: "Kantor Desa Cikeusi",
    nama_layanan: "Administrasi Kependudukan",
    kontak: "0263-123456",
    jenis: "Full Time",
  },
  {
    id: 2,
    nama_instansi: "Puskesmas Cikeusi",
    nama_layanan: "Layanan Kesehatan",
    kontak: "0263-123457",
    jenis: "Part Time",
  },
  {
    id: 3,
    nama_instansi: "Kantor Pos Cikeusi",
    nama_layanan: "Layanan Pos dan Giro",
    kontak: "0263-123458",
    jenis: "Full Time",
  },
  {
    id: 4,
    nama_instansi: "Koramil Cikeusi",
    nama_layanan: "Keamanan dan Ketertiban",
    kontak: "0263-123459",
    jenis: "Part Time",
  },
  {
    id: 5,
    nama_instansi: "Polsek Cikeusi",
    nama_layanan: "Pelayanan Kepolisian",
    kontak: "0263-123460",
    jenis: "Full Time",
  },
  {
    id: 6,
    nama_instansi: "BRI Unit Cikeusi",
    nama_layanan: "Perbankan dan Kredit",
    kontak: "0263-123461",
    jenis: "Part Time",
  },
  {
    id: 7,
    nama_instansi: "Koperasi Tani Maju",
    nama_layanan: "Simpan Pinjam",
    kontak: "0263-123462",
    jenis: "Full Time",
  },
  {
    id: 8,
    nama_instansi: "BPBD Sumedang",
    nama_layanan: "Penanggulangan Bencana",
    kontak: "0263-123463",
    jenis: "Part Time",
  },
  {
    id: 9,
    nama_instansi: "Dinas Pendidikan",
    nama_layanan: "Administrasi Pendidikan",
    kontak: "0263-123464",
    jenis: "Full Time",
  },
  {
    id: 10,
    nama_instansi: "Dinas Sosial",
    nama_layanan: "Bantuan Sosial",
    kontak: "0263-123465",
    jenis: "Part Time",
  },
  {
    id: 11,
    nama_instansi: "PLN Unit Cikeusi",
    nama_layanan: "Layanan Kelistrikan",
    kontak: "0263-123466",
    jenis: "Full Time",
  },
  {
    id: 12,
    nama_instansi: "PDAM Tirta Medal",
    nama_layanan: "Layanan Air Bersih",
    kontak: "0263-123467",
    jenis: "Part Time",
  },
  {
    id: 13,
    nama_instansi: "Kantor Camat",
    nama_layanan: "Administrasi Kecamatan",
    kontak: "0263-123468",
    jenis: "Full Time",
  },
  {
    id: 14,
    nama_instansi: "Pasar Desa Cikeusi",
    nama_layanan: "Retribusi Pasar",
    kontak: "0263-123469",
    jenis: "Part Time",
  },
  {
    id: 15,
    nama_instansi: "Balai Desa",
    nama_layanan: "Penyewaan Aula",
    kontak: "0263-123470",
    jenis: "Full Time",
  },
];

const ITEMS_PER_PAGE = 9;

const AllInstansi = () => {
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

  const totalPages = Math.ceil(instansiData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = instansiData.slice(
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
              Daftar Instansi
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
              Daftar Instansi
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Temukan instansi yang menyediakan berbagai layanan untuk
              masyarakat. Setiap instansi menyediakan berbagai layanan yang
              dapat diakses
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
          {currentItems.map((instansi, index) => (
            <motion.div
              key={instansi.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CardInstansi
                id={instansi.id}
                key={instansi.id}
                kontak={instansi.kontak}
                jenis={instansi.jenis}
                nama_instansi={instansi.nama_instansi}
                nama_layanan={instansi.nama_layanan}
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
              {Math.min(startIndex + ITEMS_PER_PAGE, instansiData.length)} of{" "}
              {instansiData.length} services
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllInstansi;
