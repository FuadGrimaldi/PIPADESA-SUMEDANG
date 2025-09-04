"use client";
import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Calendar,
  Users,
  Building,
  Globe,
} from "lucide-react";
import Image from "next/image";

interface Desa {
  subdomain: string;
  id: number;
  nama_desa: string;
  alamat: string;
  telepon: string;
  email: string;
  foto_depan?: string | null;
  twitter: string;
  instagram: string;
  visi: string;
  misi: string;
  tujuan: string;
  sejarah: string;
  gmaps_embed_url: string;
  lat: number | null;
  lng: number | null;
  created_at: string;
  updated_at: string;
}

export default function HostLandingPage() {
  const [villages, setVillages] = useState<Desa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVillages, setFilteredVillages] = useState<Desa[]>([]);

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/desa/");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Ensure data is an array
        const villagesArray = Array.isArray(data.data) ? data.data : [];

        console.log("Fetched villages data:", villagesArray); // Debug log

        setVillages(villagesArray);
        setFilteredVillages(villagesArray);
      } catch (error) {
        console.error("Error fetching villages:", error);
        setError("Gagal memuat data desa. Silakan coba lagi.");
        setVillages([]);
        setFilteredVillages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVillages();
  }, []);

  useEffect(() => {
    // Ensure villages is an array before filtering
    if (!Array.isArray(villages)) {
      setFilteredVillages([]);
      return;
    }

    const filtered = villages.filter(
      (village) =>
        village.nama_desa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        village.alamat?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVillages(filtered);
  }, [searchTerm, villages]);

  const handleVisitWebsite = (subdomain: string) => {
    if (subdomain) {
      window.open(`http://${subdomain}.localhost:3000`, "_blank");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        {/* Header */}
        <header
          className="relative overflow-hidden text-white"
          id="landing-host"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                SID Desa Kabupaten Sumedang
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Portal terintegrasi Sistem Informasi Desa di Kabupaten Sumedang.
                Akses informasi lengkap tentang desa-desa di wilayah Sumedang
                dengan mudah dan cepat.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm"></div>
            </div>
          </div>
        </header>
        {/* Search Section */}
        <div className="bg-white shadow-lg border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari nama desa atau alamat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all duration-300"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Villages Grid */}
        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Daftar Desa di Kabupaten Sumedang
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Klik pada kartu desa untuk mengakses website resmi dan informasi
              lengkap tentang setiap desa
            </p>
            {/* Debug info */}
          </div>
        </main>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Memuat daftar desa...</p>
          </div>
        </div>
      </div>
    );
  }

  // Ensure filteredVillages is always an array
  const safeFilteredVillages = Array.isArray(filteredVillages)
    ? filteredVillages
    : [];

  return (
    <div className="min-h-screen bg-white border border-2 border-gray-200 rounded-3xl shadow-lg">
      {/* Header */}
      <header className="relative overflow-hidden text-white" id="landing-host">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              SID Desa Kabupaten Sumedang
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Portal terintegrasi Sistem Informasi Desa di Kabupaten Sumedang.
              Akses informasi lengkap tentang desa-desa di wilayah Sumedang
              dengan mudah dan cepat.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-lg">
                <Users className="w-4 h-4" />
                <span>{safeFilteredVillages.length} Desa Terdaftar</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-lg">
                <MapPin className="w-4 h-4" />
                <span>Kabupaten Sumedang</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-lg">
                <Calendar className="w-4 h-4" />
                <span>Data Terkini 2024</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari nama desa atau alamat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-2 text-base border-2 border-gray-200 rounded-2xl focus:border-slate-500 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all duration-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-slate-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Villages Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Daftar Desa di Kabupaten Sumedang
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Klik pada kartu desa untuk mengakses website resmi dan informasi
            lengkap tentang setiap desa
          </p>
          {/* Debug info */}
          <div className="mt-4 text-sm text-gray-500">
            Menampilkan {safeFilteredVillages.length} dari {villages.length}{" "}
            desa
          </div>
        </div>

        {/* Villages Grid */}
        {safeFilteredVillages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeFilteredVillages.map((village) => (
              <div
                key={village.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                {/* Village Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={village.foto_depan || "/api/placeholder/400/250"}
                    alt={village.nama_desa || "Foto Desa"}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/images/default-village.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>

                {/* Village Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                    {village.nama_desa || "Nama Desa Tidak Tersedia"}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 leading-relaxed">
                        {village.alamat || "Alamat tidak tersedia"}
                      </span>
                    </div>

                    {village.telepon && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-600">
                          {village.telepon}
                        </span>
                      </div>
                    )}

                    {village.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-600 truncate">
                          {village.email}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleVisitWebsite(village.subdomain)}
                    disabled={!village.subdomain}
                    className="w-full bg-[#C0B099] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-200 flex items-center justify-center gap-2"
                  >
                    <span>Kunjungi Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm
                  ? "Tidak ada desa ditemukan"
                  : "Belum ada data desa"}
              </h3>
              <p className="text-gray-500">
                {searchTerm
                  ? "Coba ubah kata kunci pencarian atau periksa ejaan Anda"
                  : "Silakan hubungi administrator untuk informasi lebih lanjut"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Reset Pencarian
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
