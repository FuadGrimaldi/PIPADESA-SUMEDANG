"use client";
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { Article } from "@/types/article";
import Image from "next/image";
import Link from "next/link";

interface SearchArticleProps {
  articles: Article[]; // ✅ hasil search diterima dari parent
}

const ITEMS_PER_PAGE = 6;

const SearchArticle = ({ articles }: SearchArticleProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      for (let i = start; i <= end; i++) pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const convertArticleToNewsCard = (article: Article) => ({
    id: article.id,
    title: article.title,
    excerpt: article.content.substring(0, 150) + "...",
    image: article.featured_image || "/default-news-image.jpg",
    date: new Date(article.published_at).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    category: article.tipe,
  });

  if (articles.length === 0) {
    return (
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700  mb-4">
              Hasil Pencarian
            </h2>
            <p className="text-base text-gray-600">
              Artikel yang ditemukan berdasarkan pencarian Anda.
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
              Tidak Ada Hasil
            </h3>
            <p className="text-gray-500">
              Tidak ditemukan artikel yang sesuai dengan pencarian Anda.
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700  mb-4">
              Hasil Pencarian
            </h2>
            <p className="text-base text-gray-600">
              Artikel yang ditemukan berdasarkan pencarian Anda.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col gap-6"
        >
          {currentItems.map((article) => {
            const newsData = convertArticleToNewsCard(article);
            return (
              <Link
                key={newsData.id}
                href={`/berita/${newsData.id}`}
                className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Gambar di kiri */}
                <div className="sm:w-1/3 w-full h-48 sm:h-auto relative">
                  <div className="h-48 w-62">
                    <Image
                      src={newsData.image}
                      alt={newsData.title}
                      className="w-full h-full object-cover "
                      width={400}
                      height={200}
                    />
                  </div>
                  <div className="absolute top-0 right-0 text-black text-xs px-3 py-1 m-2 rounded backdrop-blur-xl bg-white/60">
                    {newsData.category}
                  </div>
                </div>

                {/* Konten di kanan */}
                <div className="sm:w-2/3 w-full p-5 flex flex-col justify-center">
                  <time
                    dateTime={newsData.date}
                    className="flex items-center text-[12px] text-gray-500"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 
                   2v10a2 2 0 002 2h12a2 2 0 
                   002-2V6a2 2 0 00-2-2h-1V3a1 
                   1 0 10-2 0v1H7V3a1 1 
                   0 00-1-1zm0 5a1 1 0 000 
                   2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {newsData.date}
                  </time>

                  <h3 className="mt-2 text-lg font-semibold text-gray-900 hover:text-blue-600 transition">
                    <span>{newsData.title}</span>
                  </h3>

                  <div className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {parse(newsData.excerpt)}
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center space-y-4 mt-6">
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium bg-white border rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium bg-white border rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchArticle;
