"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBerita({ desaId }: { desaId: number }) {
  const [keyword, setKeyword] = useState("");
  const [tipe, setTipe] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize form with current search params
  useState(() => {
    const currentQuery = searchParams.get("query") || "";
    const currentTipe = searchParams.get("tipe") || "";
    setKeyword(currentQuery);
    setTipe(currentTipe);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // Build URL dengan hanya parameter yang diperlukan
    const params = new URLSearchParams();

    if (keyword && keyword.trim() !== "") {
      params.set("query", keyword);
    }

    // Hanya kirim tipe jika ada value dan bukan string kosong
    if (tipe && tipe.trim() !== "" && tipe !== "semua") {
      params.set("tipe", tipe);
    }

    // Navigate ke halaman search (tidak perlu kirim desa_id karena sudah dari subdomain)
    router.push(`/search?${params.toString()}`);

    // Reset loading state
    setTimeout(() => setLoading(false), 500);
  };

  const handleReset = () => {
    setKeyword("");
    setTipe("");
    router.push("/search");
  };

  return (
    <div>
      <div className="w-full z-30 rounded-xl bg-white shadow-lg p-4 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            {/* Input Search */}
            <div className="relative w-full md:flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Cari berita, agenda, kegiatan..."
                value={keyword || ""}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                minLength={2}
              />
            </div>

            {/* Kategori */}
            <div className="w-full md:w-40">
              <select
                value={tipe}
                onChange={(e) => setTipe(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                <option value="">Semua Kategori</option>
                <option value="berita">Berita</option>
                <option value="kegiatan">Kegiatan</option>
                <option value="pengumuman">Pengumuman</option>
              </select>
            </div>

            {/* Tombol Actions */}
            <div className="flex gap-2 w-full md:w-auto">
              {/* Tombol Cari */}
              <button
                type="submit"
                disabled={loading}
                className="flex-1 md:flex-none md:w-auto rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed px-4 py-2 text-white font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Mencari...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Cari
                  </>
                )}
              </button>

              {/* Tombol Reset */}
              {(keyword || tipe) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  title="Reset pencarian"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
