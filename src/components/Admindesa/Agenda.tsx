"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

type Agenda = {
  id: number;
  desa_id: number;
  judul: string;
  slug: string;
  kategori: string;
  deskripsi: string;
  lokasi: string;
  waktu: string;
  poster?: string;
  created_by: number;
  status: string;
  created_at: string;
  updated_at: string;
  profile_desa?: {
    nama_desa: string;
  };
  user?: {
    name: string;
  };
};

interface AgendaManagerProps {
  desaId: number;
  userId: number;
}

export default function AgendaManager({ desaId, userId }: AgendaManagerProps) {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [filteredAgendas, setFilteredAgendas] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Agenda | null>(null);

  const fetchAgendas = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/agenda`);
      const data = await res.json();
      console.log("Fetched agendas data:", data);

      if (data.error) {
        console.error("Error fetching agendas:", data.error);
        setAgendas([]);
        setFilteredAgendas([]);
      } else {
        console.log("Fetched agendas:", data);
        // Filter agendas by desaId if needed
        const desaAgendas = data.filter(
          (agenda: Agenda) => agenda.desa_id === desaId
        );
        setAgendas(desaAgendas);
        setFilteredAgendas(desaAgendas);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setAgendas([]);
      setFilteredAgendas([]);
    }
    setLoading(false);
  }, [desaId]);

  useEffect(() => {
    if (desaId) {
      fetchAgendas();
    }
  }, [desaId, fetchAgendas]);

  const handleOpenAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (agenda: Agenda) => {
    setEditData(agenda);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus agenda ini?")) return;

    try {
      const res = await fetch(`/api/agenda/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchAgendas();
        alert("Agenda berhasil dihapus!");
      } else {
        alert("Gagal menghapus agenda");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Terjadi kesalahan saat menghapus agenda");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/agenda/${editData.id}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        // For new agenda, ensure desa_id and created_by are set
        if (!fd.get("desa_id")) {
          fd.set("desa_id", desaId.toString());
        }
        if (!fd.get("created_by")) {
          fd.set("created_by", userId.toString());
        }

        res = await fetch("/api/agenda", {
          method: "POST",
          body: fd,
        });
      }

      if (res.ok) {
        setModalOpen(false);
        fetchAgendas();
        alert("Agenda berhasil disimpan!");
      } else {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert(`Error: ${errorData.error || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Terjadi kesalahan saat menyimpan agenda");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      setFilteredAgendas(agendas);
    } else {
      setFilteredAgendas(
        agendas.filter(
          (agenda) =>
            agenda.judul.toLowerCase().includes(value) ||
            agenda.deskripsi.toLowerCase().includes(value) ||
            agenda.lokasi.toLowerCase().includes(value)
        )
      );
    }
  };

  if (modalOpen) {
    return (
      <div>
        <div className="bg-white w-full p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">
            {editData ? "Edit Agenda" : "Tambah Agenda"}
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Hidden fields for created_by and desa_id when adding new */}
            {!editData && (
              <>
                <input type="hidden" name="created_by" value={userId} />
                <input type="hidden" name="desa_id" value={desaId} />
              </>
            )}

            {/* Show created_by and desa_id fields only when editing */}
            {editData && (
              <>
                <div className="mb-3">
                  <label className="block mb-1">Created By (User ID)</label>
                  <input
                    type="number"
                    name="created_by"
                    defaultValue={editData.created_by}
                    className="border w-full px-3 py-2 rounded bg-gray-100"
                    required
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Desa ID</label>
                  <input
                    type="number"
                    name="desa_id"
                    defaultValue={editData.desa_id}
                    className="border w-full px-3 py-2 rounded bg-gray-100"
                    required
                    readOnly
                  />
                </div>
              </>
            )}

            <div className="mb-3">
              <label className="block mb-1">Kategori Agenda *</label>
              <select
                name="kategori"
                defaultValue={editData?.kategori || ""}
                className="border w-full px-3 py-2 rounded"
                required
              >
                <option value="">Pilih Kategori</option>
                <option value="Kebudayaan">Kebudayaan</option>
                <option value="Olahraga">Olahraga</option>
                <option value="Umum">Umum</option>
                <option value="Peringatan_Hari_Besar">
                  Peringatan Hari Besar
                </option>
                <option value="Sepedahan">Sepedahan</option>
                <option value="Olahraga_Asik">Olahraga Asik</option>
                <option value="PKK">PKK</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1">Judul *</label>
              <input
                type="text"
                name="judul"
                defaultValue={editData?.judul || ""}
                className="border w-full px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Slug *</label>
              <input
                type="text"
                name="slug"
                defaultValue={editData?.slug || ""}
                className="border w-full px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Deskripsi *</label>
              <textarea
                name="deskripsi"
                defaultValue={editData?.deskripsi || ""}
                className="border w-full px-3 py-2 rounded h-32"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Lokasi *</label>
              <input
                type="text"
                name="lokasi"
                defaultValue={editData?.lokasi || ""}
                className="border w-full px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Waktu Agenda *</label>
              <input
                type="datetime-local"
                name="waktu"
                defaultValue={
                  editData?.waktu
                    ? new Date(editData.waktu).toISOString().slice(0, 16)
                    : ""
                }
                className="border w-full px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Poster</label>
              <input
                type="file"
                name="poster"
                accept="image/*"
                className="border w-full px-3 py-2 rounded"
              />
              {editData?.poster && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Poster saat ini:</p>
                  <Image
                    src={editData.poster}
                    alt="Current poster"
                    width={120}
                    height={80}
                    className="w-30 h-20 object-cover mt-1"
                  />
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="block mb-1">Status *</label>
              <select
                name="status"
                defaultValue={editData?.status || "Pending"}
                className="border w-full px-3 py-2 rounded"
                required
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simpan
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
          Agenda Desa
        </h2>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md shadow hover:bg-gray-100 transition"
        >
          Tambah Agenda
        </button>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Cari judul, deskripsi, atau lokasi agenda..."
          className="border px-3 py-2 rounded w-full max-w-64"
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredAgendas.length === 0 ? (
        <p>Belum ada data agenda</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 min-w-20">Poster</th>
                <th className="border px-3 py-2 min-w-48">Judul</th>
                <th className="border px-3 py-2 min-w-24">Kategori</th>
                <th className="border px-3 py-2 min-w-32">Waktu</th>
                <th className="border px-3 py-2 min-w-32">Lokasi</th>
                <th className="border px-3 py-2 min-w-24">Status</th>
                <th className="border px-3 py-2 min-w-32">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgendas.map((agenda) => (
                <tr key={agenda.id}>
                  <td className="border px-3 py-2 text-center">
                    {agenda.poster ? (
                      <Image
                        src={agenda.poster}
                        width={64}
                        height={64}
                        alt={agenda.judul}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border px-3 py-2 w-[120px]">
                    <div className="font-medium">{agenda.judul}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {agenda.deskripsi.substring(0, 100)}...
                    </div>
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        agenda.kategori === "Kebudayaan"
                          ? "bg-pink-100 text-pink-800"
                          : agenda.kategori === "Olahraga"
                          ? "bg-orange-100 text-orange-800"
                          : agenda.kategori === "Umum"
                          ? "bg-gray-200 text-gray-900"
                          : agenda.kategori === "Peringatan_Hari_Besar"
                          ? "bg-red-100 text-red-800"
                          : agenda.kategori === "Sepedahan"
                          ? "bg-teal-100 text-teal-800"
                          : agenda.kategori === "Olahraga_Asik"
                          ? "bg-lime-100 text-lime-800"
                          : agenda.kategori === "PKK"
                          ? "bg-fuchsia-100 text-fuchsia-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {agenda.kategori}
                    </span>
                  </td>
                  <td className="border px-3 py-2 text-sm">
                    {new Date(agenda.waktu).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="border px-3 py-2 text-sm">{agenda.lokasi}</td>
                  <td className="border px-3 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        agenda.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : agenda.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : agenda.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {agenda.status}
                    </span>
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => handleOpenEdit(agenda)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded whitespace-nowrap hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(agenda.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded whitespace-nowrap hover:bg-red-700"
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
