"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import RichTextEditor from "../Ui/Editor/RichTextEditor";
import Link from "next/link";
import parse from "html-react-parser";

type Article = {
  id: number;
  user_id: number;
  desa_id: number;
  tipe: string;
  title: string;
  slug: string;
  content: string;
  featured_image?: string;
  dokumen_terkait_path?: string;
  waktu_kegiatan?: string;
  lokasi_kegiatan?: string;
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  profile_desa?: {
    nama_desa: string;
  };
  user?: {
    name: string;
  };
};

interface ArticleManagerProps {
  desaId: number;
  userId: number;
}

export default function ArticleManager({
  desaId,
  userId,
}: ArticleManagerProps) {
  const [content, setContent] = useState(""); // For RichTextEditor
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Article | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles`);
      const data = await res.json();
      console.log("Fetched articles data:", data);

      if (data.error) {
        console.error("Error fetching articles:", data.error);
        setArticles([]);
        setFilteredArticles([]);
      } else {
        console.log("Fetched articles:", data);
        // Filter articles by desaId if needed
        const desaArticles = data.filter(
          (article: Article) => article.desa_id === desaId
        );
        setArticles(desaArticles);
        setFilteredArticles(desaArticles);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setArticles([]);
      setFilteredArticles([]);
    }
    setLoading(false);
  }, [desaId]);

  useEffect(() => {
    if (desaId) {
      fetchArticles();
    }
  }, [desaId, fetchArticles]);

  const handleOpenAdd = () => {
    setEditData(null);
    setContent("");
    setModalOpen(true);
  };

  const handleOpenEdit = (article: Article) => {
    setEditData(article);
    setContent(article.content || ""); // Set content for RichTextEditor
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus artikel ini?")) return;

    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchArticles();
        alert("Artikel berhasil dihapus!");
      } else {
        alert("Gagal menghapus artikel");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Terjadi kesalahan saat menghapus artikel");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    // tambahkan isi CKEditor ke form
    fd.set("content", content);

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/articles/${editData.id}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        // For new article, ensure desa_id and user_id are set
        if (!fd.get("desa_id")) {
          fd.set("desa_id", desaId.toString());
        }
        if (!fd.get("user_id")) {
          fd.set("user_id", userId.toString());
        }

        res = await fetch("/api/articles", {
          method: "POST",
          body: fd,
        });
      }

      if (res.ok) {
        setModalOpen(false);
        setContent(""); // Reset content after submit
        fetchArticles();
        alert("Artikel berhasil disimpan!");
      } else {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert(`Error: ${errorData.error || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Terjadi kesalahan saat menyimpan artikel");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter(
          (article) =>
            article.title.toLowerCase().includes(value) ||
            article.content.toLowerCase().includes(value)
        )
      );
    }
  };

  if (modalOpen) {
    return (
      <div>
        <div className="bg-white w-full p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">
            {editData ? "Edit Artikel" : "Tambah Artikel"}
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Hidden fields for user_id and desa_id when adding new */}
            {!editData && (
              <>
                <input type="hidden" name="user_id" value={userId} />
                <input type="hidden" name="desa_id" value={desaId} />
              </>
            )}

            {/* Show user_id and desa_id fields only when editing */}
            {editData && (
              <>
                <div className="mb-3">
                  <label className="block mb-1">User ID</label>
                  <input
                    type="number"
                    name="user_id"
                    defaultValue={editData.user_id}
                    className="border w-full px-3 py-2 rounded bg-gray-100"
                    required
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Desa ID</label>
                  <input
                    type="number"
                    name="desa_id"
                    defaultValue={editData.desa_id}
                    className="border w-full px-3 py-2 rounded bg-gray-100"
                    required
                    readOnly
                  />
                </div>
              </>
            )}

            <div className="mb-3">
              <label className="block mb-1">Tipe Artikel *</label>
              <select
                name="tipe"
                defaultValue={editData?.tipe || ""}
                className="border w-full px-3 py-2 rounded"
                required
              >
                <option value="">Pilih Tipe</option>
                <option value="berita">Berita</option>
                <option value="kegiatan">Kegiatan</option>
                <option value="pengumuman">Pengumuman</option>
                <option value="sakip">SAKIP</option>
                <option value="sid">SID</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1">Judul *</label>
              <input
                type="text"
                name="title"
                defaultValue={editData?.title || ""}
                className="border w-full px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Slug *</label>
              <input
                type="text"
                name="slug"
                defaultValue={editData?.slug || ""}
                className="border w-full px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Konten *</label>
              <RichTextEditor
                initialData={content}
                onChange={(data) => setContent(data)} // langsung simpan ke state
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Gambar Utama</label>
              <input
                type="file"
                name="featured_image"
                accept="image/*"
                className="border w-full px-3 py-2 rounded"
              />
              {editData?.featured_image && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Gambar saat ini:</p>
                  <Image
                    src={editData.featured_image}
                    alt="Current featured image"
                    width={120}
                    height={80}
                    className="w-30 h-20 object-cover mt-1"
                  />
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="block mb-1">Dokumen Terkait (Path)</label>
              <input
                type="text"
                name="dokumen_terkait_path"
                defaultValue={editData?.dokumen_terkait_path || ""}
                className="border w-full px-3 py-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Waktu Kegiatan</label>
              <input
                type="datetime-local"
                name="waktu_kegiatan"
                defaultValue={
                  editData?.waktu_kegiatan
                    ? new Date(editData.waktu_kegiatan)
                        .toISOString()
                        .slice(0, 16)
                    : ""
                }
                className="border w-full px-3 py-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Lokasi Kegiatan</label>
              <input
                type="text"
                name="lokasi_kegiatan"
                defaultValue={editData?.lokasi_kegiatan || ""}
                className="border w-full px-3 py-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Status *</label>
              <select
                name="status"
                defaultValue={editData?.status || "draft"}
                className="border w-full px-3 py-2 rounded"
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1">Tanggal Publikasi</label>
              <input
                type="datetime-local"
                name="published_at"
                defaultValue={
                  editData?.published_at
                    ? new Date(editData.published_at).toISOString().slice(0, 16)
                    : ""
                }
                className="border w-full px-3 py-2 rounded"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 p-5 rounded-lg shadow-md">
        <h2 className="lg:text-2xl text-lg font-bold text-white">
          Artikel Desa
        </h2>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md shadow hover:bg-gray-100 transition"
        >
          Tambah Artikel
        </button>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Cari judul atau konten artikel..."
          className="border px-3 py-2 rounded w-full max-w-64"
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredArticles.length === 0 ? (
        <p>Belum ada data artikel</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 min-w-20">Gambar</th>
                <th className="border px-3 py-2 min-w-48">Judul</th>
                <th className="border px-3 py-2 min-w-24">Tipe</th>
                <th className="border px-3 py-2 min-w-24">Status</th>
                <th className="border px-3 py-2 min-w-32">Tanggal</th>
                <th className="border px-3 py-2 min-w-32">Lokasi</th>
                <th className="border px-3 py-2 min-w-32">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article.id}>
                  <td className="border px-3 py-2 text-center">
                    {article.featured_image ? (
                      <Image
                        src={article.featured_image}
                        width={64}
                        height={64}
                        alt={article.title}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border px-3 py-2 w-[120px]">
                    <div className="font-medium">{article.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {parse(article.content.substring(0, 100))}...
                    </div>
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        article.tipe === "berita"
                          ? "bg-blue-100 text-blue-800"
                          : article.tipe === "pengumuman"
                          ? "bg-yellow-100 text-yellow-800"
                          : article.tipe === "kegiatan"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {article.tipe}
                    </span>
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        article.status === "published"
                          ? "bg-green-100 text-green-800"
                          : article.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="border px-3 py-2 text-sm">
                    {new Date(article.published_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="border px-3 py-2 text-sm">
                    {article.lokasi_kegiatan || "-"}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <div className="flex space-x-2 justify-center">
                      <Link
                        href={`/berita/${article.id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded whitespace-nowrap"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(article)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded whitespace-nowrap"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
