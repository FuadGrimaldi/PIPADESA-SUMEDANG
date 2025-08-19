"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { Article } from "@/types/article";

interface SidebarNewsPhotoProps {
  desaId: number;
}

const SidebarNewsPhoto = ({ desaId }: SidebarNewsPhotoProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles by desa_id - PERBAIKI: hapus dependencies yang tidak perlu
  const fetchSidebarArticles = useCallback(async () => {
    if (!desaId) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/articles/subdomain/${desaId}?status=PUBLISHED&limit=4`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setArticles([]);
      } else {
        // Sort by published date and take only 4
        const sortedArticles = data
          .sort(
            (a: Article, b: Article) =>
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
          )
          .slice(0, 3);

        setArticles(sortedArticles);
      }
    } catch (error) {
      console.error("Error fetching sidebar articles:", error);
      setError("Gagal memuat artikel");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [desaId]); // PERBAIKI: hanya desaId sebagai dependency

  // Fetch articles when desaId changes - PERBAIKI: tambah guard
  useEffect(() => {
    if (desaId && desaId > 0) {
      fetchSidebarArticles();
    }
  }, [fetchSidebarArticles, desaId]); // fetchSidebarArticles sudah memoized dengan desaId

  // Format date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Truncate title
  const truncateTitle = (title: string, maxLength: number = 60) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  // PERBAIKI: tambah early return jika desaId tidak valid
  if (!desaId || desaId <= 0) {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b-2 border-[#C0B099] pb-2">
          Informasi Lainnya
        </h4>
        <div className="space-y-5">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-32 rounded-lg mb-3"></div>
              <div className="space-y-2">
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-3/4"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b-2 border-[#C0B099] pb-2">
          Informasi Lainnya
        </h4>
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">
            <svg
              className="w-8 h-8 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {error}
          </p>
          <button
            onClick={fetchSidebarArticles}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // No articles state
  if (articles.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b-2 border-[#C0B099] pb-2">
          Informasi Lainnya
        </h4>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg
              className="w-8 h-8 mx-auto"
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
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Belum ada artikel tersedia
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b-2 border-[#C0B099] pb-2">
        Informasi Lainnya
      </h4>

      <div className="space-y-5">
        {articles.map((article) => (
          <article
            key={article.id}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700/50"
          >
            <a href={`/berita/${article.id}`} className="block">
              <div className="relative overflow-hidden">
                <Image
                  width={400}
                  height={200}
                  src={article.featured_image || "/images/default-article.jpg"}
                  alt={article.title}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/default-article.jpg";
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {article.tipe || "Berita"}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-4">
                <h5 className="text-sm font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {truncateTitle(article.title)}
                </h5>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <time
                    dateTime={new Date(article.published_at).toISOString()}
                    className="flex items-center"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {formatDate(article.published_at)}
                  </time>

                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-blue-600 dark:text-blue-400">
                      Baca
                    </span>
                    <svg
                      className="w-3 h-3 ml-1 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href="/berita"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200"
        >
          Lihat Semua Berita
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SidebarNewsPhoto;
