"use client";
import { useState, useCallback, useEffect } from "react";
import { Organisasi } from "@/types/organisasi";
import AllOrganisasi from "../ProfileDesa/Directori";

interface SearchOrganisasiProps {
  desaId: number;
  namaKategori: string;
}

export default function SearchOrganisasi({
  desaId,
  namaKategori,
}: SearchOrganisasiProps) {
  const [keyword, setKeyword] = useState("");
  const [kategoriName, setKategoriName] = useState(namaKategori);
  const [kategoriId, setKategoriId] = useState(""); // kategori_id yg dipilih user
  const [kategoriData, setKategoriData] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔎 API Search
  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/search/organisasi?query=${encodeURIComponent(
          keyword
        )}&desa_id=${desaId}&kategori_id=${kategoriId}`
      );
      const data = await res.json();
      if (res.ok) {
        setResults(data.results);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📂 Ambil daftar kategori dari API
  const fetchKategoriData = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/organisasi/kategori/subdomain/${desaId}`
      );
      if (response.ok) {
        const data = await response.json();

        setKategoriData(data); // <-- data kategori dimasukkan ke state
        const foundKategori = Array.isArray(data)
          ? data.find((k) => k.nama_kategori === namaKategori)
          : null;
        if (foundKategori) {
          setKategoriId(foundKategori.id?.toString() || "");
        }
      }
    } catch (error) {
      console.error("Error fetching kategori:", error);
    }
  }, [desaId, namaKategori]);

  useEffect(() => {
    fetchKategoriData();
  }, [fetchKategoriData]);

  return (
    <div>
      <div className="w-full z-30 rounded-xl bg-white shadow-lg p-4 mb-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          {/* Input Search */}
          <div className="relative w-full md:flex-1">
            <input
              type="text"
              placeholder="Search..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-4 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Dropdown kategori */}
          <div className="w-full md:w-40">
            <input
              type="text"
              readOnly
              value={
                kategoriData.find((k) => k.id?.toString() === kategoriId)
                  ?.nama_kategori || ""
              }
              placeholder={namaKategori || "Pilih kategori"}
              className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-4 text-sm bg-gray-100 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Tombol Cari */}
          <div className="w-full md:w-auto">
            <button
              onClick={handleSearch}
              className="w-full md:w-auto rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              {loading ? "Mencari..." : "Cari"}
            </button>
          </div>
        </div>
      </div>
      <div className="mb-4 bg-white rounded-lg shadow-lg p-6">
        <AllOrganisasi
          desaId={desaId}
          namaKategori={namaKategori}
          searchResults={results}
        />
      </div>
    </div>
  );
}
