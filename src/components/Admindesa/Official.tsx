"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";

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

  const fetchOfficials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/officials/subdomain/${desaId}`);
      const data = await res.json();

      if (data.error) {
        console.error("Error fetching officials:", data.error);
        setOfficials([]);
      } else {
        setOfficials(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setOfficials([]);
    }
    setLoading(false);
  }, [desaId]);

  useEffect(() => {
    if (desaId) {
      fetchOfficials();
    }
  }, [desaId, fetchOfficials]);

  const handleOpenAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (official: Official) => {
    setEditData(official);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus official ini?",
      text: "Data yang sudah dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/officials/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchOfficials();
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Terjadi kesalahan saat menghapus data",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Terjadi kesalahan saat menghapus data",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

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
        Swal.fire({
          position: "top",
          icon: "success",
          title: editData
            ? "Official berhasil diperbarui!"
            : "Official berhasil ditambahkan!",
          showConfirmButton: false,
          timer: 1500,
        });
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
    }
  };
  if (modalOpen) {
    return (
      <div>
        <div className="bg-white w-full p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {editData ? "Edit Official" : "Tambah Official"}
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Hidden field for desa_id when adding new */}
            {!editData && <input type="hidden" name="desa_id" value={desaId} />}

            {/* Show desa_id field only when editing */}
            {editData && (
              <div className="mb-3">
                <label className="block mb-1 text-gray-700">Desa ID</label>
                <input
                  type="number"
                  name="desa_id"
                  defaultValue={editData.desa_id}
                  className="border w-full px-3 py-2 text-gray-700 bg-white text-gray-500 rounded bg-gray-100"
                  required
                  readOnly
                />
              </div>
            )}

            <div className="mb-3">
              <label className="block mb-1 text-gray-700">Nama *</label>
              <input
                type="text"
                name="name"
                defaultValue={editData?.name || ""}
                className="border w-full px-3 py-2 text-gray-700 bg-white text-gray-500 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-gray-700">Jabatan *</label>
              <input
                type="text"
                name="position"
                defaultValue={editData?.position || ""}
                className="border w-full px-3 py-2 text-gray-700 bg-white text-gray-500 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-gray-700">Urutan *</label>
              <input
                type="number"
                name="display_order"
                defaultValue={editData?.display_order || "1"}
                className="border w-full px-3 py-2 text-gray-700 bg-white text-gray-500 rounded"
                required
                min="1"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-gray-700">Foto</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="border w-full px-3 py-2 text-gray-700 bg-white text-gray-500 rounded"
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
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 p-5 rounded-lg shadow-md">
        <h2 className="lg:text-2xl text-lg font-bold text-white">
          Official Desa
        </h2>
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
          className="border px-3 py-2 bg-white text-gray-700 rounded w-64"
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 text-gray-700 min-w-20">
                  Foto
                </th>
                <th className="border px-3 py-2 text-gray-700 min-w-32">
                  Nama
                </th>
                <th className="border px-3 py-2 text-gray-700 min-w-32">
                  Jabatan
                </th>
                <th className="border px-3 py-2 text-gray-700 min-w-32">
                  Desa
                </th>
                <th className="border px-3 py-2 text-gray-700 min-w-20">
                  Urutan
                </th>
                <th className="border px-3 py-2 text-gray-700 min-w-32">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {officials.map((o) => (
                <tr key={o.id}>
                  <td className="border px-3 py-2 text-gray-700 text-center">
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
                  <td className="border px-3 py-2 text-gray-700">{o.name}</td>
                  <td className="border px-3 py-2 text-gray-700">
                    {o.position}
                  </td>
                  <td className="border px-3 py-2 text-gray-700">
                    {o.profile_desa?.nama_desa || "-"}
                  </td>
                  <td className="border px-3 py-2 text-gray-700 text-center">
                    {o.display_order}
                  </td>
                  <td className="border px-3 py-2 text-gray-700 text-center">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => handleOpenEdit(o)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(o.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded whitespace-nowrap"
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
