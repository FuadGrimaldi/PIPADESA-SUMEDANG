"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";

export interface Sarana {
  id: number;
  desa_id: number;
  kategori: string;
  nama_sarana: string;
  deskripsi: string;
  alamat_lokasi: string;
  koordinat_lat: string;
  koordinat_long: string;
  foto_path: string;
  status: string;
}

interface AllSaranaProps {
  desaId: number;
}

// Modal Detail Sarana
interface ModalDetailProps {
  sarana: Sarana | null;
  isOpen: boolean;
  onClose: () => void;
}

const ModalDetail: React.FC<ModalDetailProps> = ({
  sarana,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !sarana) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal content */}
        <div className="inline-block w-full max-w-4xl p-6 my-[80px] overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {sarana.nama_sarana}
              </h3>
              <p className="text-gray-600 flex items-center mb-2">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {sarana.alamat_lokasi}
              </p>
              <div className="flex gap-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {sarana.kategori}
                </span>
                <span
                  className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                    sarana.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {sarana.status}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Foto Sarana */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Foto Sarana
              </h4>
              {sarana.foto_path ? (
                <Image
                  src={sarana.foto_path}
                  alt={sarana.nama_sarana}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = "/images/placeholder-sarana.jpg";
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 text-gray-400 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm">Foto tidak tersedia</p>
                  </div>
                </div>
              )}
            </div>

            {/* Deskripsi */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Deskripsi
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {sarana.deskripsi || "Tidak ada deskripsi tersedia."}
              </p>
            </div>
          </div>

          {/* Koordinat dan Maps */}
          {sarana.koordinat_lat && sarana.koordinat_long && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Lokasi Koordinat
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Latitude:</span>
                    <span className="ml-2 text-gray-600">
                      {sarana.koordinat_lat}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Longitude:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {sarana.koordinat_long}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <a
                    href={`https://www.google.com/maps?q=${sarana.koordinat_lat},${sarana.koordinat_long}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component untuk Card Sarana
interface CardSaranaProps {
  sarana: Sarana;
  onClick: (sarana: Sarana) => void;
}

const CardSarana: React.FC<CardSaranaProps> = ({ sarana, onClick }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full flex flex-col cursor-pointer hover:scale-105"
      onClick={() => onClick(sarana)}
    >
      {/* Foto Sarana */}
      <div className="mb-4 h-32 bg-gray-200 rounded-lg overflow-hidden">
        {sarana.foto_path ? (
          <Image
            src={sarana.foto_path}
            alt={sarana.nama_sarana}
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="mb-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
          {sarana.nama_sarana}
        </h3>

        {/* Deskripsi */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
          {sarana.deskripsi || "Tidak ada deskripsi tersedia."}
        </p>

        {/* Alamat */}
        <div className="mb-3">
          <div className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
            <svg
              className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="line-clamp-2">{sarana.alamat_lokasi}</span>
          </div>
        </div>

        {/* Kategori dan Status */}
        <div className="mb-3 flex gap-2 flex-wrap">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-lg">
            {sarana.kategori}
          </span>
        </div>
      </div>
    </div>
  );
};

const ITEMS_PER_PAGE = 6;

const AllSarana: React.FC<AllSaranaProps> = ({ desaId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [saranaData, setSaranaData] = useState<Sarana[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSarana, setSelectedSarana] = useState<Sarana | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Handle modal
  const handleSaranaClick = (sarana: Sarana) => {
    setSelectedSarana(sarana);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSarana(null);
  };

  const handleSaranaSelect = (sarana: Sarana) => {
    setSelectedSarana(sarana);
  };

  // Fetch sarana data from API
  const fetchSaranaData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/sarana/subdomain/${desaId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch sarana data");
      }

      const data = await response.json();
      setSaranaData(data);
    } catch (err) {
      console.error("Error fetching sarana data:", err);
      setError("Gagal memuat data sarana");
      setSaranaData([]);
    } finally {
      setLoading(false);
    }
  }, [desaId]);

  // Initialize page from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get("page");
      if (pageParam) {
        const pageNum = parseInt(pageParam, 10);
        if (!isNaN(pageNum) && pageNum > 0) {
          setCurrentPage(pageNum);
        }
      }
    }
  }, []);

  // Update URL when page changes
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

  useEffect(() => {
    updateURL(currentPage);
  }, [currentPage, updateURL]);

  // Fetch data on component mount
  useEffect(() => {
    if (desaId) {
      fetchSaranaData();
    }
  }, [desaId, fetchSaranaData]);

  const totalPages = Math.ceil(saranaData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = saranaData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
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
      <section>
        <div className="container mx-auto px-4">
          <div className="mb-8 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
                Daftar Sarana
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Memuat data sarana...
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
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
  if (error && saranaData.length === 0) {
    return (
      <section>
        <div className="container mx-auto px-4">
          <div className="mb-8 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
                Daftar Sarana
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
                onClick={fetchSaranaData}
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
  if (saranaData.length === 0) {
    return (
      <section>
        <div className="container mx-auto px-4">
          <div className="mb-8 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
                Daftar Sarana
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Temukan berbagai sarana yang tersedia di wilayah ini.
              </p>
            </div>
          </div>
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 inline-block">
              <svg
                className="mx-auto w-24 h-24 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Tidak ada sarana yang tersedia
              </h3>
              <p className="text-gray-400">
                Silakan hubungi administrator untuk informasi lebih lanjut.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section>
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
                Daftar Sarana
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Temukan berbagai sarana yang tersedia di wilayah ini. Klik pada
                kartu sarana untuk melihat detail lengkap dan lokasi.
              </p>
              {error && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-700 text-sm">
                    ⚠️ Terjadi kesalahan saat memuat data: {error}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* View Toggle */}
          <div className="mb-6 flex justify-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 inline-flex">
              <button
                onClick={() => setShowMap(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !showMap
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <svg
                  className="w-4 h-4 mr-2 inline"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Tampilan Grid
              </button>
              <button
                onClick={() => setShowMap(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  showMap
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <svg
                  className="w-4 h-4 mr-2 inline"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Tampilan Peta
              </button>
            </div>
          </div>

          {/* Content */}
          {showMap ? (
            /* Map View */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <div className="lg:col-span-2">
                {selectedSarana &&
                selectedSarana.koordinat_lat &&
                selectedSarana.koordinat_long ? (
                  <iframe
                    title="Google Maps"
                    width="100%"
                    height="450"
                    className="rounded-lg border"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${selectedSarana.koordinat_lat},${selectedSarana.koordinat_long}&hl=id&z=16&output=embed`}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-400 text-center">
                      Pilih salah satu sarana untuk melihat lokasi pada peta.
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Daftar Sarana ({saranaData.length})
                </h3>
                {saranaData.map((sarana) => (
                  <div
                    key={sarana.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedSarana?.id === sarana.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => handleSaranaSelect(sarana)}
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {sarana.nama_sarana}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {sarana.deskripsi}
                    </p>
                    <div className="flex gap-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-lg">
                        {sarana.kategori}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Grid View */
            <>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {currentItems.map((sarana) => (
                  <CardSarana
                    key={sarana.id}
                    sarana={sarana}
                    onClick={handleSaranaClick}
                  />
                ))}
              </div>

              {/* Pagination */}
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
                    {Math.min(startIndex + ITEMS_PER_PAGE, saranaData.length)}{" "}
                    of {saranaData.length} sarana
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Modal Detail */}
      <ModalDetail
        sarana={selectedSarana}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default AllSarana;
