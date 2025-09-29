"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

export type Infografis = {
  id: number;
  desa_id: number;
  title: string;
  gambar_path: string;
};

interface InfografisManagerProps {
  desaId: number;
}

export default function InfografisManager({ desaId }: InfografisManagerProps) {
  const [infografis, setInfografis] = useState<Infografis[]>([]);
  const [filtered, setFiltered] = useState<Infografis[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Infografis | null>(null);

  const fetchInfografis = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/infografis`);
      const data = await res.json();

      if (data.error) {
        console.error("Error fetching infografis:", data.error);
        setInfografis([]);
        setFiltered([]);
      } else {
        const desaData = data.filter(
          (item: Infografis) => item.desa_id === desaId
        );
        setInfografis(desaData);
        setFiltered(desaData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setInfografis([]);
      setFiltered([]);
    }
    setLoading(false);
  }, [desaId]);

  useEffect(() => {
    if (desaId) {
      fetchInfografis();
    }
  }, [desaId, fetchInfografis]);

  const handleOpenAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (data: Infografis) => {
    setEditData(data);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus infografis ini?",
      text: "Data yang sudah dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/infografis/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchInfografis();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Infografis berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Gagal menghapus infografis",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Terjadi kesalahan saat menghapus infografis",
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
        fd.set("desa_id", desaId.toString());
        res = await fetch(`/api/infografis/${editData.id}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        if (!fd.get("desa_id")) {
          fd.set("desa_id", desaId.toString());
        }
        res = await fetch("/api/infografis", {
          method: "POST",
          body: fd,
        });
      }

      if (res.ok) {
        setModalOpen(false);
        fetchInfografis();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Infografis berhasil ${
            editData ? "diperbarui" : "ditambahkan"
          }!`,
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      setFiltered(infografis);
    } else {
      setFiltered(
        infografis.filter((item) => item.title.toLowerCase().includes(value))
      );
    }
  };

  if (modalOpen) {
    return (
      <div>
        <div className="bg-white w-full p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            {editData ? "Edit Infografis" : "Tambah Infografis"}
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {!editData && <input type="hidden" name="desa_id" value={desaId} />}

            <div className="mb-3">
              <label className="block mb-1 text-gray-700">Judul *</label>
              <input
                type="text"
                name="title"
                defaultValue={editData?.title || ""}
                className="border w-full px-3 py-2 bg-white text-gray-500 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-gray-700">Gambar</label>
              <input
                type="file"
                name="gambar_path"
                accept="image/*"
                className="border w-full px-3 py-2 bg-white text-gray-500 rounded"
              />
              {editData?.gambar_path && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Gambar saat ini:</p>
                  <Image
                    src={editData.gambar_path}
                    alt="Current gambar"
                    width={120}
                    height={80}
                    className="w-30 h-20 object-cover mt-1"
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
          Infografis Desa
        </h2>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md shadow hover:bg-gray-100 transition"
        >
          Tambah Infografis
        </button>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Cari judul infografis..."
          className="border px-3 py-2 rounded w-full max-w-64 text-gray-700 bg-white"
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>Belum ada data infografis</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 text-gray-700 min-w-20">
                  Gambar
                </th>
                <th className="border px-3 py-2 text-gray-700 min-w-48">
                  Judul
                </th>
                <th className="border px-3 py-2 text-gray-700 min-w-32">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="border px-3 py-2 text-gray-700 text-center">
                    {item.gambar_path ? (
                      <Image
                        src={item.gambar_path}
                        width={64}
                        height={64}
                        alt={item.title}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border px-3 py-2 text-gray-700">
                    {item.title}
                  </td>
                  <td className="border px-3 py-2 text-gray-700 text-center">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded whitespace-nowrap hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
