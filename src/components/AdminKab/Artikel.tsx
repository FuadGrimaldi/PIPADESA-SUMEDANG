"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import {
  FileText,
  Camera,
  Plus,
  Edit3,
  Trash2,
  Search,
  Eye,
  X,
  Save,
  Calendar,
  MapPin,
  User,
  Building,
  Tag,
  Upload,
  Clock,
} from "lucide-react";
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
  users?: {
    full_name: string;
  };
};

interface Props {
  userId: number;
}

export default function ArtikelManagerKab({ userId }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Article | null>(null);
  const [viewData, setViewData] = useState<Article | null>(null);
  const [desas, setDesas] = useState<{ id: number; nama_desa: string }[]>([]);
  const [users, setUsers] = useState<{ id: number; full_name: string }[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();

      if (data.error) {
        console.error("Error fetching articles:", data.error);
        setArticles([]);
        setFilteredArticles([]);
      } else {
        const articleList = data || [];
        setArticles(articleList);
        setFilteredArticles(articleList);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setArticles([]);
      setFilteredArticles([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data artikel",
      });
    }
    setLoading(false);
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/users");
      const dataUsers = await res.json();
      setUsers(dataUsers || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchDesas = useCallback(async () => {
    try {
      const res = await fetch("/api/desa");
      const dataDesas = await res.json();
      setDesas(dataDesas.data || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
    fetchUsers();
    fetchDesas();
  }, [fetchArticles, fetchUsers, fetchDesas]);

  const handleOpenAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenView = (article: Article) => {
    setViewData(article);
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (article: Article) => {
    setEditData(article);
    setViewData(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setViewData(null);
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus artikel ini?",
      text: "Data yang sudah dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchArticles();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Artikel berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menghapus artikel");
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menghapus artikel",
      });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter(
          (article) =>
            article.title.toLowerCase().includes(value) ||
            article.tipe.toLowerCase().includes(value) ||
            (article.profile_desa?.nama_desa || "")
              .toLowerCase()
              .includes(value) ||
            (article.users?.full_name || "").toLowerCase().includes(value)
        )
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    // create validation
    const requiredFields = [
      "tipe",
      "title",
      "slug",
      "content",
      "dokumen_terkait_path",
      "waktu_kegiatan",
      "lokasi_kegiatan",
      "status",
      "published_at",
    ];

    for (const field of requiredFields) {
      const value = formData.get(field);
      if (!value || (typeof value === "string" && value.trim() === "")) {
        setSubmitting(false);
        Swal.fire({
          position: "top",
          icon: "error",
          title: `Field "${field}" wajib diisi!`,
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    }

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/articles/${editData.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("/api/articles", {
          method: "POST",
          body: formData,
        });
      }

      if (res.ok) {
        setModalOpen(false);
        setSubmitting(false);
        await fetchArticles();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Artikel berhasil ${editData ? "diperbarui" : "ditambahkan"}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        setSubmitting(false);
        console.error("API Error:", errorData);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error: ${errorData.error || "Terjadi kesalahan"}`,
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menyimpan data",
      });
    }
  };

  const ModalForm = () => {
    const isView = !!viewData;
    const isEdit = !!editData && !viewData;

    return (
      <div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                {isView ? (
                  <>
                    <Eye className="w-6 h-6" />
                    Detail Artikel
                  </>
                ) : isEdit ? (
                  <>
                    <Edit3 className="w-6 h-6" />
                    Edit Artikel
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6" />
                    Tambah Artikel
                  </>
                )}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                disabled={submitting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="p-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                    Informasi Dasar
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul Artikel *
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={viewData?.title || editData?.title || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      disabled={isView || submitting}
                      readOnly={isView}
                      placeholder="Masukkan judul artikel"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      name="slug"
                      defaultValue={viewData?.slug || editData?.slug || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      disabled={isView || submitting}
                      readOnly={isView}
                      placeholder="Masukkan judul artikel"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konten Artikel *
                    </label>
                    {isView ? (
                      <div className="border rounded-lg p-3 bg-gray-50 min-h-[120px] text-gray-700">
                        {parse(viewData?.content || "")}
                      </div>
                    ) : (
                      <textarea
                        name="content"
                        defaultValue={editData?.content || ""}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[120px]"
                        required
                        disabled={submitting}
                        placeholder="Masukkan konten artikel"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipe Artikel *
                      </label>
                      <select
                        name="tipe"
                        defaultValue={viewData?.tipe || editData?.tipe || ""}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                        disabled={isView || submitting}
                      >
                        <option value="">Pilih Tipe</option>
                        <option value="berita">Berita</option>
                        <option value="pengumuman">Pengumuman</option>
                        <option value="kegiatan">Kegiatan</option>
                        <option value="artikel">Artikel</option>
                        <option value="layanan">Layanan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        name="status"
                        defaultValue={
                          viewData?.status || editData?.status || "draft"
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                        disabled={isView || submitting}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Desa ID */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User *
                      </label>
                      <select
                        name="user_id"
                        defaultValue={
                          viewData?.user_id || editData?.user_id || ""
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                        disabled={isView || submitting}
                      >
                        <option value="">Pilih Penulis</option>

                        {users?.map((user: any) => (
                          <option key={user.id} value={user.id}>
                            {user.full_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Desa ID */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Desa *
                      </label>
                      <select
                        name="desa_id"
                        defaultValue={
                          viewData?.desa_id || editData?.desa_id || ""
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                        disabled={isView || submitting}
                      >
                        <option value="">Pilih Desa</option>

                        {desas?.map((desa: any) => (
                          <option key={desa.id} value={desa.id}>
                            {desa.nama_desa}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                    Media & Detail Kegiatan
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gambar Utama
                    </label>
                    {!isView && (
                      <input
                        type="file"
                        name="featured_image"
                        accept="image/*"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        disabled={submitting}
                      />
                    )}

                    {(viewData?.featured_image || editData?.featured_image) && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">
                          {isView ? "Gambar Utama:" : "Gambar saat ini:"}
                        </p>
                        <Image
                          src={
                            viewData?.featured_image ||
                            editData?.featured_image ||
                            ""
                          }
                          alt="Featured Image"
                          width={300}
                          height={200}
                          className="rounded-lg object-cover border shadow-sm"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1">Dokumen Terkait (Path)</label>
                    <input
                      type="text"
                      name="dokumen_terkait_path"
                      defaultValue={
                        viewData?.dokumen_terkait_path ||
                        editData?.dokumen_terkait_path ||
                        ""
                      }
                      className="border w-full px-3 py-2 rounded"
                      placeholder="Masukkan path dokumen terkait"
                      disabled={isView || submitting}
                      readOnly={isView}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Waktu Kegiatan
                    </label>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      disabled={isView || submitting}
                      readOnly={isView}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lokasi Kegiatan
                    </label>
                    <input
                      type="text"
                      name="lokasi_kegiatan"
                      defaultValue={
                        viewData?.lokasi_kegiatan ||
                        editData?.lokasi_kegiatan ||
                        ""
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      disabled={isView || submitting}
                      readOnly={isView}
                      placeholder="Contoh: Balai Desa, Lapangan Desa, dll"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Publikasi
                    </label>
                    <input
                      type="datetime-local"
                      name="published_at"
                      defaultValue={
                        editData?.published_at
                          ? new Date(editData.published_at)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      disabled={isView || submitting}
                      readOnly={isView}
                    />
                  </div>

                  {/* Info card untuk view mode */}
                  {isView && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Informasi Artikel
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">ID:</span>
                          <span className="font-medium">#{viewData?.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Slug:</span>
                          <span className="font-medium text-xs">
                            {viewData?.slug}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dibuat:</span>
                          <span className="font-medium">
                            {viewData?.created_at
                              ? new Date(
                                  viewData.created_at
                                ).toLocaleDateString("id-ID")
                              : "-"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Diperbarui:</span>
                          <span className="font-medium">
                            {viewData?.updated_at
                              ? new Date(
                                  viewData.updated_at
                                ).toLocaleDateString("id-ID")
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
                  disabled={submitting}
                >
                  <X className="w-4 h-4" />
                  {isView ? "Tutup" : "Batal"}
                </button>

                {!isView && (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        {isEdit ? "Update" : "Simpan"}
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Manajemen Artikel
          </h2>
          <p className="text-green-100 mt-1">
            Kelola data artikel di kabupaten
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Artikel
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari judul artikel, tipe, penulis, atau desa..."
            value={searchTerm}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Memuat data...</span>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FileText className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {searchTerm
              ? "Tidak ada hasil pencarian"
              : "Belum ada data artikel"}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Coba ubah kata kunci pencarian"
              : "Klik tombol 'Tambah Artikel' untuk menambah data artikel"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gambar
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artikel
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Penulis & Desa
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {article.featured_image ? (
                        <Image
                          src={article.featured_image}
                          width={64}
                          height={64}
                          alt={article.title}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Camera className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 line-clamp-2">
                          {article.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                          <Tag className="w-3 h-3" />
                          {article.tipe}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {parse(article.content.slice(0, 80))}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900 flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {article.users?.full_name || "-"}
                        </div>
                        <div className="text-gray-500 flex items-center gap-1 mt-1">
                          <Building className="w-3 h-3" />
                          {article.profile_desa?.nama_desa || "-"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleOpenView(article)}
                          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(article)}
                          className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && <ModalForm />}
    </div>
  );
}
