"use client";

import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  X,
  View,
  Globe,
  Camera,
} from "lucide-react";
import Image from "next/image";

interface SdgsScore {
  id: number;
  desa_id: number;
  sdgs_id: number;
  score: number;
  tahun: number;
  profile_desa?: {
    id: number;
    nama_desa: string;
  } | null;
  sdgs?: {
    id: number;
    title: string;
    image: string;
  } | null;
}

export default function SdgsScoreManager() {
  const [sdgsScore, setSdgsScore] = useState<SdgsScore[]>([]);
  const [filteredSdgsScore, setFilteredSdgsScore] = useState<SdgsScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<SdgsScore | null>(null);
  const [viewData, setViewData] = useState<SdgsScore | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [desaList, setDesaList] = useState<any[]>([]);
  const [sdgsList, setSdgsList] = useState<any[]>([]);
  const [selectedDesa, setSelectedDesa] = useState<number | "">(
    viewData?.desa_id || editData?.desa_id || ""
  );

  // Fetch Desa
  const fetchDesaList = useCallback(async () => {
    try {
      const res = await fetch("/api/desa");
      const data = await res.json();
      setDesaList(data.data || []);
    } catch (error) {
      setDesaList([]);
      console.error("Fetch desa error:", error);
    }
  }, []);

  // Fetch SDGs
  const fetchSdgsList = useCallback(async () => {
    try {
      const res = await fetch("/api/sdgs");
      const data = await res.json();
      setSdgsList(data || []);
    } catch (error) {
      setSdgsList([]);
      console.error("Fetch sdgs error:", error);
    }
  }, []);

  // Fetch Scores
  const fetchSdgsScore = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sdgs/score");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal memuat data SDGs Score");
      }
      setSdgsScore(data || []);
      setFilteredSdgsScore(data || []);
    } catch (error) {
      console.error("Fetch sdgsScore error:", error);
      setSdgsScore([]);
      setFilteredSdgsScore([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data SDGs Score",
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSdgsScore();
    fetchDesaList();
    fetchSdgsList();
  }, [fetchSdgsScore, fetchDesaList, fetchSdgsList]);

  const handleOpenAdd = () => {
    setEditData(null);
    setViewData(null);
    setModalOpen(true);
  };

  const handleOpenView = (data: SdgsScore) => {
    setViewData(data);
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (data: SdgsScore) => {
    setEditData(data);
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
      title: "Yakin ingin menghapus score ini?",
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
      const res = await fetch(`/api/sdgs/score/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchSdgsScore();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Score berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menghapus score");
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menghapus score",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const desa_id = parseInt(formData.get("desa_id") as string, 10);
    const sdgs_id = parseInt(formData.get("sdgs_id") as string, 10);
    const score = parseInt(formData.get("score") as string, 10);
    const tahun = parseInt(formData.get("tahun") as string, 10);

    if (!desa_id || !sdgs_id || !score || !tahun) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Semua field wajib diisi",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/sdgs/score/${editData.id}`, {
          method: "PUT",
          body: JSON.stringify({
            desa_id,
            sdgs_id,
            score,
            tahun,
          }),
        });
      } else {
        res = await fetch("/api/sdgs/score", {
          method: "POST",
          body: JSON.stringify({
            desa_id,
            sdgs_id,
            score,
            tahun,
          }),
        });
      }

      if (res.ok) {
        setModalOpen(false);
        await fetchSdgsScore();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Score berhasil ${editData ? "diperbarui" : "ditambahkan"}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.error || "Terjadi kesalahan",
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
      setFilteredSdgsScore(sdgsScore);
    } else {
      setFilteredSdgsScore(
        sdgsScore.filter(
          (item) =>
            item.tahun.toString().includes(value) ||
            item.score.toString().includes(value) ||
            item.profile_desa?.nama_desa.toLowerCase().includes(value) ||
            item.sdgs?.title.toLowerCase().includes(value)
        )
      );
    }
  };

  // Modal Form Component
  const ModalForm = () => {
    const isView = !!viewData;
    const isEdit = !!editData && !viewData;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {isView ? (
                <>Detail Score</>
              ) : isEdit ? (
                <>
                  <Edit3 className="w-6 h-6" /> Edit Score
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" /> Tambah Score
                </>
              )}
            </h2>
            <button
              onClick={handleCloseModal}
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={submitting}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Desa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desa *
              </label>
              <select
                name="desa_id"
                value={selectedDesa}
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                required
                disabled={isView || submitting}
                onChange={(e) => setSelectedDesa(Number(e.target.value) || "")}
              >
                <option value="">Pilih Desa</option>
                {desaList.map((desa) => (
                  <option key={desa.id} value={desa.id}>
                    {desa.nama_desa}
                  </option>
                ))}
              </select>
            </div>

            {/* SDGs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SDGs *
              </label>
              <select
                name="sdgs_id"
                defaultValue={viewData?.sdgs_id || editData?.sdgs_id || ""}
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                required
                disabled={isView || submitting}
              >
                <option value="">Pilih SDGs</option>
                {sdgsList.map((sdgs) => (
                  <option key={sdgs.id} value={sdgs.id}>
                    {sdgs.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score *
              </label>
              <input
                type="number"
                name="score"
                defaultValue={viewData?.score || editData?.score || ""}
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                required
                disabled={isView || submitting}
                readOnly={isView}
              />
            </div>

            {/* Tahun */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tahun *
              </label>
              <input
                type="number"
                name="tahun"
                defaultValue={viewData?.tahun || editData?.tahun || ""}
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                required
                disabled={isView || submitting}
                readOnly={isView}
              />
            </div>

            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg"
                disabled={submitting}
              >
                <X className="w-4 h-4" /> Batal
              </button>
              {!isView && (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? "Menyimpan..." : "Simpan"}
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
            Manajemen Sdgs Score
          </h2>
          <p className="text-green-100 mt-1">
            Kelola data Sdgs Score desa di kabupaten
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Sdgs Score
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari nama, jabatan, atau desa..."
            value={searchTerm}
            className="w-full pl-10 bg-white text-gray-500 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
      ) : filteredSdgsScore.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Globe className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {searchTerm
              ? "Tidak ada hasil pencarian"
              : "Belum ada data Sdgs Score"}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Coba ubah kata kunci pencarian"
              : "Klik tombol 'Tambah Sdgs Score' untuk menambah data Sdgs Score"}
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
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Desa
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSdgsScore.map((sdgsScore) => (
                  <tr key={sdgsScore.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {sdgsScore.sdgs?.image ? (
                        <Image
                          src={sdgsScore.sdgs?.image}
                          width={64}
                          height={64}
                          alt={sdgsScore.sdgs?.title || "SDGs Image"}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Camera className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {sdgsScore.sdgs?.title || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {sdgsScore.score || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {sdgsScore.tahun || "-"}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {sdgsScore.profile_desa?.nama_desa || "-"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleOpenView(sdgsScore)}
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                          title="View"
                        >
                          <View className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(sdgsScore)}
                          className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(sdgsScore.id)}
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
      {/* TODO: Tambahkan ModalForm untuk kategori (mirip dengan desa tapi field disesuaikan) */}
      {modalOpen && <ModalForm />}
    </div>
  );
}
