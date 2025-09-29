"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import Image from "next/image";
import { Organisasi, KategoriOrganisasi } from "@/types/organisasi";

// Interface untuk props component
interface AllOrganisasiProps {
  desaId: number;
  kategoriId?: number; // optional kategori filter
  namaKategori?: string; // optional untuk menampilkan nama kategori
  searchResults?: Organisasi[];
}

// Modal Detail Organisasi
interface ModalDetailProps {
  organisasi: Organisasi | null;
  isOpen: boolean;
  onClose: () => void;
}

const ModalDetail: React.FC<ModalDetailProps> = ({
  organisasi,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !organisasi) return null;

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
            <div className="flex items-start space-x-4">
              {organisasi.logo_path && (
                <div className="flex-shrink-0">
                  <Image
                    src={organisasi.logo_path}
                    alt={organisasi.nama_organisasi}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                  />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {organisasi.nama_organisasi}
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Ketua/Owner: {organisasi.nama_ketua}
                </p>
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2M5 21V5a2 2 0 012-2h12a2 2 0 012 2v16M5 21H3m2 0h2"
                    />
                  </svg>
                  Desa: {organisasi.profile_desa?.nama_desa || "Unknown"}
                </p>
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
            {/* Informasi Kategori */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-600">
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
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                Kategori
              </h4>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600 mb-2">
                  {organisasi.kategori_organisasi?.nama_kategori ||
                    "Tidak dikategorikan"}
                </div>
              </div>
            </div>

            {/* Informasi Ketua */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-600">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Pemimpin/Owner
              </h4>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600 mb-2">
                  {organisasi.nama_ketua}
                </div>
                <div className="text-sm text-gray-600">Ketua/Owner</div>
              </div>
            </div>
          </div>

          {/* Deskripsi Kegiatan */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-600">
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
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                {organisasi.deskripsi_kegiatan ||
                  "Tidak ada deskripsi kegiatan yang tersedia."}
              </p>
            </div>
          </div>

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

// Component untuk Card Organisasi
interface CardOrganisasiProps {
  organisasi: Organisasi;
  onClick: (organisasi: Organisasi) => void;
}

const CardOrganisasi: React.FC<CardOrganisasiProps> = ({
  organisasi,
  onClick,
}) => {
  return (
    <div
      className="bg-white f rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full flex flex-col cursor-pointer hover:scale-105"
      onClick={() => onClick(organisasi)}
    >
      <div className="mb-4 flex-1">
        {/* Logo dan Nama Organisasi */}
        <div className="flex items-start space-x-4 mb-4">
          {organisasi.logo_path ? (
            <Image
              src={organisasi.logo_path}
              alt={organisasi.nama_organisasi}
              width={60}
              height={60}
              className="w-15 h-15 object-cover rounded-lg border flex-shrink-0"
            />
          ) : (
            <div className="w-15 h-15 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2M5 21V5a2 2 0 012-2h12a2 2 0 012 2v16M5 21H3m2 0h2"
                />
              </svg>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900  mb-2 line-clamp-2">
              {organisasi.nama_organisasi}
            </h3>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {organisasi.kategori_organisasi?.nama_kategori ||
                "Tanpa Kategori"}
            </span>
          </div>
        </div>

        {/* Ketua Organisasi */}
        <div className="mb-3">
          <div className="flex items-center text-gray-600  text-sm">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="truncate">
              Ketua/Owner: {organisasi.nama_ketua}
            </span>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="mb-3">
          <p className="text-sm text-gray-600  line-clamp-3">
            {organisasi.deskripsi_kegiatan ||
              "Tidak ada deskripsi yang tersedia."}
          </p>
        </div>
      </div>

      {/* Informasi Desa */}
      <div className="border-t pt-4">
        <div className="flex items-center text-gray-600  text-sm">
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="truncate">
            {organisasi.profile_desa?.nama_desa || "Unknown"}
          </span>
        </div>
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

const AllOrganisasi: React.FC<AllOrganisasiProps> = ({
  desaId,
  kategoriId,
  namaKategori,
  searchResults = [],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [organisasiData, setOrganisasiData] = useState<Organisasi[]>([]);
  const [kategoriData, setKategoriData] = useState<KategoriOrganisasi[]>([]);
  const [selectedKategori, setSelectedKategori] = useState<number | undefined>(
    kategoriId
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrganisasi, setSelectedOrganisasi] =
    useState<Organisasi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state tambahan untuk cek apakah user melakukan search
  const [isSearching, setIsSearching] = useState(false);

  // Handle modal
  const handleOrganisasiClick = (organisasi: Organisasi) => {
    setSelectedOrganisasi(organisasi);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrganisasi(null);
  };

  // Fetch kategori data
  const fetchKategoriData = useCallback(async () => {
    try {
      const response = await fetch(
        "/api/organisasi/kategori/subdomain/" + desaId
      );
      if (response.ok) {
        const data = await response.json();
        setKategoriData(data);
      }
    } catch (error) {
      console.error("Error fetching kategori:", error);
    }
  }, [desaId]);

  // Fetch organisasi data from API
  const fetchOrganisasiData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `/api/organisasi`;

      // Add query parameters
      const params = new URLSearchParams();
      if (desaId) {
        params.append("desa_id", desaId.toString());
      }
      if (selectedKategori) {
        params.append("kategori_id", selectedKategori.toString());
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch organisasi data");
      }

      const data: Organisasi[] = await response.json();

      // Filter by desa_id if not done on server
      let filteredData = data;
      if (desaId) {
        filteredData = data.filter(
          (org) =>
            org.desa_id === desaId &&
            org.kategori_organisasi.nama_kategori.toLowerCase() === namaKategori
        );
      }

      // Filter by kategori if selected
      if (selectedKategori) {
        filteredData = filteredData.filter(
          (org) => org.kategori_organisasi.nama_kategori === namaKategori
        );
      }

      setOrganisasiData(filteredData);
    } catch (err) {
      console.error("Error fetching organisasi data:", err);
      setError("Gagal memuat data organisasi");
      setOrganisasiData([]);
    } finally {
      setLoading(false);
    }
  }, [desaId, selectedKategori, namaKategori]);

  // jalankan saat searchResults berubah
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setIsSearching(true);
      setOrganisasiData(searchResults);
      setLoading(false);
    } else if (isSearching && searchResults.length === 0) {
      // sedang search tapi hasil kosong
      setOrganisasiData([]);
      setLoading(false);
    } else {
      // tidak sedang search → tampilkan data default dari API
      setIsSearching(false);
      if (desaId) {
        fetchOrganisasiData();
      }
    }
  }, [searchResults, desaId, fetchOrganisasiData, isSearching]);

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

  // Fetch data on component mount and when dependencies change
  useEffect(() => {
    fetchKategoriData();
  }, [fetchKategoriData]);

  useEffect(() => {
    if (desaId) {
      fetchOrganisasiData();
    }
  }, [desaId, fetchOrganisasiData]);

  const totalPages = Math.ceil(organisasiData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = organisasiData.slice(
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
      <section>
        <div className="container mx-auto px-4">
          <div className="mb-8 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700  mb-4">
                Daftar {namaKategori || "Organisasi"}
              </h2>
              <p className="text-base text-gray-600  leading-relaxed">
                Memuat data organisasi...
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 animate-pulse"
              >
                <div className="flex space-x-4 mb-4">
                  <div className="w-15 h-15 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (organisasiData.length === 0) {
    return (
      <section>
        <div className="container mx-auto px-4">
          <div className="mb-8 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700  mb-4">
                Daftar {namaKategori || "Organisasi"}
              </h2>
              <p className="text-base text-gray-600  leading-relaxed">
                Temukan organisasi yang aktif di desa ini.
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2M5 21V5a2 2 0 012-2h12a2 2 0 012 2v16M5 21H3m2 0h2"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Tidak ada organisasi yang tersedia
              </h3>
              <p className="text-gray-400">
                {selectedKategori
                  ? "Tidak ada organisasi dalam kategori yang dipilih."
                  : "Silakan hubungi administrator untuk informasi lebih lanjut."}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700  mb-4">
              Daftar {namaKategori || "Organisasi"}
            </h2>
            <p className="text-base text-gray-600  leading-relaxed">
              Temukan organisasi yang aktif di desa ini. Klik pada kartu
              organisasi untuk melihat detail lengkap.
            </p>
            {error && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-700 text-sm">
                  ⚠️ Terjadi kesalahan: {error}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Organisasi Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentItems.map((organisasi) => (
            <CardOrganisasi
              key={organisasi.id}
              organisasi={organisasi}
              onClick={handleOrganisasiClick}
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
              {Math.min(startIndex + ITEMS_PER_PAGE, organisasiData.length)} of{" "}
              {organisasiData.length} organisasi
            </div>
          </div>
        )}
      </div>
      {/* Modal for Organisasi Detail */}
      <ModalDetail
        organisasi={selectedOrganisasi}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default AllOrganisasi;
