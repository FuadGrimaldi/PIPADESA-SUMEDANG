"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Agenda, AgendaKategori } from "@/types/agenda";

interface AllAgendaData {
  desaId: number;
}

const ITEMS_PER_PAGE = 6;

const AllAgenda = ({ desaId }: AllAgendaData) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [agendaData, setAgendaData] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize page from URL on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get("page");
      if (pageParam) {
        const pageNum = parseInt(pageParam);
        if (!isNaN(pageNum) && pageNum > 0) {
          setCurrentPage(pageNum);
        }
      }
    }
  }, []);

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

  // Update URL when page changes
  useEffect(() => {
    updateURL(currentPage);
  }, [currentPage, updateURL]);

  // Fetch agenda data from API
  const fetchAgendas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fallback to general endpoint if specific doesn't exist
      const fallbackResponse = await fetch("/api/agenda");
      if (!fallbackResponse.ok) {
        throw new Error("Failed to fetch agenda data");
      }
      const allData = await fallbackResponse.json();
      // Filter by desa_id on frontend
      const filteredData = allData.filter(
        (agenda: Agenda) => agenda.desa_id === desaId
      );
      setAgendaData(filteredData);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching agenda:", err);
      setAgendaData([]);
    } finally {
      setLoading(false);
    }
  }, [desaId]);

  // Fetch agendas when desaId changes
  useEffect(() => {
    if (desaId) {
      fetchAgendas();
    }
  }, [desaId, fetchAgendas]);

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      const totalPages = Math.ceil(agendaData.length / ITEMS_PER_PAGE);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [agendaData.length]
  );

  // Generate page numbers for pagination
  const getPageNumbers = useCallback(() => {
    const totalPages = Math.ceil(agendaData.length / ITEMS_PER_PAGE);
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
  }, [agendaData.length, currentPage]);

  // Reset to page 1 when agenda data changes
  useEffect(() => {
    if (agendaData.length > 0) {
      const totalPages = Math.ceil(agendaData.length / ITEMS_PER_PAGE);
      if (currentPage > totalPages) {
        setCurrentPage(1);
      }
    }
  }, [agendaData.length, currentPage]);

  // Calculate pagination values
  const totalPages = Math.ceil(agendaData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = agendaData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Format waktu function
  const formatWaktu = (waktu: Date | string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
      timeZoneName: "short",
    };

    const date = typeof waktu === "string" ? new Date(waktu) : waktu;

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Waktu tidak valid";
    }

    return date.toLocaleString("id-ID", options).replace(/\./g, ":");
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Agenda Desa
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Temukan berbagai agenda kegiatan, rapat, dan acara penting di
              lingkungan desa.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C0B099]"></div>
          <span className="ml-3 text-gray-500">Memuat agenda...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Agenda Desa
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Temukan berbagai agenda kegiatan, rapat, dan acara penting di
              lingkungan desa.
            </p>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-red-700">Error: {error}</span>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={fetchAgendas}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (currentItems.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Agenda Desa
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Temukan berbagai agenda kegiatan, rapat, dan acara penting di
              lingkungan desa.
            </p>
          </div>
        </div>
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8 inline-block">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Belum Ada Agenda
            </h3>
            <p className="text-gray-500">
              Tidak ada agenda yang tersedia untuk desa ini saat ini.
            </p>
          </div>
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
              Temukan berbagai agenda kegiatan, rapat, dan acara penting di
              lingkungan desa.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentItems.map((agenda) => (
            <motion.div
              key={agenda.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden border border-gray-100"
            >
              <div className="relative w-full h-48">
                <Image
                  src={agenda.poster || "/images/default-agenda.jpg"}
                  alt={agenda.judul}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/default-agenda.jpg";
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {agenda.kategori}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
                  {agenda.judul}
                </h3>

                {agenda.deskripsi && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {agenda.deskripsi}
                  </p>
                )}

                <div className="space-y-2">
                  {agenda.lokasi && (
                    <div className="flex items-start">
                      <svg
                        className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {agenda.lokasi}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {formatWaktu(agenda.waktu)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center space-y-4 mt-8">
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
              {Math.min(startIndex + ITEMS_PER_PAGE, agendaData.length)} of{" "}
              {agendaData.length} agenda
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllAgenda;
