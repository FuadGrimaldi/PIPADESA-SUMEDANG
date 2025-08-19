"use client";
import Image from "next/image";
import React from "react";
import { Article } from "@/types/article";
import { useState, useEffect, useCallback } from "react";

interface AllBeritaProps {
  desaId: number;
}

const News = ({ desaId }: AllBeritaProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sidebarArticles, setSidebarArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } else {
        // Sort by published_at descending
        const sortedArticles = data.sort(
          (a: Article, b: Article) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
        );

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
    }
  }, [desaId, fetchArticles]);

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
              {/* Main Blog Cards */}
              <div className="w-full lg:w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedNews.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>

              <div className="bg-gray-200 rounded-lg shadow-lg px-[0.5px]"></div>

              {/* Sidebar */}
              <SidebarNews articles={sidebarArticles} />
            </div>

            {/* Show All Button */}
            <div className="text-left mt-6">
              <a
                href="/berita"
                className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded transition text-sm hover:bg-blue-500"
              >
                Lihat Semua Berita...
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default News;

// Updated BlogCard component to use Article data
interface BlogCardProps {
  article: Article;
}

const BlogCard = ({ article }: BlogCardProps) => {
  // Format date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Truncate description
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (!content) return "";
    const plainText = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <Image
          src={article.featured_image || "/images/default-article.jpg"}
          alt={article.title}
          className="w-full h-48 object-cover"
          width={400}
          height={200}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/default-article.jpg";
          }}
        />
        <div className="absolute top-0 right-0 text-black text-xs px-3 py-1 m-2 rounded backdrop-blur-xl bg-white/60">
          {article.tipe || "Berita"}
        </div>
      </div>

      <div className="p-5">
        <span className="inline-block text-xs font-medium text-black border-2 border-blue-300 px-3 py-1 rounded-lg">
          {formatDate(article.published_at)}
        </span>
        <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-blue-600 transition">
          <a href={`/berita/${article.id}`} className="line-clamp-2">
            {article.title}
          </a>
        </h3>
        <p className="mt-2 text-sm text-gray-700 line-clamp-3">
          {truncateContent(article.content)}
        </p>
      </div>
    </div>
  );
};

// Updated SidebarNews component
interface SidebarNewsProps {
  articles: Article[];
}

const SidebarNews = ({ articles }: SidebarNewsProps) => {
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Fallback items if no articles available
  const fallbackItems = [
    {
      title: "Informasi akan segera tersedia",
      link: "#",
      date: formatDate(new Date()),
    },
  ];

  const displayItems = articles.length > 0 ? articles : fallbackItems;

  return (
    <div className="w-full lg:w-1/4">
      <h4 className="text-xl font-semibold text-dark dark:text-white mb-4">
        Informasi Lainnya
      </h4>
      <ul className="space-y-4">
        {displayItems.slice(0, 4).map((item, idx) => (
          <li key={idx} className="border-b pb-3 dark:border-gray-700">
            <a
              href={
                articles.length > 0 ? `/berita/${(item as Article).id}` : "#"
              }
              className="block text-md font-medium text-blue-600 hover:underline line-clamp-2"
            >
              {articles.length > 0 ? (item as Article).title : item.title}
            </a>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {articles.length > 0
                ? formatDate((item as Article).published_at)
                : item.date}
            </span>
          </li>
        ))}
      </ul>

      {articles.length > 4 && (
        <div className="mt-4">
          <a href="/berita" className="text-sm text-blue-600 hover:underline">
            Lihat semua informasi →
          </a>
        </div>
      )}
    </div>
  );
};
