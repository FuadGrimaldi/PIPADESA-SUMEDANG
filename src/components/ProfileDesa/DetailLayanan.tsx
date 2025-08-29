"use client";
import { motion } from "framer-motion";
import { Download, Clock, Building2, FileText, Calendar } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import CardTahuSumedang from "../Card/TahuSumedangCard";

interface DetailLayananProps {
  id: string;
}

// TypeScript interfaces untuk data
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

interface DetailLayananData {
  layanan: Layanan;
  instansi: InstansiData;
}

const DetailLayanan = ({ id }: DetailLayananProps) => {
  const [layananDetail, setLayananDetail] = useState<DetailLayananData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function untuk mencari layanan berdasarkan ID
  const findLayananById = (
    data: JsonData,
    layananId: number
  ): DetailLayananData | null => {
    for (const instansi of data.data) {
      const layanan = instansi.layanan.find((l) => l.id === layananId);
      if (layanan) {
        return {
          layanan,
          instansi,
        };
      }
    }
    return null;
  };

  // Fetch data layanan
  useEffect(() => {
    const fetchLayananDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const layananId = parseInt(id, 10);

        if (isNaN(layananId)) {
          throw new Error("Invalid layanan ID");
        }

        // Try to fetch from API first
        try {
          const response = await fetch(`/api/layanan/${id}`);
          if (response.ok) {
            const result = await response.json();
            setLayananDetail(result);
            return;
          }
        } catch (apiError) {
          console.warn("API call failed, using fallback data");
        }

        // Fallback: Load from local JSON file
        const instansiJsonData = await import(
          "../../../data/instansi_layanan.json"
        );
        const detail = findLayananById(instansiJsonData as JsonData, layananId);

        if (!detail) {
          throw new Error("Layanan tidak ditemukan");
        }

        setLayananDetail(detail);
      } catch (err) {
        console.error("Error fetching layanan detail:", err);
        setError(
          err instanceof Error ? err.message : "Gagal memuat detail layanan"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLayananDetail();
    }
  }, [id]);

  // Format jam buka untuk ditampilkan
  const formatJamBuka = (jamBuka: JamBuka) => {
    return Object.entries(jamBuka).map(([hari, jam]) => ({
      hari: hari.charAt(0).toUpperCase() + hari.slice(1),
      jam,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-5 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !layananDetail) {
    return (
      <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-5 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
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
              <p className="text-red-600 mb-4">
                {error || "Layanan tidak ditemukan"}
              </p>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { layanan, instansi } = layananDetail;
  const jamBukaFormatted = formatJamBuka(instansi.jam_buka);

  return (
    <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-5 lg:p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
        >
          <div
            className="flex flex-col md:flex-row bg-gradient-to-r from-[#7c5a3a] to-[#C3B1A5] px-6 py-8 md:px-8 backdrop-blur-md bg-opacity-80"
            style={{ backgroundColor: "#7c5a3a" }}
          >
            <div className="flex items-start flex-1 gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {layanan.nama}
                </h1>
                <p className="text-blue-100 text-lg font-medium">
                  {instansi.instansi}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Loket: {layanan.loket}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/assets/logo-fix/logo-sumedang-500.png"
                alt="Instansi Image"
                width={80}
                height={80}
                className="rounded-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Deskripsi Layanan
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-base mb-4">
                {layanan.deskripsi}
              </p>

              {/* Jenis Layanan */}
              {layanan.jenis_layanan && layanan.jenis_layanan.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    Jenis Layanan Tersedia:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {layanan.jenis_layanan.map((jenis, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-600 text-sm">{jenis}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Requirements Card */}
            {layanan.persyaratan && layanan.persyaratan.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 md:px-8 md:py-6 bg-slate-50 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800">
                      Persyaratan
                    </h2>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                          No
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                          Persyaratan
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                          Keterangan
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                          File/Link
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {layanan.persyaratan.map((item, index) => (
                        <tr
                          key={index}
                          className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-slate-25"
                          }`}
                        >
                          <td className="px-6 py-4 text-slate-700 font-medium">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-slate-700">
                            {item.nama}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {item.keterangan || "-"}
                          </td>
                          <td className="px-6 py-4">
                            {item.file ? (
                              <a
                                href={`/files/${item.file}`}
                                download
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </a>
                            ) : item.link ? (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm"
                              >
                                <FileText className="w-4 h-4" />
                                Info Detail
                              </a>
                            ) : (
                              <span className="text-slate-400 text-sm">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <CardTahuSumedang />
          </motion.div>

          {/* Right Column - Operating Hours */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Jam Buka Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Jam Buka Layanan
                </h2>
              </div>

              <div className="space-y-3">
                {jamBukaFormatted.map((jam, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="font-medium text-slate-700">
                        {jam.hari}
                      </span>
                    </div>
                    <span className="text-slate-600 font-mono text-sm bg-white px-2 py-1 rounded">
                      {jam.jam}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kontak Instansi Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4 text-slate-800">
                Kontak Instansi
              </h3>
              <div className="space-y-3 text-sm">
                {instansi.kontak?.telepon && (
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <svg
                        className="w-4 h-4 text-green-600"
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
                    </div>
                    <a
                      href={`tel:${instansi.kontak.telepon}`}
                      className="text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      {instansi.kontak.telepon}
                    </a>
                  </div>
                )}

                {instansi.kontak?.email && (
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <svg
                        className="w-4 h-4 text-blue-600"
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
                    </div>
                    <a
                      href={`mailto:${instansi.kontak.email}`}
                      className="text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      {instansi.kontak.email}
                    </a>
                  </div>
                )}

                {instansi.kontak?.website &&
                  instansi.kontak.website !== "#" &&
                  instansi.kontak.website !== "-" && (
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <svg
                          className="w-4 h-4 text-purple-600"
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
                      </div>
                      <a
                        href={instansi.kontak.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        Website
                      </a>
                    </div>
                  )}
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-lg p-6 md:p-8 text-white">
              <h3 className="text-lg font-semibold mb-3">Informasi Penting</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Pastikan semua persyaratan telah dipenuhi sebelum mengajukan
                layanan. Untuk informasi lebih lanjut, silakan hubungi petugas
                yang bertugas di lokasi: {instansi.alamat}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailLayanan;
