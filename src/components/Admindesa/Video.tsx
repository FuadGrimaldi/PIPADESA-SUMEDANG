"use client";

import { useEffect, useState, useCallback } from "react";
import { Video, VideoCreate, VideoUpdate } from "@/types/video";

interface Props {
  desaId: number;
}

export default function VideoManager({ desaId }: Props) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Video | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // GET video berdasarkan desa
  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/videos/subdomain/${desaId}`);
      const data = await res.json();

      if (res.ok) {
        setVideos(data);
        setFilteredVideos(data);
      } else {
        console.error("Error fetching videos:", data.error);
        setVideos([]);
        setFilteredVideos([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setVideos([]);
      setFilteredVideos([]);
    } finally {
      setLoading(false);
    }
  }, [desaId]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleOpenEdit = (video: Video) => {
    setEditData(video);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus video ini?")) return;

    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchVideos();
        alert("Video berhasil dihapus!");
      } else {
        const errorData = await res.json();
        alert(`Gagal menghapus video: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Terjadi kesalahan saat menghapus video");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const embed_url = formData.get("embed_url") as string;
    const categori = formData.get("categori") as string;
    const uploaded_at = formData.get("uploaded_at")
      ? new Date(formData.get("uploaded_at") as string)
      : undefined;

    if (!title || !embed_url) {
      alert("Judul dan URL embed wajib diisi!");
      setSubmitLoading(false);
      return;
    }

    try {
      let res;
      if (editData) {
        // Update video
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
            updated_at: new Date(),
          }),
        });
      } else {
        // Create video
        const payload: VideoCreate = {
          desa_id: desaId,
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
        fetchVideos();
        alert("Video berhasil disimpan!");
        form.reset();
      } else {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert(`Error: ${errorData.error || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Terjadi kesalahan saat menyimpan video");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(
        videos.filter(
          (v) =>
            v.title.toLowerCase().includes(value) ||
            v.deskripsi.toLowerCase().includes(value) ||
            v.categori.toLowerCase().includes(value)
        )
      );
    }
  };

  // === Modal Form ===
  if (modalOpen) {
    return (
      <div>
        <div className="bg-white w-full p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">
            {editData ? "Edit Video" : "Tambah Video"}
          </h2>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="desa_id" value={desaId} />

            <div className="mb-4">
              <label className="block mb-2 font-medium">Judul</label>
              <input
                type="text"
                name="title"
                defaultValue={editData?.title || ""}
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Deskripsi</label>
              <textarea
                name="deskripsi"
                defaultValue={editData?.deskripsi || ""}
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Embed URL</label>
              <input
                type="text"
                name="embed_url"
                defaultValue={editData?.embed_url || ""}
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Kategori</label>
              <select
                name="categori"
                defaultValue={editData?.categori || ""}
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
                required
              >
                <option value="" disabled>
                  Pilih kategori
                </option>

                <option value="pariwisata">Pariwisata</option>
                <option value="edukasi">Edukasi</option>
                <option value="kegiatan">Kegiatan</option>
                <option value="pemerintahan">Pemerintahan</option>
                <option value="pembangunan">Pembangunan</option>
                <option value="kemasyarakatan">Kemasyarakatan</option>
                <option value="animasi">Animasi</option>

                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Tanggal Upload</label>
              <input
                type="datetime-local"
                name="uploaded_at"
                defaultValue={
                  editData?.uploaded_at
                    ? new Date(editData.uploaded_at).toISOString().slice(0, 16)
                    : ""
                }
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                disabled={submitLoading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-400"
                disabled={submitLoading}
              >
                {submitLoading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // === Main UI ===
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 p-5 rounded-lg shadow-md">
        <h2 className="lg:text-2xl text-lg font-bold text-white">
          Manajemen Video
        </h2>
        <button
          onClick={() => {
            setEditData(null);
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-white text-blue-600 rounded-md"
        >
          Tambah Video
        </button>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Cari video..."
          className="border border-gray-300 px-3 py-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Memuat data...</span>
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Belum ada video</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-40 border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  Judul
                </th>
                <th className="w-52 border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  Deskripsi
                </th>
                <th className="w-40 border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  Kategori
                </th>
                <th className="w-40 border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  URL
                </th>
                <th className="w-40 border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  Upload
                </th>
                <th className="w-40 border border-gray-200 px-4 py-3 text-center font-medium text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredVideos.map((video) => (
                <tr key={video.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3">
                    {video.title}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {video.deskripsi}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {video.categori}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {video.embed_url}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {new Date(video.uploaded_at).toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => handleOpenEdit(video)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
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
