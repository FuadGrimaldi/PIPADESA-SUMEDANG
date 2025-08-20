"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

// Define TypeScript interfaces
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
  instansi: string;
  alamat: string;
  kontak: KontakInstansi;
  jam_buka: JamBuka;
  layanan: Layanan[];
}

interface JsonData {
  data: InstansiData[];
}

interface AllInstansiProps {
  desaId: number;
}

// Transform function untuk mendapatkan daftar instansi unik
const transformDataToInstansiFormat = (jsonData: JsonData): InstansiData[] => {
  // Filter dan deduplicate berdasarkan nama instansi
  const uniqueInstansi = jsonData.data.filter(
    (instansi, index, self) =>
      index === self.findIndex((i) => i.instansi === instansi.instansi)
  );

  return uniqueInstansi;
};

// Modal Detail Instansi
interface ModalDetailProps {
  instansi: InstansiData | null;
  isOpen: boolean;
  onClose: () => void;
}

const ModalDetail: React.FC<ModalDetailProps> = ({
  instansi,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !instansi) return null;

  const formatJamBuka = (jamBuka: JamBuka) => {
    return Object.entries(jamBuka).map(([hari, jam]) => (
      <div key={hari} className="flex justify-between">
        <span className="capitalize font-medium">{hari}:</span>
        <span>{jam}</span>
      </div>
    ));
  };

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
                {instansi.instansi}
              </h3>
              <p className="text-gray-600 flex items-center">
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
                {instansi.alamat}
              </p>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informasi Kontak */}
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Informasi Kontak
              </h4>
              <div className="space-y-3">
                {instansi.kontak?.telepon && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a
                      href={`tel:${instansi.kontak.telepon}`}
                      className="text-blue-600 hover:underline"
                    >
                      {instansi.kontak.telepon}
                    </a>
                  </div>
                )}
                {instansi.kontak?.email && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={`mailto:${instansi.kontak.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {instansi.kontak.email}
                    </a>
                  </div>
                )}
                {instansi.kontak?.website && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    <a
                      href={instansi.kontak.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Kunjungi Website
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Jam Operasional */}
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Jam Operasional
              </h4>
              <div className="space-y-2 text-sm">
                {formatJamBuka(instansi.jam_buka)}
              </div>
            </div>

            {/* Statistik Layanan */}
            <div className="bg-blue-50 rounded-lg p-4">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Informasi Layanan
              </h4>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {instansi.layanan?.length || 0}
                </div>
                <div className="text-sm text-gray-600">
                  Total Layanan Tersedia
                </div>
              </div>
            </div>
          </div>

          {/* Daftar Layanan */}
          {instansi.layanan && instansi.layanan.length > 0 && (
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Daftar Layanan ({instansi.layanan.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                {instansi.layanan.map((layanan, index) => (
                  <Link
                    href={`/layanan/${layanan.id}`}
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h5 className="font-semibold text-gray-900 mb-2">
                      {layanan.nama}
                    </h5>
                    <p className="text-sm text-gray-600 mb-2">
                      {layanan.deskripsi}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {layanan.loket}
                      </span>
                      {layanan.jenis_layanan.length > 0 && (
                        <span className="text-xs text-gray-500">
                          +{layanan.jenis_layanan.length} jenis
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
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

// Component untuk Card Instansi
interface CardInstansiProps {
  instansi: InstansiData;
  onClick: (instansi: InstansiData) => void;
}

const CardInstansi: React.FC<CardInstansiProps> = ({ instansi, onClick }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full flex flex-col cursor-pointer hover:scale-105"
      onClick={() => onClick(instansi)}
    >
      <div className="mb-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
          {instansi.instansi}
        </h3>

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
            <span className="line-clamp-2">{instansi.alamat}</span>
          </div>
        </div>

        {/* Jumlah Layanan */}
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {instansi.layanan?.length || 0} Layanan Tersedia
          </span>
        </div>
      </div>

      {/* Kontak Information Preview */}
      <div className="space-y-2 text-sm border-t pt-4">
        {instansi.kontak?.telepon && (
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <svg
              className="w-4 h-4 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="truncate">{instansi.kontak.telepon}</span>
          </div>
        )}

        {instansi.kontak?.email && (
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <svg
              className="w-4 h-4 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="truncate">{instansi.kontak.email}</span>
          </div>
        )}
      </div>

      {/* Action Indicator */}
      <div className="mt-4 pt-4 border-t">
        <div className="text-center text-blue-600 font-medium text-sm flex items-center justify-center">
          Klik untuk detail lengkap
          <svg
            className="w-4 h-4 ml-1"
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
        </div>
      </div>
    </div>
  );
};

const ITEMS_PER_PAGE = 9;

const AllInstansi: React.FC<AllInstansiProps> = ({ desaId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [instansiData, setInstansiData] = useState<InstansiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInstansi, setSelectedInstansi] = useState<InstansiData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle modal
  const handleInstansiClick = (instansi: InstansiData) => {
    setSelectedInstansi(instansi);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInstansi(null);
  };

  // Fetch instansi data from API
  const fetchInstansiData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Ganti dengan API call yang sebenarnya
      const response = await fetch(`/api/instansi/subdomain/${desaId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch instansi data");
      }

      const jsonData: JsonData = await response.json();
      const transformedData = transformDataToInstansiFormat(jsonData);
      setInstansiData(transformedData);
    } catch (err) {
      console.error("Error fetching instansi data:", err);
      setError("Gagal memuat data instansi");

      // Fallback: gunakan data JSON lokal
      try {
        const instansiJsonData = await import(
          "../../../data/instansi_layanan.json"
        );
        const transformedData = transformDataToInstansiFormat(
          instansiJsonData as JsonData
        );
        setInstansiData(transformedData);
        setError(null);
      } catch (fallbackError) {
        console.error("Error loading fallback data:", fallbackError);
        setInstansiData([]);
      }
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
      fetchInstansiData();
    }
  }, [desaId, fetchInstansiData]);

  const totalPages = Math.ceil(instansiData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = instansiData.slice(
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
                Daftar Instansi
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Memuat data instansi...
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
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
  if (error && instansiData.length === 0) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
                Daftar Instansi
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
                onClick={fetchInstansiData}
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
  if (instansiData.length === 0) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
                Daftar Instansi
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Temukan instansi yang menyediakan berbagai layanan untuk
                masyarakat.
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Tidak ada instansi yang tersedia
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
                masyarakat. Klik pada kartu instansi untuk melihat detail
                lengkap.
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

          {/* Instansi Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentItems.map((instansi, index) => (
              <CardInstansi
                key={`${instansi.instansi}-${index}`}
                instansi={instansi}
                onClick={handleInstansiClick}
              />
            ))}
          </div>

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
                {instansiData.length} instansi
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal Detail */}
      <ModalDetail
        instansi={selectedInstansi}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default AllInstansi;
