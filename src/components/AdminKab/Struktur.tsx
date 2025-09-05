"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Plus,
  Edit3,
  Trash2,
  Search,
  Save,
  X,
  View,
} from "lucide-react";

type Official = {
  id: number;
  desa_id: number;
  name: string;
  position: string;
  photo?: string;
  display_order: number;
  profile_desa?: {
    nama_desa: string;
  };
};

export default function OfficialManagerKab() {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [filteredOfficials, setFilteredOfficials] = useState<Official[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Official | null>(null);
  const [viewData, setViewData] = useState<Official | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [desaList, setDesaList] = useState<any[]>([]); // List of all desa for the dropdown

  const fetchDesaList = useCallback(async () => {
    try {
      const res = await fetch("/api/desa");
      const data = await res.json();
      if (data.error) {
        console.error("Error fetching desa list:", data.error);
        setDesaList([]);
      } else {
        setDesaList(data.data || []);
      }
    } catch (error) {
      setDesaList([]);
      console.error("Fetch error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data officials",
      });
    }
  }, []);

  const fetchOfficials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/officials");
      const data = await res.json();

      if (data.error) {
        console.error("Error fetching officials:", data.error);
        setOfficials([]);
        setFilteredOfficials([]);
      } else {
        const officialList = data || [];
        setOfficials(officialList);
        setFilteredOfficials(officialList);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setOfficials([]);
      setFilteredOfficials([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data officials",
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOfficials();
    fetchDesaList();
  }, [fetchOfficials, fetchDesaList]);

  const handleOpenAdd = () => {
    setEditData(null);
    setViewData(null);
    setModalOpen(true);
  };

  const handleOpenView = (official: Official) => {
    setViewData(official);
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (official: Official) => {
    setEditData(official);
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
      title: "Yakin ingin menghapus official ini?",
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
      const res = await fetch(`/api/officials/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        await fetchOfficials();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Official berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menghapus official");
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menghapus official",
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
        res = await fetch(`/api/officials/${editData.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("/api/officials", {
          method: "POST",
          body: formData,
        });
      }

      if (res.ok) {
        setModalOpen(false);
        await fetchOfficials();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Official berhasil ${
            editData ? "diperbarui" : "ditambahkan"
          }!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
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
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setFilteredOfficials(officials);
    } else {
      setFilteredOfficials(
        officials.filter(
          (official) =>
            official.name.toLowerCase().includes(value) ||
            official.position.toLowerCase().includes(value) ||
            official.profile_desa?.nama_desa.toLowerCase().includes(value)
        )
      );
    }
  };

  // Modal Form Component for Official
  const ModalForm = () => {
    const isView = !!viewData; // true kalau lagi view
    const isEdit = !!editData && !viewData;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {isView ? (
                <>Detail Official</>
              ) : isEdit ? (
                <>
                  <Edit3 className="w-6 h-6" /> Edit Official
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" /> Tambah Official
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

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Official *
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={viewData?.name || editData?.name || ""}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                    placeholder="Nama lengkap"
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jabatan *
                  </label>
                  <input
                    type="text"
                    name="position"
                    defaultValue={
                      viewData?.position || editData?.position || ""
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                    placeholder="Contoh: Kepala Desa"
                  />
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urutan Tampil *
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={
                      viewData?.display_order || editData?.display_order || ""
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                    placeholder="1"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Detail Lainnya
                </h3>

                {/* Desa ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desa *
                  </label>
                  <select
                    name="desa_id"
                    defaultValue={viewData?.desa_id || editData?.desa_id || ""}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    disabled={isView || submitting}
                  >
                    <option value="">Pilih Desa</option>

                    {desaList?.map((desa: any) => (
                      <option key={desa.id} value={desa.id}>
                        {desa.nama_desa}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Photo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foto
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={isView || submitting}
                  />
                  {(viewData?.photo || editData?.photo) && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">
                        Foto saat ini:
                      </p>
                      <Image
                        src={
                          viewData?.photo ||
                          editData?.photo ||
                          "/assets/default/default.png"
                        }
                        alt="Foto Official"
                        width={150}
                        height={150}
                        className="rounded-lg object-cover border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
                disabled={submitting}
              >
                <X className="w-4 h-4" />
                Batal
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
                      Simpan
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
            Manajemen Officials
          </h2>
          <p className="text-green-100 mt-1">
            Kelola data pejabat desa di kabupaten
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Official
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
      ) : filteredOfficials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Globe className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {searchTerm
              ? "Tidak ada hasil pencarian"
              : "Belum ada data official"}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Coba ubah kata kunci pencarian"
              : "Klik tombol 'Tambah Official' untuk menambah data official"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Foto
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jabatan
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
                {filteredOfficials.map((official) => (
                  <tr key={official.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {official.photo ? (
                        <Image
                          src={official.photo}
                          width={64}
                          height={64}
                          alt={official.name}
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
                        {official.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {official.position}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {official.profile_desa?.nama_desa || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleOpenView(official)}
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                          title="View"
                        >
                          <View className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(official)}
                          className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(official.id)}
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
      {/* TODO: Tambahkan ModalForm untuk Official (mirip dengan desa tapi field disesuaikan) */}
      {modalOpen && <ModalForm />}
    </div>
  );
}
