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

type Desa = {
  id: number;
  nama_desa: string;
  alamat: string;
  telepon: string;
  email: string;
  foto_depan?: string | null;
  twitter: string;
  instagram: string;
  visi: string;
  misi: string;
  tujuan: string;
  sejarah: string;
  gmaps_embed_url: string;
  lat: number | null;
  lng: number | null;
  created_at: Date;
  updated_at: Date;
  subdomain: string;
};

export default function DesaManagerKab() {
  const [desas, setDesas] = useState<Desa[]>([]);
  const [filteredDesas, setFilteredDesas] = useState<Desa[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Desa | null>(null);
  const [viewData, setviewData] = useState<Desa | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDesas = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/desa");
      const data = await res.json();

      if (data.error) {
        console.error("Error fetching desa:", data.error);
        setDesas([]);
        setFilteredDesas([]);
      } else {
        const desaList = data.data || [];
        setDesas(desaList);
        setFilteredDesas(desaList);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setDesas([]);
      setFilteredDesas([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data desa",
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDesas();
  }, [fetchDesas]);

  const handleOpenAdd = () => {
    setEditData(null);
    setviewData(null);
    setModalOpen(true);
  };

  const handleOpenView = (desa: Desa) => {
    setviewData(desa);
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (desa: Desa) => {
    setEditData(desa);
    setviewData(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setviewData(null);
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus desa ini?",
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
      const res = await fetch(`/api/desa/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        await fetchDesas();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Desa berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menghapus desa");
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menghapus desa",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validate required fields
    const requiredFields = [
      "subdomain",
      "nama_desa",
      "alamat",
      "telepon",
      "email",
      "twitter",
      "instagram",
      "visi",
      "misi",
      "tujuan",
      "sejarah",
      "gmaps_embed_url",
    ];

    for (const field of requiredFields) {
      if (!formData.get(field)) {
        Swal.fire({
          icon: "warning",
          title: "Field Kosong",
          text: `Field ${field.replace("_", " ")} harus diisi`,
        });
        setSubmitting(false);
        return;
      }
    }

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/desa/${editData.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("/api/desa", {
          method: "POST",
          body: formData,
        });
      }

      if (res.ok) {
        setModalOpen(false);
        await fetchDesas();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Desa berhasil ${editData ? "diperbarui" : "ditambahkan"}!`,
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
      setFilteredDesas(desas);
    } else {
      setFilteredDesas(
        desas.filter(
          (desa) =>
            desa.nama_desa.toLowerCase().includes(value) ||
            desa.alamat.toLowerCase().includes(value) ||
            desa.email.toLowerCase().includes(value) ||
            desa.subdomain.toLowerCase().includes(value)
        )
      );
    }
  };

  // Modal Form Component
  const ModalForm = () => {
    const isView = !!viewData; // true kalau lagi view
    const isEdit = !!editData && !viewData;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {isView ? (
                <>Detail Desa</>
              ) : isEdit ? (
                <>
                  <Edit3 className="w-6 h-6" /> Edit Desa
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" /> Tambah Desa
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
                    Subdomain *{" "}
                    <span className="text-xs text-gray-500">
                      (contoh: desa-name)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="subdomain"
                    defaultValue={
                      viewData?.subdomain || editData?.subdomain || ""
                    }
                    className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    placeholder="nama-desa"
                    disabled={isView || submitting}
                    readOnly={isView}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Desa *
                  </label>
                  <input
                    type="text"
                    name="nama_desa"
                    defaultValue={
                      viewData?.nama_desa || editData?.nama_desa || ""
                    }
                    className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                    placeholder="Nama Desa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat *
                  </label>
                  <textarea
                    name="alamat"
                    defaultValue={viewData?.alamat || editData?.alamat || ""}
                    className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                    placeholder="Alamat lengkap desa"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telepon *
                    </label>
                    <input
                      type="tel"
                      name="telepon"
                      defaultValue={
                        viewData?.telepon || editData?.telepon || ""
                      }
                      className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      disabled={isView || submitting}
                      readOnly={isView}
                      placeholder="021-1234567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={editData?.email || editData?.email || ""}
                      className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      disabled={isView || submitting}
                      readOnly={isView}
                      placeholder="desa@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter *
                    </label>
                    <input
                      type="url"
                      name="twitter"
                      defaultValue={
                        viewData?.twitter || editData?.twitter || ""
                      }
                      className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      disabled={isView || submitting}
                      readOnly={isView}
                      placeholder="https://twitter.com/username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram *
                    </label>
                    <input
                      type="url"
                      name="instagram"
                      defaultValue={
                        viewData?.instagram || editData?.instagram || ""
                      }
                      className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      disabled={isView || submitting}
                      readOnly={isView}
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foto Depan
                  </label>
                  <input
                    type="file"
                    name="foto_depan"
                    accept="image/*"
                    className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={isView || submitting}
                    readOnly={isView}
                  />
                  {viewData?.foto_depan ||
                    (editData?.foto_depan && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">
                          Foto saat ini:
                        </p>
                        <Image
                          src={viewData?.foto_depan || editData.foto_depan}
                          alt="Foto Depan"
                          width={200}
                          height={120}
                          className="rounded-lg object-cover border"
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Informasi Detail
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visi *
                  </label>
                  <textarea
                    name="visi"
                    defaultValue={viewData?.visi || editData?.visi || ""}
                    className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                    placeholder="Visi desa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Misi *
                  </label>
                  <textarea
                    name="misi"
                    defaultValue={viewData?.misi || editData?.misi || ""}
                    className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={4}
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                    placeholder="Misi desa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tujuan *
                  </label>
                  <textarea
                    name="tujuan"
                    defaultValue={viewData?.tujuan || editData?.tujuan || ""}
                    className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                    placeholder="Tujuan desa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sejarah *
                  </label>
                  <textarea
                    name="sejarah"
                    defaultValue={viewData?.sejarah || editData?.sejarah || ""}
                    className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={4}
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                    placeholder="Sejarah desa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Maps Embed URL *
                  </label>
                  <input
                    type="url"
                    name="gmaps_embed_url"
                    defaultValue={
                      editData?.gmaps_embed_url ||
                      editData?.gmaps_embed_url ||
                      ""
                    }
                    className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      name="lat"
                      defaultValue={editData?.lat || editData?.lat || ""}
                      className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      disabled={isView || submitting}
                      readOnly={isView}
                      placeholder="-6.123456"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      name="lng"
                      defaultValue={editData?.lng || editData?.lng || ""}
                      className="w-full px-4 py-2 border text-gray-500 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      disabled={isView || submitting}
                      readOnly={isView}
                      placeholder="107.123456"
                    />
                  </div>
                </div>
              </div>
            </div>

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
            Manajemen Desa
          </h2>
          <p className="text-green-100 mt-1">
            Kelola data profile desa di kabupaten
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700"
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
      ) : filteredDesas.length === 0 ? (
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
                    Foto
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Desa
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kontak
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subdomain
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDesas.map((desa) => (
                  <tr key={desa.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {desa.foto_depan ? (
                        <Image
                          src={desa.foto_depan}
                          width={64}
                          height={64}
                          alt={desa.nama_desa}
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
                        <div className="text-sm font-medium text-gray-900">
                          {desa.nama_desa}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {desa.alamat}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {desa.telepon && (
                          <div className="text-sm text-gray-600 flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            {desa.telepon}
                          </div>
                        )}
                        {desa.email && (
                          <div className="text-sm text-gray-600 flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            {desa.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {desa.subdomain}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleOpenView(desa)}
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                          title="View"
                        >
                          <View className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(desa)}
                          className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(desa.id)}
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
