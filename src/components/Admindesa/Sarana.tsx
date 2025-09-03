"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

export type Sarana = {
  id: number;
  desa_id: number;
  kategori: string;
  nama_sarana: string;
  deskripsi: string;
  alamat_lokasi: string;
  koordinat_lat?: string;
  koordinat_long?: string;
  foto_path?: string;
  tipe: string;
  unggulan?: string;
  status: string;
};

interface SaranaManagerProps {
  desaId: number;
  tipe: "sarana" | "wisata";
}

export default function SaranaManager({ desaId, tipe }: SaranaManagerProps) {
  const [sarana, setSarana] = useState<Sarana[]>([]);
  const [filtered, setFiltered] = useState<Sarana[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Sarana | null>(null);

  const fetchSarana = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      if (tipe == "sarana") {
        res = await fetch(`/api/sarana/subdomain/${desaId}`);
        const saranaData = await res.json();
        const filteredData = Array.isArray(saranaData)
          ? saranaData.filter((item: Sarana) => item.kategori !== "wisata")
          : [];
        setSarana(filteredData);
        setFiltered(filteredData);
      } else {
        res = await fetch(`/api/sarana/subdomain/${desaId}?type=${tipe}`);
        const data = await res.json();
        const validData = Array.isArray(data) ? data : [];
        setSarana(validData);
        setFiltered(validData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setSarana([]);
      setFiltered([]);
    }
    setLoading(false);
  }, [desaId, tipe]);

  useEffect(() => {
    if (desaId) {
      fetchSarana();
    }
  }, [desaId, fetchSarana]);

  const handleOpenAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (data: Sarana) => {
    setEditData(data);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Yakin hapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/sarana/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchSarana();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Berhasil dihapus",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Gagal menghapus",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Gagal menghapus",
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
        res = await fetch(`/api/sarana/${editData.id}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        fd.set("desa_id", desaId.toString());
        fd.set("status", "approved");
        if (tipe === "sarana") fd.set("unggulan", "N");
        res = await fetch("/api/sarana", {
          method: "POST",
          body: fd,
        });
      }

      if (res.ok) {
        setModalOpen(false);
        fetchSarana();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Berhasil disimpan",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Gagal menyimpan",
          text: errorData.message || "Terjadi kesalahan",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Gagal menyimpan",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      setFiltered(sarana);
    } else {
      setFiltered(
        sarana.filter((item) => item.nama_sarana.toLowerCase().includes(value))
      );
    }
  };

  if (modalOpen) {
    return (
      <div>
        <div className="bg-white w-full p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">
            {editData ? `Edit ${tipe}` : `Tambah ${tipe}`}
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {!editData && <input type="hidden" name="desa_id" value={desaId} />}

            <div className="mb-3">
              <label className="block mb-1">Nama {tipe} *</label>
              <input
                type="text"
                name="nama_sarana"
                defaultValue={editData?.nama_sarana || ""}
                className="border w-full px-3 py-2 rounded"
                required
              />
            </div>
            {tipe == "sarana" && (
              <div className="mb-3">
                <label className="block mb-1">Kategori *</label>
                <select
                  name="kategori"
                  defaultValue={editData?.kategori || ""}
                  className="border w-full px-3 py-2 rounded"
                  required
                >
                  <option value="">-- Pilih Kategori --</option>
                  <option value="pendidikan">Pendidikan</option>
                  <option value="kesehatan">Kesehatan</option>
                  <option value="ibadah">Ibadah</option>
                  <option value="olahraga">Olahraga</option>
                  <option value="umum">Umum</option>
                </select>
              </div>
            )}
            {tipe == "wisata" && (
              <div className="mb-3">
                <label className="block mb-1">Kategori *</label>
                <input
                  type="text"
                  name="kategori"
                  defaultValue={editData?.kategori || "wisata"}
                  className="border w-full px-3 py-2 rounded"
                  readOnly
                />
              </div>
            )}

            <div className="mb-3">
              <label className="block mb-1">Deskripsi</label>
              <textarea
                name="deskripsi"
                defaultValue={editData?.deskripsi || ""}
                className="border w-full px-3 py-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Alamat Lokasi</label>
              <input
                type="text"
                name="alamat_lokasi"
                defaultValue={editData?.alamat_lokasi || ""}
                className="border w-full px-3 py-2 rounded"
              />
            </div>
            <div className="mb-3 flex space-x-4">
              <div className="flex-1">
                <label className="block mb-1">Latitude</label>
                <input
                  type="text"
                  name="koordinat_lat"
                  defaultValue={editData?.koordinat_lat || ""}
                  className="border w-full px-3 py-2 rounded"
                  placeholder="-6.123456"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1">Longitude</label>
                <input
                  type="text"
                  name="koordinat_long"
                  defaultValue={editData?.koordinat_long || ""}
                  className="border w-full px-3 py-2 rounded"
                  placeholder="106.123456"
                />
              </div>
            </div>
            {tipe == "wisata" && (
              <div className="mb-3">
                <label className="block mb-1">Unggulan</label>
                <select
                  name="unggulan"
                  defaultValue={editData?.unggulan || "N"}
                  className="border w-full px-3 py-2 rounded"
                >
                  <option value="Y">Ya</option>
                  <option value="N">Tidak</option>
                </select>
              </div>
            )}

            <div className="mb-3">
              <label className="block mb-1">Foto</label>
              <input
                type="file"
                name="foto_path"
                accept="image/*"
                className="border w-full px-3 py-2 rounded"
              />
              {editData?.foto_path && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Foto saat ini:</p>
                  <Image
                    src={editData.foto_path}
                    alt="Current foto"
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
          {tipe} Desa
        </h2>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md shadow hover:bg-gray-100 transition"
        >
          Tambah {tipe}
        </button>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder={`Cari nama ${tipe}...`}
          className="border px-3 py-2 rounded w-full max-w-64"
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>Belum ada data {tipe}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 min-w-20">Foto</th>
                <th className="border px-3 py-2 min-w-32">Nama {tipe}</th>
                <th className="border px-3 py-2 min-w-32">Kategori</th>
                <th className="border px-3 py-2 min-w-32">Deskripsi</th>
                <th className="border px-3 py-2 min-w-32">Lokasi</th>
                <th className="border px-3 py-2 min-w-32">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="border px-3 py-2 text-center">
                    {item.foto_path ? (
                      <Image
                        src={item.foto_path}
                        width={64}
                        height={64}
                        alt={item.nama_sarana}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border px-3 py-2 w-24">{item.nama_sarana}</td>
                  <td className="border px-3 py-2 w-16">{item.kategori}</td>
                  <td className="border px-3 py-2">{item.deskripsi}</td>
                  <td className="border px-3 py-2 w-16">
                    {item.alamat_lokasi}
                  </td>
                  <td className="border px-3 py-2 text-center">
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
