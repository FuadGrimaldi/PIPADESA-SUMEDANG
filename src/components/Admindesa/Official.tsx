"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

interface OfficialManagerProps {
  desaId: number;
}

export default function OfficialManager({ desaId }: OfficialManagerProps) {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Official | null>(null);

  const fetchOfficials = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/officials/subdomain/${desaId}`);
      const data = await res.json();
      console.log("Fetched officials data:", data);

      if (data.error) {
        console.error("Error fetching officials:", data.error);
        setOfficials([]);
      } else {
        console.log("Fetched officials:", data);
        setOfficials(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setOfficials([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (desaId) {
      fetchOfficials();
    }
  }, [desaId]);

  const handleOpenAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (official: Official) => {
    setEditData(official);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus data ini?")) return;

    try {
      const res = await fetch(`/api/officials/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchOfficials();
      } else {
        alert("Gagal menghapus data");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Terjadi kesalahan saat menghapus data");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    // // Debug: log form data
    // console.log("Form data entries:");
    // for (let [key, value] of fd.entries()) {
    //   console.log(key, value);
    // }

    try {
      let res;
      if (editData) {
        res = await fetch(`/api/officials/${editData.id}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        // For new official, ensure desa_id is set
        if (!fd.get("desa_id")) {
          fd.set("desa_id", desaId.toString());
        }

        res = await fetch("/api/officials", {
          method: "POST",
          body: fd,
        });
      }

      if (res.ok) {
        setModalOpen(false);
        fetchOfficials();
        alert("Data berhasil disimpan!");
      } else {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert(`Error: ${errorData.error || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 p-5 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-white">Official Desa</h2>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md shadow hover:bg-gray-100 transition"
        >
          Tambah Official
        </button>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Cari nama official..."
          className="border px-3 py-2 rounded w-64"
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            setOfficials((prev) =>
              prev.filter((o) => o.name.toLowerCase().includes(value))
            );
            if (!value) fetchOfficials();
          }}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : officials.length === 0 ? (
        <p>Belum ada data official</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Foto</th>
              <th className="border px-3 py-2">Nama</th>
              <th className="border px-3 py-2">Jabatan</th>
              <th className="border px-3 py-2">Desa</th>
              <th className="border px-3 py-2">Urutan</th>
              <th className="border px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {officials.map((o) => (
              <tr key={o.id}>
                <td className="border px-3 py-2 text-center">
                  {o.photo ? (
                    <Image
                      src={o.photo}
                      width={64}
                      height={64}
                      alt={o.name}
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border px-3 py-2">{o.name}</td>
                <td className="border px-3 py-2">{o.position}</td>
                <td className="border px-3 py-2">
                  {o.profile_desa?.nama_desa || "-"}
                </td>
                <td className="border px-3 py-2 text-center">
                  {o.display_order}
                </td>
                <td className="border px-3 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleOpenEdit(o)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(o.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">
              {editData ? "Edit Official" : "Tambah Official"}
            </h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Hidden field for desa_id when adding new */}
              {!editData && (
                <input type="hidden" name="desa_id" value={desaId} />
              )}

              {/* Show desa_id field only when editing */}
              {editData && (
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
              )}

              <div className="mb-3">
                <label className="block mb-1">Nama *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editData?.name || ""}
                  className="border w-full px-3 py-2 rounded"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block mb-1">Jabatan *</label>
                <input
                  type="text"
                  name="position"
                  defaultValue={editData?.position || ""}
                  className="border w-full px-3 py-2 rounded"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block mb-1">Urutan *</label>
                <input
                  type="number"
                  name="display_order"
                  defaultValue={editData?.display_order || "1"}
                  className="border w-full px-3 py-2 rounded"
                  required
                  min="1"
                />
              </div>

              <div className="mb-3">
                <label className="block mb-1">Foto</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="border w-full px-3 py-2 rounded"
                />
                {editData?.photo && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Foto saat ini:</p>
                    <Image
                      src={editData.photo}
                      alt="Current photo"
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover mt-1"
                    />
                  </div>
                )}
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
      )}
    </div>
  );
}
