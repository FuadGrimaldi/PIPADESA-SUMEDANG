"use client";

import { useEffect, useState, useCallback } from "react";
import { Status } from "@/types/agenda";

export interface PengaduanAspirasi {
  id: number;
  desa_id: number;
  name: string;
  email: string;
  no_telp: string;
  pesan: string;
  kategori: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

interface Props {
  desaId: number;
}

export default function PengaduanAspirasiManager({ desaId }: Props) {
  const [items, setItems] = useState<PengaduanAspirasi[]>([]);
  const [filteredItems, setFilteredItems] = useState<PengaduanAspirasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<PengaduanAspirasi | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // GET data berdasarkan desa
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/pengaduan-aspirasi/subdomain/${desaId}`);
      const data = await res.json();

      if (res.ok) {
        setItems(data);
        setFilteredItems(data);
      } else {
        console.error("Error fetching data:", data.error);
        setItems([]);
        setFilteredItems([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setItems([]);
      setFilteredItems([]);
    } finally {
      setLoading(false);
    }
  }, [desaId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleOpenEdit = (item: PengaduanAspirasi) => {
    setEditData(item);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus data ini?")) return;

    try {
      const res = await fetch(`/api/pengaduan-aspirasi/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchItems();
        alert("Data berhasil dihapus!");
      } else {
        const errorData = await res.json();
        alert(`Gagal menghapus data: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Terjadi kesalahan saat menghapus data");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const no_telp = formData.get("no_telp") as string;
    const pesan = formData.get("pesan") as string;
    const kategori = formData.get("kategori") as string;
    const status = formData.get("status") as Status;

    // Validasi
    if (!name || !email || !pesan) {
      alert("Nama, email, dan pesan wajib diisi!");
      setSubmitLoading(false);
      return;
    }

    try {
      let res;
      if (editData) {
        // Update
        res = await fetch(`/api/pengaduan-aspirasi/${editData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            desa_id: desaId,
            name,
            email,
            no_telp,
            pesan,
            kategori,
            status,
          }),
        });
      } else {
        // Create
        res = await fetch(`/api/pengaduan-aspirasi`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            desa_id: desaId,
            name,
            email,
            no_telp,
            pesan,
            kategori,
          }),
        });
      }

      if (res.ok) {
        setModalOpen(false);
        fetchItems();
        alert("Data berhasil disimpan!");
        form.reset();
      } else {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert(`Error: ${errorData.error || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter(
          (i) =>
            i.pesan.toLowerCase().includes(value) ||
            i.name.toLowerCase().includes(value) ||
            i.email.toLowerCase().includes(value)
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
            {editData ? "Edit Data" : "Tambah Data"}
          </h2>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="desa_id" value={desaId} />

            <div className="mb-4">
              <label className="block mb-2 font-medium">Nama</label>
              <input
                type="text"
                name="name"
                defaultValue={editData?.name || ""}
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
                required
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={editData?.email || ""}
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
                required
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">No. Telepon</label>
              <input
                type="text"
                name="no_telp"
                defaultValue={editData?.no_telp || ""}
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Pesan</label>
              <textarea
                name="pesan"
                defaultValue={editData?.pesan || ""}
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
                required
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Kategori</label>
              <input
                type="text"
                name="kategori"
                defaultValue={editData?.kategori || ""}
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Status</label>
              <select
                name="status"
                defaultValue={editData?.status || "pending"}
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
                required
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
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
          Manajemen Pengaduan & Aspirasi
        </h2>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Cari data..."
          className="border border-gray-300 px-3 py-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-2">Memuat data...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Belum ada data</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-40 border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  Nama
                </th>
                <th className="w-52 border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  Email
                </th>
                <th className="w-64 border border-gray-200 px-4 py-3 text-left font-medium text-gray-700 truncate">
                  Pesan
                </th>
                <th className="w-32 border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  Kategori
                </th>
                <th className="w-28 border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="w-40 border border-gray-200 px-4 py-3 text-center font-medium text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 truncate">
                    {item.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 truncate">
                    {item.email}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 truncate">
                    {item.pesan}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 capitalize">
                    {item.kategori}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 capitalize">
                    {item.status}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm"
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
