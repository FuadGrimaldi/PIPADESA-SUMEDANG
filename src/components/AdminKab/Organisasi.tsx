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
  Search,
  Globe,
  Camera,
} from "lucide-react";

type Organisasi = {
  id: number;
  desa_id: number;
  kategori_id: number;
  nama_organisasi: string;
  nama_ketua: string;
  deskripsi_kegiatan: string;
  logo_path?: string | null;
  created_at: string;
  updated_at: string;
  profile_desa?: {
    nama_desa: string;
  };
  kategori_organisasi?: {
    id: number;
    nama_kategori: string;
  };
};

export default function OrganisasiManager() {
  const [organisasi, setOrganisasi] = useState<Organisasi[]>([]);
  const [filteredOrganisasi, setFilteredOrganisasi] = useState<Organisasi[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Organisasi | null>(null);
  const [viewData, setViewData] = useState<Organisasi | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [desaList, setDesaList] = useState<any[]>([]);
  const [kategoriList, setKategoriList] = useState<any[]>([]);
  // Tambahkan state baru untuk desa yang dipilih
  const [selectedDesa, setSelectedDesa] = useState<number | "">(
    viewData?.desa_id || editData?.desa_id || ""
  );

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

  const fetchKategoriList = useCallback(async () => {
    try {
      const res = await fetch("/api/organisasi/kategori");
      const data = await res.json();

      setKategoriList(data || []);
    } catch (error) {
      setKategoriList([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data kategori",
      });
    }
  }, []);

  const fetchOrganisasi = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/organisasi");
      const data = await res.json();
      const list = data || [];
      setOrganisasi(list);
      setFilteredOrganisasi(list);
    } catch (error) {
      setOrganisasi([]);
      setFilteredOrganisasi([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data organisasi",
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrganisasi();
    fetchDesaList();
    fetchKategoriList();
  }, [fetchOrganisasi, fetchDesaList, fetchKategoriList]);

  const handleOpenAdd = () => {
    setEditData(null);
    setViewData(null);
    setModalOpen(true);
  };

  const handleOpenView = (data: Organisasi) => {
    setViewData(data);
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (data: Organisasi) => {
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
      title: "Yakin ingin menghapus organisasi ini?",
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
      const res = await fetch(`/api/organisasi/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchOrganisasi();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Organisasi berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menghapus organisasi");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menghapus organisasi",
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
        res = await fetch(`/api/organisasi/${editData.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("/api/organisasi", {
          method: "POST",
          body: formData,
        });
      }

      if (res.ok) {
        setModalOpen(false);
        await fetchOrganisasi();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Organisasi berhasil ${
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value) {
      setFilteredOrganisasi(organisasi);
    } else {
      setFilteredOrganisasi(
        organisasi.filter(
          (item) =>
            item.nama_organisasi.toLowerCase().includes(value) ||
            item.nama_ketua.toLowerCase().includes(value) ||
            item.profile_desa?.nama_desa.toLowerCase().includes(value) ||
            item.kategori_organisasi?.nama_kategori
              .toLowerCase()
              .includes(value)
        )
      );
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
                <>Detail Organisasi</>
              ) : isEdit ? (
                <>
                  <Edit3 className="w-6 h-6" /> Edit Organisasi
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" /> Tambah Organisasi
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

            {/* Nama Organisasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Organisasi *
              </label>
              <input
                type="text"
                name="nama_organisasi"
                defaultValue={
                  viewData?.nama_organisasi || editData?.nama_organisasi || ""
                }
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                required
                disabled={isView || submitting}
                readOnly={isView}
              />
            </div>

            {/* Nama Ketua */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Ketua *
              </label>
              <input
                type="text"
                name="nama_ketua"
                defaultValue={
                  viewData?.nama_ketua || editData?.nama_ketua || ""
                }
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                required
                disabled={isView || submitting}
                readOnly={isView}
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Kegiatan *
              </label>
              <textarea
                name="deskripsi_kegiatan"
                defaultValue={
                  viewData?.deskripsi_kegiatan ||
                  editData?.deskripsi_kegiatan ||
                  ""
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
                name="kategori_id"
                defaultValue={
                  viewData?.kategori_id || editData?.kategori_id || ""
                }
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                required
                disabled={isView || submitting}
              >
                <option value="">Pilih Kategori</option>
                {kategoriList
                  .filter(
                    (kat) => selectedDesa === "" || kat.desa_id === selectedDesa
                  )
                  .map((kat) => (
                    <option key={kat.id} value={kat.id}>
                      {kat.nama_kategori}
                    </option>
                  ))}
              </select>
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo
              </label>
              <input
                type="file"
                name="logo_path"
                accept="image/*"
                className="w-full px-4 py-2 text-gray-500 bg-white border rounded-lg"
                disabled={isView || submitting}
              />
              {(viewData?.logo_path || editData?.logo_path) && (
                <div className="mt-3">
                  <p className="text-sm mb-2">Logo saat ini:</p>
                  <Image
                    src={
                      viewData?.logo_path ||
                      editData?.logo_path ||
                      "/assets/default/default.png"
                    }
                    alt="Logo Organisasi"
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

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-xl shadow-lg">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Globe className="w-6 h-6" />
              Manajemen Organisasi
            </h2>
            <p className="text-green-100 mt-1">
              Kelola data Organisasi desa di kabupaten
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Tambah Organisasi
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
        ) : filteredOrganisasi.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Globe className="mx-auto w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {searchTerm
                ? "Tidak ada hasil pencarian"
                : "Belum ada data Organisasi"}
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Coba ubah kata kunci pencarian"
                : "Klik tombol 'Tambah Organisasi' untuk menambah data Organisasi"}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Logo
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organisasi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kategori
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
                  {filteredOrganisasi.map((organisasi) => (
                    <tr key={organisasi.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {organisasi.logo_path ? (
                          <Image
                            src={organisasi.logo_path}
                            width={64}
                            height={64}
                            alt={organisasi.nama_organisasi}
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
                          {organisasi.nama_organisasi}
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {organisasi.nama_ketua}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          {organisasi.deskripsi_kegiatan}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {organisasi.kategori_organisasi?.nama_kategori || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {organisasi.profile_desa?.nama_desa || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleOpenView(organisasi)}
                            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                            title="View"
                          >
                            <View className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(organisasi)}
                            className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(organisasi.id)}
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
    </>
  );
}
