"use client";
import React from "react";
import { Article } from "@/types/article";
import { Agenda } from "@/types/agenda";
import { Infografis } from "../Admindesa/Infografis";
import { useState, useEffect, useCallback } from "react";
import SidebarNewsLanding from "../Sidebar/SidebarNewsLanding";
import { BlogCard, BlogCardAgenda } from "../Card/CardLanding";
import SidebarInfografisLanding from "../Sidebar/SidebarInfografisLanding";
import SidebarPengumumanLanding from "../Sidebar/SidebarAnncounment";

interface AllBeritaProps {
  desaId: number;
}

const News = ({ desaId }: AllBeritaProps) => {
  const [pengumaman, setPengumuman] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [agenda, setAgenda] = useState<Agenda[]>([]);
  const [infografis, setInfografis] = useState<Infografis[]>([]);
  const [sidebarArticles, setSidebarArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgenda = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/agenda/subdomain/${desaId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch agenda");
      }
      const data = await res.json();
      setAgenda(data);
    } catch (error) {
      console.error("Error fetching agenda:", error);
      setError("Gagal memuat agenda");
      setAgenda([]);
    } finally {
      setLoading(false);
    }
  }, [desaId]);

  const fetchInfografis = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/infografis/subdomain/${desaId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch agenda");
      }
      const data = await res.json();
      setInfografis(data);
    } catch (error) {
      console.error("Error fetching agenda:", error);
      setError("Gagal memuat agenda");
      setInfografis([]);
    } finally {
      setLoading(false);
    }
  }, [desaId]);

  // Fetch articles by desa_id
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Gunakan endpoint khusus untuk desa dengan filter
      const res = await fetch(
        `/api/articles/subdomain/${desaId}?tipe=BERITA&status=PUBLISHED`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setArticles([]);
        setSidebarArticles([]);
        setPengumuman([]);
      } else {
        // Sort by published_at descending
        const sortedArticles = data.sort(
          (a: Article, b: Article) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
        );
        const pengumumanTerbaru = data
          .filter((a: Article) => a.tipe === "pengumuman")
          .sort(
            (a: Article, b: Article) =>
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
          )
          .slice(0, 3);

        setPengumuman(pengumumanTerbaru);

        setArticles(sortedArticles);
        // Set different articles for sidebar (skip first 3 for main display)
        setSidebarArticles(sortedArticles.slice(3, 7));
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Gagal memuat artikel");
      setArticles([]);
      setSidebarArticles([]);
    } finally {
      setLoading(false);
    }
  }, [desaId]);

  // Fetch articles when desaId changes
  useEffect(() => {
    if (desaId) {
      fetchArticles();
      fetchAgenda();
      fetchInfografis();
    }
  }, [desaId, fetchArticles, fetchAgenda, fetchInfografis]);

  // Loading state
  if (loading) {
    return (
      <section className="pb-16 pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Berita dan Informasi
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Temukan berbagai kabar terbaru, pengumuman resmi, dan informasi
              penting seputar kegiatan dan perkembangan di lingkungan kita.
            </p>
          </div>
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-500">Memuat berita...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="pb-16 pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Berita dan Informasi
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Temukan berbagai kabar terbaru, pengumuman resmi, dan informasi
              penting seputar kegiatan dan perkembangan di lingkungan kita.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
              <span className="text-red-700">Error: {error}</span>
            </div>
            <div className="mt-4">
              <button
                onClick={fetchArticles}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Get first 3 articles for main display
  const displayedNews = articles.slice(0, 3);
  const displayedAgenda = agenda.slice(0, 3);

  return (
    <section className="pb-16 pt-20">
      <div className="container mx-auto">
        <div className="text-center mb-12 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            Berita dan Informasi
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Temukan berbagai kabar terbaru, pengumuman resmi, dan informasi
            penting seputar kegiatan dan perkembangan di lingkungan kita.
          </p>
        </div>

        {displayedNews.length === 0 ? (
          // No articles state
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
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v8m0 0V9a2 2 0 00-2-2H9m10 13a2 2 0 01-2-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 01-2 2h10z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Belum Ada Berita
              </h3>
              <p className="text-gray-500">
                Tidak ada berita yang tersedia untuk desa ini saat ini.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-3/4 mb-6 lg:mb-0 space-y-6 bg-white p-4 rounded-md border border-gray-200 shadow-md">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg lg:text-2xl font-bold text-dark dark:text-white mb-4">
                      Berita Terbaru
                    </h2>
                    <div>
                      <a
                        href="/berita"
                        className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded transition text-sm hover:bg-blue-500"
                      >
                        Lihat Semua Berita...
                      </a>
                    </div>
                  </div>
                  <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedNews.map((article) => (
                      <BlogCard key={article.id} article={article} />
                    ))}
                  </div>
                  {/* Show All Button */}
                </div>
                <div className="my-10 border-t-2 border-gray-300"></div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg lg:text-2xl font-bold text-dark dark:text-white mb-4">
                      Agenda Terbaru
                    </h2>
                    <div>
                      <a
                        href="/agenda"
                        className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded transition text-sm hover:bg-blue-500"
                      >
                        Lihat Semua Agenda...
                      </a>
                    </div>
                  </div>
                  <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedAgenda.map((agenda) => (
                      <BlogCardAgenda key={agenda.id} agenda={agenda} />
                    ))}
                  </div>
                  {/* Show All Button */}
                </div>
              </div>
              {/* Main Blog Cards */}
              <div className="border-r-2 border-gray-300"></div>
              <div className="flex flex-col gap-6 w-full lg:w-1/4 bg-white p-4 rounded-md border border-gray-200 shadow-md">
                <div className="bg-gray-200 rounded-lg shadow-lg px-[0.5px]"></div>
                {/* Sidebar */}
                <SidebarPengumumanLanding articles={pengumaman} />
                <div className="bg-gray-200 rounded-lg shadow-lg px-[0.5px]"></div>
                <SidebarNewsLanding articles={sidebarArticles} />
                {/* Sidebar */}
                <div className="bg-gray-200 rounded-lg shadow-lg px-[0.5px]"></div>
                <SidebarInfografisLanding infografis={infografis} />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default News;
