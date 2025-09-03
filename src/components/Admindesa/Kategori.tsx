"use client";

import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";

interface Kategori {
  id: number;
  nama_kategori: string;
  desa_id: number;
}

interface Props {
  desaId: number; // Assuming this is passed as a prop
}

export default function KategoriManager({ desaId }: Props) {
  const [kategoris, setKategoris] = useState<Kategori[]>([]);
  const [filteredKategoris, setFilteredKategoris] = useState<Kategori[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Kategori | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // GET kategori
  const fetchKategoris = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/organisasi/kategori/subdomain/${desaId}`);
      const data = await res.json();

      if (res.ok) {
        setKategoris(data);
        setFilteredKategoris(data);
      } else {
        console.error("Error fetching kategori:", data.error);
        setKategoris([]);
        setFilteredKategoris([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setKategoris([]);
      setFilteredKategoris([]);
    } finally {
      setLoading(false);
    }
  }, [desaId]);

  useEffect(() => {
    fetchKategoris();
  }, [fetchKategoris]);

  const handleOpenAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (kategori: Kategori) => {
    setEditData(kategori);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus kategori ini?",
      text: "Data yang sudah dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/organisasi/kategori/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchKategoris();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Kategori berhasil dihapus!",
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
        title: "Terjadi kesalahan saat menghapus kategori",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const namaKategori = formData.get("nama_kategori") as string;

    // Validate required fields
    if (!namaKategori || namaKategori.trim() === "") {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Nama kategori wajib diisi",
        showConfirmButton: false,
        timer: 1500,
      });

      setSubmitLoading(false);
      return;
    }

    try {
      let res;
      if (editData) {
        // Update using FormData
        res = await fetch(`/api/organisasi/kategori/${editData.id}`, {
          method: "PUT",
          body: formData, // Use FormData instead of JSON
        });
      } else {
        // Create using FormData
        res = await fetch(`/api/organisasi/kategori`, {
          method: "POST",
          body: formData, // Use FormData instead of JSON
        });
      }

      if (res.ok) {
        setModalOpen(false);
        fetchKategoris();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Kategori berhasil ${
            editData ? "diperbarui" : "ditambahkan"
          }!`,
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
      setFilteredKategoris(kategoris);
    } else {
      setFilteredKategoris(
        kategoris.filter((kat) =>
          kat.nama_kategori.toLowerCase().includes(value)
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
            {editData ? "Edit Kategori" : "Tambah Kategori"}
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="hidden" name="desa_id" value={desaId} />
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Nama Kategori <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_kategori"
                defaultValue={editData?.nama_kategori || ""}
                className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Masukkan nama kategori"
                maxLength={100}
              />
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

  // === Main UI ===
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 p-5 rounded-lg shadow-md">
        <h2 className="lg:text-2xl text-lg font-bold text-white">
          Kategori Organisasi
        </h2>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md shadow hover:bg-gray-100 transition"
        >
          Tambah Kategori
        </button>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Cari kategori organisasi..."
          className="border border-gray-300 px-3 py-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Memuat data...</span>
        </div>
      ) : filteredKategoris.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Belum ada kategori</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700 min-w-48">
                  Nama Kategori
                </th>
                <th className="border border-gray-200 px-4 py-3 text-center font-medium text-gray-700 min-w-32">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredKategoris.map((kat, index) => (
                <tr key={kat.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">
                    {kat.nama_kategori}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => handleOpenEdit(kat)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(kat.id)}
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
