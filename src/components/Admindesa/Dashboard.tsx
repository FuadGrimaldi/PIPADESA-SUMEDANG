"use client";

import { useEffect, useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  FileText,
  Calendar,
  ImageIcon,
  Building,
  MapPin,
  VideoIcon,
  MessageSquare,
  AlertCircle,
  TrendingUp,
  Eye,
  Clock,
} from "lucide-react";

// publikasi
import { Video } from "@/types/video";
import { Article } from "@/types/article";
import { Agenda } from "@/types/agenda";
import { Infografis } from "@/types/infografis";
// profile desa
import { Desa } from "@/types/desa";
// struktur
import { Official } from "@/types/official";
// direktori
import { Organisasi, KategoriOrganisasi } from "@/types/organisasi";
import { Sarana, SaranaWisataUnggulan } from "@/types/sarana";
// partisipasi publik
import {
  PengaduanAspirasi,
  PengaduanAspirasiKategori,
} from "@/types/pengaduanAspirasi";
import { Komentar } from "@/types/komentar";
// Stat
import { Sdgs, SdgsScore } from "@/types/sdgs";

interface Props {
  desaId: number;
}

interface DashboardStats {
  totalVideos: number;
  totalArticles: number;
  totalAgendas: number;
  totalInfografis: number;
  totalOfficials: number;
  totalOrganisasi: number;
  totalSarana: number;
  totalWisata: number;
  totalPengaduan: number;
  totalKomentar: number;
  recentActivity: any[];
  popularContent: any[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function Dashboard({ desaId }: Props) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [infografis, setInfografis] = useState<Infografis[]>([]);
  const [officials, setOfficials] = useState<Official[]>([]);
  const [organisasis, setOrganisasis] = useState<Organisasi[]>([]);
  const [kategoriOrganisasis, setKategoriOrganisasis] = useState<
    KategoriOrganisasi[]
  >([]);
  const [saranas, setSaranas] = useState<Sarana[]>([]);
  const [saranaWisataUnggulans, setSaranaWisataUnggulans] = useState<
    SaranaWisataUnggulan[]
  >([]);
  const [pengaduanAspirasis, setPengaduanAspirasis] = useState<
    PengaduanAspirasi[]
  >([]);
  const [komentars, setKomentars] = useState<Komentar[]>([]);
  const [sdgs, setSdgs] = useState<Sdgs[]>([]);
  const [sdgsScores, setSdgsScores] = useState<SdgsScore[]>([]);
  const [desa, setDesa] = useState<Desa | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch functions
  const fetchVideos = useCallback(async () => {
    try {
      const res = await fetch(`/api/videos/subdomain/${desaId}`);
      if (res.ok) {
        const data = await res.json();
        setVideos(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch videos error:", error);
      setVideos([]);
    }
  }, [desaId]);

  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch(`/api/articles/subdomain/${desaId}`);
      if (res.ok) {
        const data = await res.json();
        setArticles(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch articles error:", error);
      setArticles([]);
    }
  }, [desaId]);

  const fetchAgendas = useCallback(async () => {
    try {
      const res = await fetch(`/api/agenda/subdomain/${desaId}`);
      if (res.ok) {
        const data = await res.json();
        setAgendas(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch agendas error:", error);
      setAgendas([]);
    }
  }, [desaId]);

  const fetchInfografis = useCallback(async () => {
    try {
      const res = await fetch(`/api/infografis/subdomain/${desaId}`);
      if (res.ok) {
        const data = await res.json();
        setInfografis(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch infografis error:", error);
      setInfografis([]);
    }
  }, [desaId]);

  const fetchOfficials = useCallback(async () => {
    try {
      const res = await fetch(`/api/officials/subdomain/${desaId}`);
      if (res.ok) {
        const data = await res.json();
        setOfficials(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch officials error:", error);
      setOfficials([]);
    }
  }, [desaId]);

  const fetchOrganisasi = useCallback(async () => {
    try {
      const res = await fetch(`/api/organisasi/subdomain/${desaId}`);
      if (res.ok) {
        const data = await res.json();
        setOrganisasis(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch organisasi error:", error);
      setOrganisasis([]);
    }
  }, [desaId]);

  const fetchKategoriOrganisasi = useCallback(async () => {
    try {
      const res = await fetch(`/api/organisasi/kategori/subdomain/${desaId}`);
      if (res.ok) {
        const data = await res.json();
        setKategoriOrganisasis(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch kategori organisasi error:", error);
      setKategoriOrganisasis([]);
    }
  }, [desaId]);

  const fetchSarana = useCallback(async () => {
    try {
      const res = await fetch(`/api/sarana/subdomain/${desaId}`);
      if (res.ok) {
        const data = await res.json();
        const filteredSarana = data.filter(
          (sarana: Sarana) => sarana.kategori !== "wisata"
        );
        setSaranas(Array.isArray(filteredSarana) ? filteredSarana : []);
      }
    } catch (error) {
      console.error("Fetch sarana error:", error);
      setSaranas([]);
    }
  }, [desaId]);

  const fetchSaranaWisata = useCallback(async () => {
    try {
      const res = await fetch(`/api/sarana/subdomain/${desaId}?type=wisata`);
      if (res.ok) {
        const data = await res.json();
        setSaranaWisataUnggulans(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch sarana wisata error:", error);
      setSaranaWisataUnggulans([]);
    }
  }, [desaId]);

  const fetchPengaduanAspirasi = useCallback(async () => {
    try {
      const res = await fetch(`/api/pengaduan-aspirasi/subdomain/${desaId}`);
      if (res.ok) {
        const data = await res.json();
        setPengaduanAspirasis(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch pengaduan aspirasi error:", error);
      setPengaduanAspirasis([]);
    }
  }, [desaId]);

  const fetchKomentar = useCallback(async () => {
    try {
      const res = await fetch(`/api/komentar/subdomain/${desaId}`);
      if (res.ok) {
        const data = await res.json();
        setKomentars(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch komentar error:", error);
      setKomentars([]);
    }
  }, [desaId]);

  const fetchSDGs = useCallback(async () => {
    try {
      const res = await fetch(`/api/sdgs/`);
      if (res.ok) {
        const data = await res.json();
        setSdgs(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch SDGs error:", error);
      setSdgs([]);
    }
  }, []);

  const fetchSDGsScores = useCallback(async () => {
    try {
      const res = await fetch(`/api/sdgs/score/subdomain/${desaId}`);
      if (res.ok) {
        const data = await res.json();
        setSdgsScores(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Fetch SDGs scores error:", error);
      setSdgsScores([]);
    }
  }, [desaId]);

  const fetchDesa = useCallback(async () => {
    try {
      const res = await fetch(`/api/desa/${desaId}`);
      if (res.ok) {
        const data = await res.json();
        setDesa(data.data);
      }
    } catch (error) {
      console.error("Fetch desa error:", error);
      setDesa(null);
    }
  }, [desaId]);

  // Fetch all data
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      try {
        await Promise.all([
          fetchVideos(),
          fetchArticles(),
          fetchAgendas(),
          fetchInfografis(),
          fetchOfficials(),
          fetchOrganisasi(),
          fetchKategoriOrganisasi(),
          fetchSarana(),
          fetchSaranaWisata(),
          fetchPengaduanAspirasi(),
          fetchKomentar(),
          fetchSDGs(),
          fetchSDGsScores(),
          fetchDesa(),
        ]);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Gagal memuat data dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (desaId) {
      fetchAllData();
    }
  }, [
    desaId,
    fetchVideos,
    fetchArticles,
    fetchAgendas,
    fetchInfografis,
    fetchOfficials,
    fetchOrganisasi,
    fetchKategoriOrganisasi,
    fetchSarana,
    fetchSaranaWisata,
    fetchPengaduanAspirasi,
    fetchKomentar,
    fetchSDGs,
    fetchSDGsScores,
    fetchDesa,
  ]);

  // Calculate dashboard statistics
  const getDashboardStats = (): DashboardStats => {
    const recentActivity = [
      ...articles.slice(0, 3).map((item) => ({
        type: "Article",
        title: item.title,
        date: item.created_at,
        icon: FileText,
      })),
      ...agendas.slice(0, 2).map((item) => ({
        type: "Agenda",
        judul: item.judul,
        date: item.created_at,
        icon: Calendar,
      })),
      ...pengaduanAspirasis.slice(0, 2).map((item) => ({
        type: "Pengaduan",
        title: `Pengaduan dari ${item.name}`,
        date: item.created_at,
        icon: AlertCircle,
      })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    return {
      totalVideos: videos.length,
      totalArticles: articles.length,
      totalAgendas: agendas.length,
      totalInfografis: infografis.length,
      totalOfficials: officials.length,
      totalOrganisasi: organisasis.length,
      totalSarana: saranas.length,
      totalWisata: saranaWisataUnggulans.length,
      totalPengaduan: pengaduanAspirasis.length,
      totalKomentar: komentars.length,
      recentActivity,
      popularContent: articles.slice(0, 5),
    };
  };

  const stats = getDashboardStats();

  // Chart data
  const contentData = [
    { name: "Artikel", value: stats.totalArticles, color: "#0088FE" },
    { name: "Video", value: stats.totalVideos, color: "#00C49F" },
    { name: "Agenda", value: stats.totalAgendas, color: "#FFBB28" },
    { name: "Infografis", value: stats.totalInfografis, color: "#FF8042" },
  ];

  const organizationData = [
    { name: "Aparat Desa", value: stats.totalOfficials, color: "#8884D8" },
    { name: "Organisasi", value: stats.totalOrganisasi, color: "#82CA9D" },
    { name: "Sarana", value: stats.totalSarana, color: "#FFC658" },
    { name: "Wisata", value: stats.totalWisata, color: "#FF7300" },
  ];

  const interactionData = [
    { name: "Jan", pengaduan: 12, komentar: 45 },
    { name: "Feb", pengaduan: 19, komentar: 52 },
    { name: "Mar", pengaduan: 15, komentar: 38 },
    { name: "Apr", pengaduan: 22, komentar: 61 },
    { name: "May", pengaduan: 18, komentar: 43 },
    { name: "Jun", pengaduan: 25, komentar: 55 },
  ];

  // Loading state
  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Desa</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard Desa {desa?.subdomain}
          </h2>
          <p className="text-gray-600">
            Desa {desa?.subdomain || "Loading..."} - Ringkasan Data dan
            Statistik
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString("id-ID")}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Content Stats */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Artikel</p>
              <p className="text-3xl font-bold">{stats.totalArticles}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Video</p>
              <p className="text-3xl font-bold">{stats.totalVideos}</p>
            </div>
            <VideoIcon className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Total Agenda</p>
              <p className="text-3xl font-bold">{stats.totalAgendas}</p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Infografis</p>
              <p className="text-3xl font-bold">{stats.totalInfografis}</p>
            </div>
            <ImageIcon className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        {/* Organization Stats */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100">Aparat Desa</p>
              <p className="text-3xl font-bold">{stats.totalOfficials}</p>
            </div>
            <Users className="w-8 h-8 text-indigo-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100">Organisasi</p>
              <p className="text-3xl font-bold">{stats.totalOrganisasi}</p>
            </div>
            <Building className="w-8 h-8 text-pink-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100">Sarana Desa</p>
              <p className="text-3xl font-bold">{stats.totalSarana}</p>
            </div>
            <MapPin className="w-8 h-8 text-teal-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Pengaduan</p>
              <p className="text-3xl font-bold">{stats.totalPengaduan}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-200" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Distribusi Konten</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={contentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {contentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Organization Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            Distribusi Organisasi & Sarana
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={organizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8">
                {organizationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interaction Trends */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Tren Interaksi Publik</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={interactionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pengaduan"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="komentar"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Aktivitas Terbaru
          </h3>
          <div className="space-y-3">
            {stats.recentActivity.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <IconComponent className="w-5 h-5 text-gray-500 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.date).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {activity.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Statistik Cepat
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">Kategori Organisasi</span>
              <span className="text-lg font-bold text-blue-600">
                {kategoriOrganisasis.length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Wisata Unggulan</span>
              <span className="text-lg font-bold text-green-600">
                {stats.totalWisata}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium">Total Komentar</span>
              <span className="text-lg font-bold text-yellow-600">
                {stats.totalKomentar}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium">Data SDGs</span>
              <span className="text-lg font-bold text-purple-600">
                {sdgs.length}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
              <span className="text-sm font-medium">Skor SDGs</span>
              <span className="text-lg font-bold text-indigo-600">
                {sdgsScores.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-2">Total Publikasi</h4>
          <p className="text-3xl font-bold">
            {stats.totalArticles +
              stats.totalVideos +
              stats.totalAgendas +
              stats.totalInfografis}
          </p>
          <p className="text-cyan-100 text-sm">
            Artikel, Video, Agenda & Infografis
          </p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-2">Total Struktur</h4>
          <p className="text-3xl font-bold">
            {stats.totalOfficials + stats.totalOrganisasi}
          </p>
          <p className="text-emerald-100 text-sm">Aparat Desa & Organisasi</p>
        </div>

        <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-2">Total Partisipasi</h4>
          <p className="text-3xl font-bold">
            {stats.totalPengaduan + stats.totalKomentar}
          </p>
          <p className="text-violet-100 text-sm">Pengaduan & Komentar</p>
        </div>
      </div>
    </div>
  );
}
