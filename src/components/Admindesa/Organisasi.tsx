"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";

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

interface OrganisasiManagerProps {
  desaId: number;
  userId: number;
}

export default function OrganisasiManager({
  desaId,
  userId,
}: OrganisasiManagerProps) {
  const [organisasis, setOrganisasis] = useState<Organisasi[]>([]);
  const [kategoriOrganisasi, setKategoriOrganisasi] = useState<
    { id: number; nama_kategori: string }[]
  >([]);
  const [filteredOrganisasis, setFilteredOrganisasis] = useState<Organisasi[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Organisasi | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchKategoriOrganisasi = useCallback(async () => {
    try {
      const res = await fetch(`/api/organisasi/kategori/subdomain/${desaId}`);
      const data = await res.json();

      if (data.error) {
        console.error("Error fetching categories:", data.error);
        setKategoriOrganisasi([]);
      } else {
        setKategoriOrganisasi(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setKategoriOrganisasi([]);
    }
  }, [desaId]);

  const fetchOrganisasis = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/organisasi`);
      const data = await res.json();

      if (data.error) {
        console.error("Error fetching organisasi:", data.error);
        setOrganisasis([]);
        setFilteredOrganisasis([]);
      } else {
        const desaOrganisasi = data.filter(
          (org: Organisasi) => org.desa_id === desaId
        );
        setOrganisasis(desaOrganisasi);
        setFilteredOrganisasis(desaOrganisasi);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setOrganisasis([]);
      setFilteredOrganisasis([]);
    }
    setLoading(false);
  }, [desaId]);

  useEffect(() => {
    if (desaId) {
      fetchOrganisasis();
      fetchKategoriOrganisasi();
    }
  }, [desaId, fetchOrganisasis, fetchKategoriOrganisasi]);

  const handleOpenAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (org: Organisasi) => {
    setEditData(org);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Yakin hapus organisasi ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;
    // if (!confirm("Yakin hapus organisasi ini?")) return;

    try {
      const res = await fetch(`/api/organisasi/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchOrganisasis();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Organisasi berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        Swal.fire({
          position: "top",
          icon: "error",
          title: `Error: ${errorData.error || "Terjadi kesalahan"}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Terjadi kesalahan saat menghapus organisasi",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Validate required fields before submitting
    const namaOrganisasi = fd.get("nama_organisasi");
    const kategoriId = fd.get("kategori_id");
    const namaKetua = fd.get("nama_ketua");
    const deskripsiKegiatan = fd.get("deskripsi_kegiatan");

    if (!namaOrganisasi || !kategoriId || !namaKetua || !deskripsiKegiatan) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Semua field wajib diisi",
        showConfirmButton: false,
        timer: 1500,
      });

      setSubmitLoading(false);
      return;
    }

    try {
      let res;
      if (editData) {
        // For edit, include the current desa_id
        fd.set("desa_id", editData.desa_id.toString());
        res = await fetch(`/api/organisasi/${editData.id}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        // For create, set desa_id and created_by
        fd.set("desa_id", desaId.toString());
        fd.set("created_by", userId.toString());

        res = await fetch("/api/organisasi", {
          method: "POST",
          body: fd,
        });
      }

      if (res.ok) {
        setModalOpen(false);
        fetchOrganisasis();
        Swal.fire({
          position: "top",
          icon: "success",
          title: editData
            ? "Organisasi berhasil diperbarui!"
            : "Organisasi berhasil ditambahkan!",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
      } else {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        Swal.fire({
          position: "top",
          icon: "error",
          title: `Error: ${errorData.error || "Terjadi kesalahan"}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Terjadi kesalahan saat menyimpan data",

        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      setFilteredOrganisasis(organisasis);
    } else {
      setFilteredOrganisasis(
        organisasis.filter(
          (org) =>
            org.nama_organisasi.toLowerCase().includes(value) ||
            org.nama_ketua.toLowerCase().includes(value) ||
            org.deskripsi_kegiatan.toLowerCase().includes(value) ||
            org.kategori_organisasi?.nama_kategori.toLowerCase().includes(value)
        )
      );
    }
  };

  if (modalOpen) {
    return (
      <div>
        <div className="bg-white w-full p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            {editData ? "Edit Organisasi" : "Tambah Organisasi"}
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {!editData && (
              <>
                <input type="hidden" name="created_by" value={userId} />
                <input type="hidden" name="desa_id" value={desaId} />
              </>
            )}

            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">
                Nama Organisasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_organisasi"
                defaultValue={editData?.nama_organisasi || ""}
                className="border border-gray-300 w-full px-3 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Masukkan nama organisasi"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">
                Kategori Organisasi <span className="text-red-500">*</span>
              </label>
              <select
                name="kategori_id"
                defaultValue={editData?.kategori_id || ""}
                className="border border-gray-300 w-full px-3 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Pilih Kategori</option>
                {kategoriOrganisasi.map((kategori) => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.nama_kategori}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">
                Nama Ketua <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_ketua"
                defaultValue={editData?.nama_ketua || ""}
                className="border border-gray-300 w-full px-3 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Masukkan nama ketua"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">
                Deskripsi Kegiatan <span className="text-red-500">*</span>
              </label>
              <textarea
                name="deskripsi_kegiatan"
                defaultValue={editData?.deskripsi_kegiatan || ""}
                className="border border-gray-300 w-full px-3 py-2 text-gray-700 bg-white rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Masukkan deskripsi kegiatan organisasi"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">
                Logo Organisasi
              </label>
              <input
                type="file"
                name="logo_path"
                accept="image/*"
                className="border border-gray-300 w-full px-3 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Format yang didukung: JPG, PNG, GIF (maksimal 5MB)
              </p>
              {editData?.logo_path && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Logo saat ini:</p>
                  <Image
                    src={editData.logo_path}
                    alt="Logo organisasi"
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-md border"
                    unoptimized={true}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                disabled={submitLoading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 p-5 rounded-lg shadow-md">
        <h2 className="lg:text-2xl text-lg font-bold text-white">
          Organisasi Desa
        </h2>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md shadow hover:bg-gray-100 transition"
        >
          Tambah Organisasi
        </button>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Cari nama organisasi, ketua, kategori, atau deskripsi..."
          className="border border-gray-300 px-3 py-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Memuat data...</span>
        </div>
      ) : filteredOrganisasis.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Belum ada data organisasi</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-3 text-gray-700  text-left font-medium text-gray-700 min-w-20">
                  Logo
                </th>
                <th className="border border-gray-200 px-4 py-3 text-gray-700  text-left font-medium text-gray-700 min-w-48">
                  Nama Organisasi
                </th>
                <th className="border border-gray-200 px-4 py-3 text-gray-700  text-left font-medium text-gray-700 min-w-32">
                  Kategori
                </th>
                <th className="border border-gray-200 px-4 py-3 text-gray-700  text-left font-medium text-gray-700 min-w-32">
                  Ketua
                </th>
                <th className="border border-gray-200 px-4 py-3 text-gray-700  text-left font-medium text-gray-700 min-w-64">
                  Deskripsi
                </th>
                <th className="border border-gray-200 px-4 py-3 text-gray-700  text-center font-medium text-gray-700 min-w-32">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrganisasis.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 text-gray-700  text-center">
                    {org.logo_path ? (
                      <Image
                        src={org.logo_path}
                        width={64}
                        height={64}
                        alt={org.nama_organisasi}
                        className="w-16 h-16 object-cover mx-auto rounded-md border"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 mx-auto rounded-md flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Logo</span>
                      </div>
                    )}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700  font-medium">
                    {org.nama_organisasi}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700 ">
                    {org.kategori_organisasi?.nama_kategori || "-"}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700 ">
                    {org.nama_ketua}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700  text-sm">
                    <div className="max-w-xs">
                      <p className="line-clamp-3">{org.deskripsi_kegiatan}</p>
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700  text-center">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => handleOpenEdit(org)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(org.id)}
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
