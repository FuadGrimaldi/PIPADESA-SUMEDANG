"use client";
import CardLayanan from "../Card/LayananCard";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

type LayananItems = {
  id: number;
  alt: string;
  link: string;
  deskripsi?: string;
  nama_layanan: string;
  nama_instansi: string;
  Loket?: string;
};

// TypeScript interfaces untuk data JSON
interface KontakInstansi {
  email?: string;
  telepon?: string;
  website?: string;
}

interface JamBuka {
  senin: string;
  selasa: string;
  rabu: string;
  kamis: string;
  jumat: string;
  sabtu: string;
}

interface Persyaratan {
  nama: string;
  keterangan?: string;
  link?: string;
  file?: string | null;
}

interface Layanan {
  id: number;
  nama: string;
  loket: string;
  deskripsi: string;
  jenis_layanan: string[];
  persyaratan: Persyaratan[];
}

interface InstansiData {
  id: number;
  instansi: string;
  alamat: string;
  kontak: KontakInstansi;
  jam_buka: JamBuka;
  layanan: Layanan[];
}

interface JsonData {
  data: InstansiData[];
}

interface AllLayananProps {
  desaId?: number;
}

const ITEMS_PER_PAGE = 9;

const AllLayanan = ({ desaId }: AllLayananProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [layananData, setLayananData] = useState<LayananItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transform function untuk mengubah data JSON ke format LayananItems
  const transformDataToLayananFormat = (jsonData: JsonData): LayananItems[] => {
    const transformedData: LayananItems[] = [];

    jsonData.data.forEach((instansi) => {
      instansi.layanan.forEach((layanan) => {
        transformedData.push({
          id: layanan.id,
          alt: `${layanan.nama} - ${instansi.instansi}`,
          link: `/layanan/${layanan.id}`, // Link ke detail layanan
          nama_layanan: layanan.nama,
          nama_instansi: instansi.instansi,
          deskripsi: layanan.deskripsi,
          Loket: layanan.loket,
        });
      });
    });

    return transformedData;
  };

  // Fetch layanan data
  const fetchLayananData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from API first
      if (desaId) {
        try {
          const response = await fetch(`/api/layanan/subdomain/${desaId}`);
          if (response.ok) {
            const jsonData: JsonData = await response.json();
            const transformedData = transformDataToLayananFormat(jsonData);
            setLayananData(transformedData);
            return;
          }
        } catch (apiError) {
          console.warn("API call failed, using fallback data");
        }
      }

      // Fallback: Load from local JSON file
      const instansiJsonData = await import(
        "../../../data/instansi_layanan.json"
      );
      const transformedData = transformDataToLayananFormat(
        instansiJsonData as JsonData
      );
      setLayananData(transformedData);
    } catch (err) {
      console.error("Error fetching layanan data:", err);
      setError("Gagal memuat data layanan");
      setLayananData([]);
    } finally {
      setLoading(false);
    }
  }, [desaId]);

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
  const updateURL = useCallback((page: number) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (page === 1) {
        url.searchParams.delete("page");
      } else {
        url.searchParams.set("page", page.toString());
      }
      window.history.pushState({}, "", url.toString());
    }
  }, []);

  // Initialize page from URL on component mount
  useEffect(() => {
    const pageFromURL = getPageFromURL();
    setCurrentPage(pageFromURL);
  }, []);

  // Update URL when page changes
  useEffect(() => {
    updateURL(currentPage);
  }, [currentPage, updateURL]);

  // Fetch data on component mount
  useEffect(() => {
    fetchLayananData();
  }, [fetchLayananData]);

  const totalPages = Math.ceil(layananData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = layananData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalPages]
  );

  // Generate page numbers for pagination
  const getPageNumbers = useCallback(() => {
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
  }, [totalPages, currentPage]);

  // Loading state
  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
                Daftar Layanan
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Memuat data layanan...
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && layananData.length === 0) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
                Daftar Layanan
              </h2>
            </div>
          </div>
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 inline-block">
              <svg
                className="w-16 h-16 text-red-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchLayananData}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (layananData.length === 0) {
    return (
      <section className="py-8">
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
      </section>
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
            {error && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-700 text-sm">
                  ⚠️ Menampilkan data fallback: {error}
                </p>
              </div>
            )}
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
                deskripsi={layanan.deskripsi}
                loket={layanan.Loket}
                id={layanan.id}
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
