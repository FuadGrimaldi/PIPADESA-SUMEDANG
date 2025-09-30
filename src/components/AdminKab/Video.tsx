"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  Save,
  X,
  View,
  Globe,
  Building,
} from "lucide-react";
import { VideoCreate, VideoUpdate } from "@/types/video";

type Video = {
  id: number;
  desa_id: number;
  title: string;
  deskripsi: string;
  embed_url: string;
  categori: string;
  uploaded_at: Date;
  created_at: Date;
  updated_at: Date;
  profile_desa?: {
    id: number;
    nama_desa: string;
  };
};

export default function VideoManager() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Video | null>(null);
  const [viewData, setViewData] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [desaList, setDesaList] = useState<any[]>([]);

  const fetchDesaList = useCallback(async () => {
    try {
      const res = await fetch("/api/desa");
      const data = await res.json();
      setDesaList(data.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data desa",
      });
    }
  }, []);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/videos");
      const data = await res.json();
      const videoList = data || [];
      setVideos(videoList);
      setFilteredVideos(videoList);
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data video",
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVideos();
    fetchDesaList();
  }, [fetchVideos, fetchDesaList]);

  const handleOpenAdd = () => {
    setEditData(null);
    setViewData(null);
    setModalOpen(true);
  };

  const handleOpenView = (video: Video) => {
    setViewData(video);
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (video: Video) => {
    setEditData(video);
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
      title: "Yakin ingin menghapus video ini?",
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
      const res = await fetch(`/api/videos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchVideos();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Video berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("Gagal menghapus video");
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menghapus video",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const desa_id = parseInt(formData.get("desa_id") as string, 10);
    const title = formData.get("title") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const embed_url = formData.get("embed_url") as string;
    const categori = formData.get("categori") as string;
    const uploaded_at = formData.get("uploaded_at")
      ? new Date(formData.get("uploaded_at") as string)
      : undefined;

    if (!title || !embed_url) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Judul dan Embed URL wajib diisi",
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    }

    try {
      let res;
      if (editData) {
        const payload: VideoUpdate = {
          title,
          deskripsi,
          embed_url,
          categori,
          uploaded_at,
        };
        res = await fetch(`/api/videos/${editData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            desa_id,
            updated_at: new Date(),
          }),
        });
      } else {
        // Create video
        const payload: VideoCreate = {
          desa_id,
          title,
          deskripsi,
          embed_url,
          categori,
          uploaded_at,
        };
        res = await fetch(`/api/videos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            created_at: new Date(),
            updated_at: new Date(),
          }),
        });
      }

      if (res.ok) {
        setModalOpen(false);
        await fetchVideos();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Video berhasil ${editData ? "diperbarui" : "ditambahkan"}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
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
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(
        videos.filter(
          (video) =>
            video.title.toLowerCase().includes(value) ||
            video.deskripsi.toLowerCase().includes(value) ||
            video.categori.toLowerCase().includes(value)
        )
      );
    }
  };

  // Modal Form
  const ModalForm = () => {
    const isView = !!viewData;
    const isEdit = !!editData && !viewData;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {isView ? (
                <>Detail Video</>
              ) : isEdit ? (
                <>
                  <Edit3 className="w-6 h-6" /> Edit Video
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" /> Tambah Video
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Video *
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={viewData?.title || editData?.title || ""}
                  required
                  disabled={isView || submitting}
                  className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                  placeholder="Judul video"
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori *
                </label>
                <input
                  type="text"
                  name="categori"
                  defaultValue={viewData?.categori || editData?.categori || ""}
                  required
                  disabled={isView || submitting}
                  className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                  placeholder="Kategori"
                />
              </div>

              {/* Deskripsi */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  defaultValue={
                    viewData?.deskripsi || editData?.deskripsi || ""
                  }
                  disabled={isView || submitting}
                  className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                  placeholder="Deskripsi video"
                  rows={4}
                ></textarea>
              </div>

              {/* Embed URL */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Embed URL *
                </label>
                <input
                  type="url"
                  name="embed_url"
                  defaultValue={
                    viewData?.embed_url || editData?.embed_url || ""
                  }
                  required
                  disabled={isView || submitting}
                  className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                  placeholder="https://youtube.com/embed/xxxx"
                />
              </div>

              {/* Desa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desa *
                </label>
                <select
                  name="desa_id"
                  defaultValue={viewData?.desa_id || editData?.desa_id || ""}
                  required
                  disabled={isView || submitting}
                  className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                >
                  <option value="">Pilih Desa</option>
                  {desaList?.map((desa) => (
                    <option key={desa.id} value={desa.id}>
                      {desa.nama_desa}
                    </option>
                  ))}
                </select>
              </div>

              {/* Uploaded At */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Upload *
                </label>
                <input
                  type="date"
                  name="uploaded_at"
                  defaultValue={
                    viewData?.uploaded_at
                      ? new Date(viewData.uploaded_at)
                          .toISOString()
                          .split("T")[0]
                      : editData?.uploaded_at
                      ? new Date(editData.uploaded_at)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  required
                  disabled={isView || submitting}
                  className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                disabled={submitting}
              >
                <X className="w-4 h-4" />
                Batal
              </button>
              {!isView && (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? (
                    "Menyimpan..."
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Simpan
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
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
            <Globe className="w-6 h-6" />
            Manajemen Video
          </h2>
          <p className="text-green-100 mt-1">
            Kelola data video desa di kabupaten
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Desa
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari nama desa, alamat, email, atau subdomain..."
            value={searchTerm}
            className="w-full bg-white text-gray-500 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
      ) : filteredVideos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Globe className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {searchTerm ? "Tidak ada hasil pencarian" : "Belum ada data desa"}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Coba ubah kata kunci pencarian"
              : "Klik tombol 'Tambah Desa' untuk menambah data desa"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    judul
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Desa
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    kategori
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {videos.map((video) => (
                  <tr key={video.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {video.title}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          {video.deskripsi}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600 flex items-center">
                          <Building className="w-4 h-4 mr-2" />
                          {video.profile_desa?.nama_desa || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {video.categori}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleOpenView(video)}
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                          title="View"
                        >
                          <View className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(video)}
                          className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(video.id)}
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
