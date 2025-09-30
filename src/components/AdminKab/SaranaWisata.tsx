"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  View,
  Globe,
  Search,
  Camera,
} from "lucide-react";

export type Sarana = {
  id: number;
  desa_id: number;
  kategori: string;
  nama_sarana: string;
  deskripsi: string;
  alamat_lokasi: string;
  koordinat_lat?: string;
  koordinat_long?: string;
  foto_path?: string;
  tipe: string;
  unggulan?: string;
  status: string;
  profile_desa?: {
    nama_desa: string;
  };
};

export default function SaranaWisataManager() {
  const [saranaWisata, setSaranaWisata] = useState<Sarana[]>([]);
  const [filteredSaranaWisata, setFilteredSaranaWisata] = useState<Sarana[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Sarana | null>(null);
  const [viewData, setViewData] = useState<Sarana | null>(null);
  const [desaList, setDesaList] = useState<any[]>([]);
  const [selectedDesa, setSelectedDesa] = useState<number | "">("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDesaList = useCallback(async () => {
    try {
      const res = await fetch("/api/desa");
      const data = await res.json();
      setDesaList(data.data || []);
    } catch (error) {
      setDesaList([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data desa",
      });
    }
  }, []);

  const fetchSaranaWisata = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sarana");
      const data = await res.json();
      const list = data || [];
      setSaranaWisata(list);
      setFilteredSaranaWisata(list);
    } catch (error) {
      setSaranaWisata([]);
      setFilteredSaranaWisata([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data sarana wisata",
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSaranaWisata();
    fetchDesaList();
  }, [fetchSaranaWisata, fetchDesaList]);

  const handleOpenAdd = () => {
    setEditData(null);
    setViewData(null);
    setSelectedDesa("");
    setModalOpen(true);
  };

  const handleOpenView = (data: Sarana) => {
    setViewData(data);
    setEditData(null);
    setSelectedDesa(data.desa_id);
    setModalOpen(true);
  };

  const handleOpenEdit = (data: Sarana) => {
    setEditData(data);
    setViewData(null);
    setSelectedDesa(data.desa_id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setViewData(null);
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus sarana wisata ini?",
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
      const res = await fetch(`/api/sarana/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchSaranaWisata();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Sarana wisata berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menghapus sarana wisata");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menghapus sarana wisata",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/sarana/${editData.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("/api/sarana", {
          method: "POST",
          body: formData,
        });
      }

      if (res.ok) {
        setModalOpen(false);
        await fetchSaranaWisata();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Sarana wisata berhasil ${
            editData ? "diperbarui" : "ditambahkan"
          }!`,
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
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menyimpan data",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const ModalForm = () => {
    const isView = !!viewData;
    const isEdit = !!editData && !viewData;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {isView ? (
                <>Detail Sarana Wisata</>
              ) : isEdit ? (
                <>
                  <Edit3 className="w-6 h-6" /> Edit Sarana Wisata
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" /> Tambah Sarana Wisata
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

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="p-6 space-y-6"
          >
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

            {/* Nama Sarana */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Sarana *
              </label>
              <input
                type="text"
                name="nama_sarana"
                defaultValue={
                  viewData?.nama_sarana || editData?.nama_sarana || ""
                }
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                required
                disabled={isView || submitting}
                readOnly={isView}
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                name="kategori"
                defaultValue={viewData?.kategori || editData?.kategori || ""}
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                required
                disabled={isView || submitting}
              >
                <option value="">Pilih Kategori</option>
                <option value="pendidikan">Pendidikan</option>
                <option value="kesehatan">Kesehatan</option>
                <option value="ibadah">Ibadah</option>
                <option value="olahraga">Olahraga</option>
                <option value="umum">Umum</option>
                <option value="wisata">Wisata</option>
              </select>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi *
              </label>
              <textarea
                name="deskripsi"
                defaultValue={viewData?.deskripsi || editData?.deskripsi || ""}
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                required
                disabled={isView || submitting}
                readOnly={isView}
              />
            </div>

            {/* Alamat Lokasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat Lokasi *
              </label>
              <input
                type="text"
                name="alamat_lokasi"
                defaultValue={
                  viewData?.alamat_lokasi || editData?.alamat_lokasi || ""
                }
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                required
                disabled={isView || submitting}
                readOnly={isView}
              />
            </div>

            {/* Koordinat Latitude */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Koordinat Latitude
              </label>
              <input
                type="text"
                name="koordinat_lat"
                defaultValue={
                  viewData?.koordinat_lat || editData?.koordinat_lat || ""
                }
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                disabled={isView || submitting}
                readOnly={isView}
              />
            </div>

            {/* Koordinat Longitude */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Koordinat Longitude
              </label>
              <input
                type="text"
                name="koordinat_long"
                defaultValue={
                  viewData?.koordinat_long || editData?.koordinat_long || ""
                }
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                disabled={isView || submitting}
                readOnly={isView}
              />
            </div>

            {/* Unggulan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unggulan
              </label>
              <select
                name="unggulan"
                defaultValue={viewData?.unggulan || editData?.unggulan || ""}
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                disabled={isView || submitting}
              >
                <option value="">Pilih</option>
                <option value="Y">Ya</option>
                <option value="N">Tidak</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                defaultValue={viewData?.status || editData?.status || ""}
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                required
                disabled={isView || submitting}
              >
                <option value="">Pilih Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Foto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto
              </label>
              <input
                type="file"
                name="foto_path"
                accept="image/*"
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                disabled={isView || submitting}
              />
              {(viewData?.foto_path || editData?.foto_path) && (
                <div className="mt-3">
                  <p className="text-sm mb-2">Foto saat ini:</p>
                  <Image
                    src={
                      viewData?.foto_path ||
                      editData?.foto_path ||
                      "/assets/default/default.png"
                    }
                    alt="Foto Sarana"
                    width={200}
                    height={200}
                    className="rounded-lg object-cover border"
                  />
                </div>
              )}
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
                  {submitting ? (
                    <>Menyimpan...</>
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredSaranaWisata(saranaWisata);
      return;
    }
    const lowerTerm = term.toLowerCase();
    const filtered = saranaWisata.filter(
      (sarana) =>
        sarana.nama_sarana.toLowerCase().includes(lowerTerm) ||
        sarana.alamat_lokasi.toLowerCase().includes(lowerTerm) ||
        sarana.profile_desa?.nama_desa.toLowerCase().includes(lowerTerm)
    );
    setFilteredSaranaWisata(filtered);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Manajemen Sarana dan Wisata
          </h2>
          <p className="text-green-100 mt-1">
            Kelola data Sarana dan Wisata desa di kabupaten
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Sarana dan Wisata
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
      ) : filteredSaranaWisata.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Globe className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {searchTerm
              ? "Tidak ada hasil pencarian"
              : "Belum ada data Sarana dan Wisata"}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Coba ubah kata kunci pencarian"
              : "Klik tombol 'Tambah Sarana dan Wisata' untuk menambah data Sarana dan Wisata"}
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
                    Sarana Atau Wisata
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
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
                {filteredSaranaWisata.map((saranaWisata) => (
                  <tr key={saranaWisata.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {saranaWisata.foto_path ? (
                        <Image
                          src={saranaWisata.foto_path}
                          width={64}
                          height={64}
                          alt={saranaWisata.nama_sarana}
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
                        {saranaWisata.nama_sarana}
                      </div>
                      <div className="text-sm text-gray-700">
                        {saranaWisata.deskripsi}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {saranaWisata.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {saranaWisata.status || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {saranaWisata.profile_desa?.nama_desa || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleOpenView(saranaWisata)}
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                          title="View"
                        >
                          <View className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(saranaWisata)}
                          className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(saranaWisata.id)}
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
      {/* TODO: Tambahkan ModalForm untuk organisasi (mirip dengan desa tapi field disesuaikan) */}
      {modalOpen && <ModalForm />}
    </div>
  );
}
