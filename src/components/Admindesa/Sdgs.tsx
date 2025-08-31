"use client";

import { useEffect, useState, useCallback } from "react";

export interface SdgsScore {
  id: number;
  desa_id: number;
  sdgs_id: number;
  score: number;
  tahun: number;
  profile_desa?: {
    id: number;
    nama_desa: string;
  } | null;
  sdgs?: {
    id: number;
    title: string;
    image: string;
  } | null;
}

interface Props {
  desaId: number;
}

export default function SdgsScoreManager({ desaId }: Props) {
  const [scores, setScores] = useState<SdgsScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<SdgsScore | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [sdgsList, setSdgsList] = useState<{ id: number; title: string }[]>([]);

  // Fetch data score SDGS by desa
  const fetchScores = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/sdgs/score/subdomain/${desaId}`);
      const data = await res.json();

      if (res.ok) {
        setScores(data);
      } else {
        console.error("Error fetching scores:", data.error);
        setScores([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setScores([]);
    } finally {
      setLoading(false);
    }
  }, [desaId]);
  // Fetch data SDGS list
  const fetchSdgsList = useCallback(async () => {
    try {
      const res = await fetch(`/api/sdgs`);
      const data = await res.json();
      if (res.ok) {
        setSdgsList(data);
      }
    } catch (error) {
      console.error("Fetch SDGS list error:", error);
      setSdgsList([]);
    }
  }, []);

  useEffect(() => {
    fetchScores();
    fetchSdgsList();
  }, [fetchScores, fetchSdgsList]);

  const handleOpenEdit = (score: SdgsScore) => {
    setEditData(score);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus score SDGS ini?")) return;

    try {
      const res = await fetch(`/api/sdgs/score/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchScores();
        alert("Score berhasil dihapus!");
      } else {
        const errorData = await res.json();
        alert(`Gagal menghapus: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Terjadi kesalahan saat menghapus score");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const sdgs_id = Number(formData.get("sdgs_id"));
    const score = Number(formData.get("score"));
    const tahun = Number(formData.get("tahun"));

    console.log({ sdgs_id, score, tahun });

    if (!sdgs_id || !tahun) {
      alert("SDGS dan Tahun wajib diisi!");
      setSubmitLoading(false);
      return;
    }

    try {
      let res;
      if (editData) {
        // Update
        res = await fetch(`/api/sdgs/score/${editData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            desa_id: desaId,
            sdgs_id,
            score,
            tahun,
          }),
        });
      } else {
        // Create
        res = await fetch(`/api/sdgs/score`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            desa_id: desaId,
            sdgs_id,
            score,
            tahun,
          }),
        });
      }

      if (res.ok) {
        setModalOpen(false);
        fetchScores();
        alert("Score berhasil disimpan!");
        form.reset();
      } else {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert(`Error: ${errorData.error || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Terjadi kesalahan saat menyimpan score");
    } finally {
      setSubmitLoading(false);
    }
  };

  // === Modal Form ===
  if (modalOpen) {
    return (
      <div>
        <div className="bg-white w-full p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">
            {editData ? "Edit Score SDGS" : "Tambah Score SDGS"}
          </h2>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="desa_id" value={desaId} />

            <div className="mb-4">
              <label className="block mb-2 font-medium">SDGS</label>
              <select
                name="sdgs_id"
                defaultValue={editData?.sdgs_id || ""}
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
                required
                disabled={!!editData}
              >
                {editData && (
                  <input
                    type="hidden"
                    name="sdgs_id"
                    value={editData.sdgs_id}
                  />
                )}
                <option value="" disabled>
                  Pilih SDGS
                </option>
                {sdgsList
                  .filter(
                    (sdgs) =>
                      editData?.sdgs_id === sdgs.id ||
                      !scores.some((score) => score.sdgs_id === sdgs.id)
                  )
                  .map((sdgs) => (
                    <option key={sdgs.id} value={sdgs.id}>
                      {sdgs.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Score</label>
              <input
                type="number"
                step="0.01"
                name="score"
                defaultValue={editData?.score || ""}
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Tahun</label>
              <input
                type="number"
                name="tahun"
                placeholder="Contoh: 2023"
                defaultValue={editData?.tahun || ""}
                className="border border-gray-300 w-full px-3 py-2 rounded-md"
                required
              />
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
          Manajemen SDGS Score
        </h2>
        <button
          onClick={() => {
            setEditData(null);
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-white text-blue-700 rounded-md shadow hover:bg-gray-100"
        >
          + Tambah
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Memuat data...</span>
        </div>
      ) : scores.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Belum ada data SDGS Score</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-3 text-left">
                  SDGS
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Score
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Tahun
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left">
                  Desa
                </th>
                <th className="border border-gray-200 px-4 py-3 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3">
                    {s.sdgs?.title || `SDGS #${s.sdgs_id}`}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {s.score}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {s.tahun}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {s.profile_desa?.nama_desa || "-"}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => handleOpenEdit(s)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
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
