"use client";

import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { Plus, Edit3, Trash2, X, Globe, Search, View } from "lucide-react";
import { parse } from "path";

interface PengaduanAspirasi {
  id: number;
  desa_id: number;
  name: string;
  email: string;
  no_telp: string;
  pesan: string;
  kategori: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  profile_desa?: {
    id: number;
    nama_desa: string;
  } | null;
}

export default function PengaduanAspirasiManager() {
  const [pengaduanAspirasi, setPengaduanAspirasi] = useState<
    PengaduanAspirasi[]
  >([]);
  const [filteredPengaduanAspirasi, setFilteredPengaduanAspirasi] = useState<
    PengaduanAspirasi[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<PengaduanAspirasi | null>(null);
  const [viewData, setViewData] = useState<PengaduanAspirasi | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [desaList, setDesaList] = useState<any[]>([]);

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

  const fetchPengaduanAspirasi = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pengaduan-aspirasi");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memuat data");
      setPengaduanAspirasi(data || []);
      setFilteredPengaduanAspirasi(data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setPengaduanAspirasi([]);
      setFilteredPengaduanAspirasi([]);
      Swal.fire({ icon: "error", title: "Error", text: "Gagal memuat data" });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPengaduanAspirasi();
    fetchDesaList();
  }, [fetchPengaduanAspirasi, fetchDesaList]);

  const handleOpenAdd = () => {
    setEditData(null);
    setViewData(null);
    setModalOpen(true);
  };

  const handleOpenView = (data: PengaduanAspirasi) => {
    setViewData(data);
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (data: PengaduanAspirasi) => {
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
      title: "Yakin ingin menghapus data ini?",
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
      const res = await fetch(`/api/pengaduan-aspirasi/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchPengaduanAspirasi();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menghapus data");
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menghapus",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const desa_id = parseInt(formData.get("desa_id") as string, 10);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const no_telp = formData.get("no_telp") as string;
    const pesan = formData.get("pesan") as string;
    const kategori = formData.get("kategori") as string;
    const status = formData.get("status") as string;

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/pengaduan-aspirasi/${editData.id}`, {
          method: "PUT",
          body: JSON.stringify({
            desa_id,
            name,
            email,
            no_telp,
            kategori,
            pesan,
            status,
          }),
        });
      } else {
        res = await fetch("/api/pengaduan-aspirasi", {
          method: "POST",
          body: JSON.stringify({
            desa_id,
            name,
            email,
            no_telp,
            kategori,
            pesan,
            status,
          }),
        });
      }

      if (res.ok) {
        setModalOpen(false);
        await fetchPengaduanAspirasi();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Data berhasil ${editData ? "diperbarui" : "ditambahkan"}!`,
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
      setFilteredPengaduanAspirasi(pengaduanAspirasi);
    } else {
      setFilteredPengaduanAspirasi(
        pengaduanAspirasi.filter(
          (item) =>
            item.name.toLowerCase().includes(value) ||
            item.email.toLowerCase().includes(value) ||
            item.no_telp.toLowerCase().includes(value) ||
            item.pesan.toLowerCase().includes(value) ||
            item.kategori.toLowerCase().includes(value) ||
            item.status.toLowerCase().includes(value) ||
            item.profile_desa?.nama_desa.toLowerCase().includes(value)
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
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {isView ? (
                "Detail Pengaduan / Aspirasi"
              ) : isEdit ? (
                <>
                  <Edit3 className="w-6 h-6" /> Edit Data
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" /> Tambah Data
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
            <div>
              <label className="block text-sm mb-2 text-gray-700">Desa *</label>
              <select
                name="desa_id"
                defaultValue={viewData?.desa_id || editData?.desa_id || ""}
                className="w-full px-4 py-2 bg-white border text-gray-500 rounded-lg"
                required
                disabled={isView || submitting}
              >
                <option value="">Pilih Desa</option>
                {desaList.map((desa) => (
                  <option key={desa.id} value={desa.id}>
                    {desa.nama_desa}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Nama *</label>
              <input
                type="text"
                name="name"
                defaultValue={viewData?.name || editData?.name || ""}
                className="w-full px-4 py-2 bg-white border text-gray-500 rounded-lg"
                required
                disabled={isView || submitting}
                readOnly={isView}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                defaultValue={viewData?.email || editData?.email || ""}
                className="w-full px-4 py-2 bg-white border text-gray-500 rounded-lg"
                required
                disabled={isView || submitting}
                readOnly={isView}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                No. Telepon *
              </label>
              <input
                type="text"
                name="no_telp"
                defaultValue={viewData?.no_telp || editData?.no_telp || ""}
                className="w-full px-4 py-2 bg-white border text-gray-500 rounded-lg"
                required
                disabled={isView || submitting}
                readOnly={isView}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Pesan *
              </label>
              <textarea
                name="pesan"
                defaultValue={viewData?.pesan || editData?.pesan || ""}
                className="w-full px-4 py-2 bg-white border text-gray-500 rounded-lg"
                rows={4}
                required
                disabled={isView || submitting}
                readOnly={isView}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Kategori *
              </label>
              <select
                name="kategori"
                defaultValue={viewData?.kategori || editData?.kategori || ""}
                className="w-full px-4 py-2 bg-white border text-gray-500 rounded-lg"
                required
                disabled={isView || submitting}
              >
                <option value="">Pilih Kategori</option>
                <option value="pengaduan">Pengaduan</option>
                <option value="aspirasi">Aspirasi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Status *
              </label>
              <select
                name="status"
                defaultValue={viewData?.status || editData?.status || ""}
                className="w-full px-4 py-2 bg-white border text-gray-500 rounded-lg"
                required
                disabled={isView || submitting}
              >
                <option value="">Pilih Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
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
            Manajemen Pengaduan / Aspirasi
          </h2>
          <p className="text-green-100 mt-1">
            Kelola data Pengaduan / Aspirasi desa di kabupaten
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Pengaduan / Aspirasi
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
            className="w-full pl-10 pr-4 py-2 bg-white text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
      ) : filteredPengaduanAspirasi.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Globe className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {searchTerm
              ? "Tidak ada hasil pencarian"
              : "Belum ada data Pengaduan / Aspirasi"}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Coba ubah kata kunci pencarian"
              : "Klik tombol 'Tambah Pengaduan / Aspirasi' untuk menambah data Pengaduan / Aspirasi"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pengirim
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pesan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Desa
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
                {filteredPengaduanAspirasi.map((PengaduanAspirasi) => (
                  <tr key={PengaduanAspirasi.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {PengaduanAspirasi.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {PengaduanAspirasi.email}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center text-xs font-medium  text-green-800">
                        {PengaduanAspirasi.pesan.slice(0, 20) +
                          (PengaduanAspirasi.pesan.length > 20 ? "..." : "")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center text-xs font-medium  text-green-800">
                        {PengaduanAspirasi.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {PengaduanAspirasi.profile_desa?.nama_desa || "-"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {PengaduanAspirasi.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleOpenView(PengaduanAspirasi)}
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                          title="View"
                        >
                          <View className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(PengaduanAspirasi)}
                          className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(PengaduanAspirasi.id)}
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
