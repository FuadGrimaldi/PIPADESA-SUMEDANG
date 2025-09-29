"use client";
import { Users, Home, User } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface StatistikData {
  title: string;
  value: string;
  icon: JSX.Element;
}

interface StatistikPendudukProps {
  desaId: number;
  namaDesa?: string;
}

export default function StatistikPenduduk({
  desaId,
  namaDesa,
}: StatistikPendudukProps) {
  const [dataStatistik, setDataStatistik] = useState<StatistikData[]>([
    {
      title: "Warga",
      value: "0",
      icon: <Users className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "Keluarga",
      value: "0",
      icon: <Home className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "Laki-Laki",
      value: "0",
      icon: <User className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "Perempuan",
      value: "0",
      icon: <User className="w-8 h-8 text-purple-500" />,
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format number with thousand separators
  const formatNumber = (num: number): string => {
    return num.toLocaleString("id-ID");
  };

  // Update data statistik helper function
  const updateDataStatistik = useCallback((data) => {
    setDataStatistik([
      {
        title: "Warga",
        value: formatNumber(
          (Number(data?.penduduk_laki_laki) || 0) +
            (Number(data?.penduduk_perempuan) || 0)
        ),
        icon: <Users className="w-8 h-8 text-purple-500" />,
      },
      {
        title: "Keluarga",
        value: formatNumber(Number(data?.jumlah_kepala_keluarga) || 0),
        icon: <Home className="w-8 h-8 text-purple-500" />,
      },
      {
        title: "Laki-Laki",
        value: formatNumber(Number(data?.penduduk_laki_laki) || 0),
        icon: <User className="w-8 h-8 text-purple-500" />,
      },
      {
        title: "Perempuan",
        value: formatNumber(Number(data?.penduduk_perempuan) || 0),
        icon: <User className="w-8 h-8 text-purple-500" />,
      },
    ]);
  }, []);

  // Fetch data from API using axios
  const fetchStatistikData = useCallback(async () => {
    if (!desaId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Try primary API endpoint with axios
      const response = await axios.get(
        `https://e-officedesa.sumedangkab.go.id/dashboard_desa_cantik/get_data`,
        {
          params: {
            type: "desa",
            id_skpd: desaId,
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 seconds timeout
        }
      );

      const data = response.data.data;
      updateDataStatistik(data);
    } catch (err) {
      console.error("Error fetching statistik data:", err);

      let errorMessage = "Gagal memuat data statistik";

      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED") {
          errorMessage = "Koneksi timeout - coba lagi";
        } else if (err.response) {
          errorMessage = `Server error: ${err.response.status}`;
        } else if (err.request) {
          errorMessage = "Tidak dapat menghubungi server";
        }
      }

      setError(errorMessage);

      // Fallback: try local API endpoint
      try {
        const fallbackResponse = await axios.get(
          `/api/statistik/desa/${desaId}`,
          {
            timeout: 5000, // 5 seconds timeout for fallback
          }
        );

        const fallbackData = fallbackResponse.data;
        updateDataStatistik(fallbackData);
        setError(null);
      } catch (fallbackErr) {
        console.error("Fallback API also failed:", fallbackErr);

        if (axios.isAxiosError(fallbackErr)) {
          if (fallbackErr.response?.status === 404) {
            setError("Data tidak ditemukan untuk desa ini");
          }
        }
        // Keep the error state and default values
      }
    } finally {
      setLoading(false);
    }
  }, [desaId, updateDataStatistik]);

  // Fetch data on component mount and when desaId changes
  useEffect(() => {
    fetchStatistikData();
  }, [fetchStatistikData]);

  return (
    <section className="py-12 bg-white shadow-md rounded-lg border border-gray-200  ">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 ">STATISTIK</h2>
            <h1 className="text-3xl md:text-4xl font-extrabold text-black  mb-2">
              JUMLAH PENDUDUK
            </h1>
            <p className="text-xl font-semibold italic text-[#C4B49B] mb-4">
              Desa {namaDesa}
            </p>
            <div className="w-full h-[1px] bg-gray-300 mb-4"></div>
          </div>
          <div>
            <div className="w-full h-[1px] bg-gray-300 mb-4"></div>
            <p className="text-gray-600  leading-relaxed">
              Data kependudukan bersumber dari sensus penduduk dan proyeksi.
              Untuk tahun tanpa sensus, digunakan data proyeksi berdasarkan tren
              dan asumsi demografis.
            </p>
            {error && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-700 text-sm flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  {error} - Menampilkan data default
                </p>
                <button
                  onClick={fetchStatistikData}
                  className="mt-2 text-xs text-yellow-600 hover:text-yellow-800 underline"
                >
                  Coba lagi
                </button>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          // Loading state
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="px-6 py-2 bg-white  e">
                <div className="flex items-center gap-1 lg:gap-4 mb-2">
                  <div className="p-[5px] lg:p-3 bg-gray-200  rounded-full w-10 h-10"></div>
                  <div className="h-4 bg-gray-200  rounded w-20"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-full py-1 bg-gray-200  rounded-xl mr-2 h-4"></div>
                  <div className="h-6 bg-gray-200  rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Data display
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {dataStatistik.map((item, index) => (
              <div key={index} className="group px-6 py-2 bg-white  0">
                <div className="flex items-center gap-1 lg:gap-4 mb-2">
                  <div className="p-[5px] lg:p-3 bg-purple-100  rounded-full transition-all group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="text-sm lg:text-lg font-medium text-gray-700 ">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center">
                  <div className="w-full py-1 bg-purple-200  rounded-xl mr-2"></div>
                  <p className="text-lg lg:text-2xl font-bold text-right text-black ">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh button */}
      </div>
    </section>
  );
}
