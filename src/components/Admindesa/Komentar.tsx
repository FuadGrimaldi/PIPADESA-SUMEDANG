"use client";

import { useEffect, useState, useCallback } from "react";
import { Status } from "@/types/agenda";

export interface Komentar {
  id: number;
  article_id: number;
  desa_id: number;
  name: string;
  email: string;
  no_telp: string;
  pesan: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

interface Props {
  desaId: number;
}

export default function KomentarManager({ desaId }: Props) {
  const [komentars, setKomentars] = useState<Komentar[]>([]);
  const [filteredKomentars, setFilteredKomentars] = useState<Komentar[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Komentar | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // GET komentar berdasarkan desa
  const fetchKomentars = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/komentar/subdomain/${desaId}`);
      const data = await res.json();

      if (res.ok) {
        setKomentars(data);
        setFilteredKomentars(data);
      } else {
        console.error("Error fetching komentar:", data.error);
        setKomentars([]);
        setFilteredKomentars([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setKomentars([]);
      setFilteredKomentars([]);
    } finally {
      setLoading(false);
    }
  }, [desaId]);

  useEffect(() => {
    fetchKomentars();
  }, [fetchKomentars]);

  const handleOpenEdit = (komentar: Komentar) => {
    setEditData(komentar);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus komentar ini?")) return;

    try {
      const res = await fetch(`/api/komentar/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchKomentars();
        alert("Komentar berhasil dihapus!");
      } else {
        const errorData = await res.json();
        alert(
          `Gagal menghapus komentar: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Terjadi kesalahan saat menghapus komentar");
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
        // Update komentar
        res = await fetch(`/api/komentar/${editData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            desa_id: desaId,
            name,
            email,
            no_telp,
            pesan,
            status,
          }),
        });
      } else {
        // Create komentar
        res = await fetch(`/api/komentar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            desa_id: desaId,
            name,
            email,
            no_telp,
            pesan,
          }),
        });
      }

      if (res.ok) {
        setModalOpen(false);
        fetchKomentars();
        alert("Komentar berhasil disimpan!");
        form.reset();
      } else {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert(`Error: ${errorData.error || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Terjadi kesalahan saat menyimpan komentar");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      setFilteredKomentars(komentars);
    } else {
      setFilteredKomentars(
        komentars.filter(
          (k) =>
            k.pesan.toLowerCase().includes(value) ||
            k.name.toLowerCase().includes(value) ||
            k.email.toLowerCase().includes(value)
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
            {editData ? "Edit Komentar" : "Tambah Komentar"}
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
          Manajemen Komentar
        </h2>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Cari komentar..."
          className="border border-gray-300 px-3 py-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Memuat data...</span>
        </div>
      ) : filteredKomentars.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Belum ada komentar</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  Article id
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  Nama
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  Email
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  Pesan
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="border border-gray-200 px-4 py-3 text-center font-medium text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredKomentars.map((kom) => (
                <tr key={kom.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3">
                    {kom.article_id}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {kom.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {kom.email}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {kom.pesan}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {kom.status}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => handleOpenEdit(kom)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm"
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => handleDelete(kom.id)}
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
