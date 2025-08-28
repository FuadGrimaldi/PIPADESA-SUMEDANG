"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import {
  Calendar,
  MapPin,
  User,
  Clock,
  FileText,
  Share2,
  ArrowLeft,
  Eye,
} from "lucide-react";
import { Article } from "@/types/article";
import CommentSection from "./Comment";

interface ArticleDetailProps {
  articleId: number;
}

const ArticleDetail = ({ articleId }: ArticleDetailProps) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  const onBack = () => {
    window.history.back();
  };
  // Fetch article detail
  const fetchArticle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/articles/${articleId}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setArticle(data);
        // Fetch related articles from same desa
        fetchRelatedArticles(data.desa_id, data.id);
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      setError("Gagal memuat artikel");
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  // Fetch related articles
  const fetchRelatedArticles = async (
    desaId: number,
    currentArticleId: number
  ) => {
    try {
      const res = await fetch(`/api/articles`);
      const data = await res.json();

      if (!data.error) {
        // Filter out current article and only show published articles
        const related = data
          .filter(
            (art: Article) =>
              art.id !== currentArticleId &&
              art.status === "published" &&
              art.desa_id === desaId
          )
          .slice(0, 3);
        setRelatedArticles(related);
      }
    } catch (error) {
      console.error("Error fetching related articles:", error);
    }
  };

  useEffect(() => {
    if (articleId) {
      fetchArticle();
    }
  }, [articleId, fetchArticle]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      berita: "bg-blue-100 text-blue-800 border-blue-200",
      pengumuman: "bg-yellow-100 text-yellow-800 border-yellow-200",
      kegiatan: "bg-green-100 text-green-800 border-green-200",
      agenda: "bg-purple-100 text-purple-800 border-purple-200",
      sakip: "bg-red-100 text-red-800 border-red-200",
      sid: "bg-indigo-100 text-indigo-800 border-indigo-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.content.substring(0, 100) + "...",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link berhasil disalin!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-4 w-1/4"></div>
              <div className="h-64 bg-gray-300 rounded mb-6"></div>
              <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {error || "Artikel tidak ditemukan"}
          </h2>
          <p className="text-gray-600 mb-6">
            Maaf, artikel yang Anda cari tidak tersedia.
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali
          </button>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Article Header */}
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(
                    article.tipe
                  )}`}
                >
                  {article.tipe.charAt(0).toUpperCase() + article.tipe.slice(1)}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(article.published_at)}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatTime(article.published_at)}
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {article.users && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.users.full_name}
                    </div>
                  )}
                  {article.profile_desa && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {article.profile_desa.nama_desa}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleShare}
                  className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Bagikan
                </button>
              </div>
            </div>

            {/* Featured Image */}
            {article.featured_image && (
              <div className="relative w-full h-[300px] md:h-[600px]">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  className="object-contain w-full h-full rounded-t-xl"
                  style={{ objectPosition: "center" }}
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                {parse(article.content)}
              </div>

              {/* Additional Info */}
              {(article.waktu_kegiatan ||
                article.lokasi_kegiatan ||
                article.dokumen_terkait_path) && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Informasi Tambahan
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {article.waktu_kegiatan && (
                      <div>
                        <span className="font-medium text-gray-700">Waktu</span>
                        <p className="text-gray-600">
                          {formatDate(article.waktu_kegiatan)} -{" "}
                          {formatTime(article.waktu_kegiatan)}
                        </p>
                      </div>
                    )}

                    {article.lokasi_kegiatan && (
                      <div>
                        <span className="font-medium text-gray-700">
                          Lokasi:
                        </span>
                        <p className="text-gray-600">
                          {article.lokasi_kegiatan}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <CommentSection articleId={article.id} desaId={article.desa_id} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
