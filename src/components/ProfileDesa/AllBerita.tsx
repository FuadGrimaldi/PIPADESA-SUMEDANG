"use client";
import React, { useState, useEffect, useCallback } from "react";
import CardNews from "../Card/NewsCard";
import { motion } from "framer-motion";
import { Article } from "@/types/article";

interface AllBeritaProps {
  desaId: number;
}

const ITEMS_PER_PAGE = 6;

const AllBerita = ({ desaId }: AllBeritaProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to update URL with page param
  const updateURL = (page: number) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (page === 1) {
        url.searchParams.delete("page");
      } else {
        url.searchParams.set("page", page.toString());
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  // Fetch articles by desa_id
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/articles`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setArticles([]);
      } else {
        // Filter artikel dengan tipe 'berita' dan status 'published'
        const beritaArticles = data.filter(
          (article: Article) =>
            article.tipe === "berita" &&
            article.status === "published" &&
            article.desa_id === desaId
        );
        setArticles(beritaArticles);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Gagal memuat artikel");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [desaId]);

  // Initialize page from URL on component mount

  // Fetch articles when desaId or currentPage changes
  useEffect(() => {
    if (desaId) {
      fetchArticles();
    }
  }, [desaId, currentPage, fetchArticles]);

  // Update URL when page changes
  useEffect(() => {
    updateURL(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
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
  };

  // Convert Article to format expected by CardNews
  const convertArticleToNewsCard = (article: Article) => ({
    id: article.id,
    title: article.title,
    excerpt: article.content.substring(0, 150) + "...", // Create excerpt from content
    image: article.featured_image || "/default-news-image.jpg",
    date: new Date(article.published_at).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    category: article.tipe,
  });

  if (loading) {
    return (
      <section>
        <div className="container mx-auto px-4">
          <div className="mb-6 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
                Berita & Informasi Desa
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Temukan berbagai kabar terbaru, pengumuman resmi, dan informasi
                penting seputar kegiatan dan perkembangan di lingkungan kita.
              </p>
            </div>
          </div>
          <div className="text-center text-gray-500">Memuat berita...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="container mx-auto px-4">
          <div className="mb-6 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
                Berita & Informasi Desa
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Temukan berbagai kabar terbaru, pengumuman resmi, dan informasi
                penting seputar kegiatan dan perkembangan di lingkungan kita.
              </p>
            </div>
          </div>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  if (currentItems.length === 0) {
    return (
      <section>
        <div className="container mx-auto px-4">
          <div className="mb-6 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
                Berita & Informasi Desa
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Temukan berbagai kabar terbaru, pengumuman resmi, dan informasi
                penting seputar kegiatan dan perkembangan di lingkungan kita.
              </p>
            </div>
          </div>
          <div className="text-center text-gray-500">
            Tidak ada berita yang tersedia.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Berita & Informasi Desa
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Temukan berbagai kabar terbaru, pengumuman resmi, dan informasi
              penting seputar kegiatan dan perkembangan di lingkungan kita.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentItems.map((article) => {
            const newsData = convertArticleToNewsCard(article);
            return (
              <CardNews
                id={newsData.id}
                key={newsData.id}
                date={newsData.date}
                CardTitle={newsData.title}
                CardDescription={newsData.excerpt}
                image={newsData.image}
                category={newsData.category}
              />
            );
          })}
        </motion.div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center space-y-4 mt-6">
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
              {Math.min(startIndex + ITEMS_PER_PAGE, articles.length)} of{" "}
              {articles.length} articles
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBerita;
