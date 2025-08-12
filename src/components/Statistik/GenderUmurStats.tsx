import DynamicBarChart from "../Ui/Chart/BarChart";
import {
  Users,
  Baby,
  GraduationCap,
  Briefcase,
  Heart,
  TrendingUp,
  UserX,
} from "lucide-react";

export default function GenderUmurStats() {
  const genderUmurStats = [
    {
      label: "0-4 Tahun",
      lakiLaki: 156,
      perempuan: 142,
      belumMengisi: 29,
      total: 327,
    },
    {
      label: "5-9 Tahun",
      lakiLaki: 189,
      perempuan: 174,
      belumMengisi: 15,
      total: 378,
    },
    {
      label: "10-14 Tahun",
      lakiLaki: 203,
      perempuan: 198,
      belumMengisi: 12,
      total: 413,
    },
    {
      label: "15-19 Tahun",
      lakiLaki: 234,
      perempuan: 221,
      belumMengisi: 8,
      total: 463,
    },
    {
      label: "20-24 Tahun",
      lakiLaki: 267,
      perempuan: 289,
      belumMengisi: 5,
      total: 561,
    },
    {
      label: "25-29 Tahun",
      lakiLaki: 298,
      perempuan: 312,
      belumMengisi: 3,
      total: 613,
    },
    {
      label: "30-34 Tahun",
      lakiLaki: 321,
      perempuan: 334,
      belumMengisi: 2,
      total: 657,
    },
    {
      label: "35-39 Tahun",
      lakiLaki: 287,
      perempuan: 301,
      belumMengisi: 1,
      total: 589,
    },
    {
      label: "40-44 Tahun",
      lakiLaki: 245,
      perempuan: 267,
      belumMengisi: 3,
      total: 515,
    },
    {
      label: "45-49 Tahun",
      lakiLaki: 198,
      perempuan: 213,
      belumMengisi: 2,
      total: 413,
    },
    {
      label: "50-54 Tahun",
      lakiLaki: 167,
      perempuan: 178,
      belumMengisi: 4,
      total: 349,
    },
    {
      label: "55-59 Tahun",
      lakiLaki: 134,
      perempuan: 145,
      belumMengisi: 6,
      total: 285,
    },
    {
      label: "60-64 Tahun",
      lakiLaki: 112,
      perempuan: 123,
      belumMengisi: 8,
      total: 243,
    },
    {
      label: "65+ Tahun",
      lakiLaki: 98,
      perempuan: 134,
      belumMengisi: 10,
      total: 242,
    },
  ];

  // Calculate totals
  const totalBelumMengisi = genderUmurStats.reduce(
    (sum, item) => sum + item.belumMengisi,
    0
  );
  const totalLakiLaki = genderUmurStats.reduce(
    (sum, item) => sum + item.lakiLaki,
    0
  );
  const totalPerempuan = genderUmurStats.reduce(
    (sum, item) => sum + item.perempuan,
    0
  );
  const grandTotal = totalLakiLaki + totalPerempuan + totalBelumMengisi;

  // Prepare data for BarChart
  const categories = genderUmurStats.map((item) => item.label);
  const series = [
    {
      label: "Belum Mengisi",
      data: genderUmurStats.map((item) => item.belumMengisi),
    },
    {
      label: "Laki-laki",
      data: genderUmurStats.map((item) => item.lakiLaki),
    },
    {
      label: "Perempuan",
      data: genderUmurStats.map((item) => item.perempuan),
    },
  ];

  const getIcon = (ageRange: string) => {
    if (ageRange.includes("0-4") || ageRange.includes("5-9")) {
      return <Baby className="w-5 h-5 text-pink-600" />;
    } else if (ageRange.includes("10-14") || ageRange.includes("15-19")) {
      return <GraduationCap className="w-5 h-5 text-blue-600" />;
    } else if (
      ageRange.includes("20-") ||
      ageRange.includes("30-") ||
      ageRange.includes("40-")
    ) {
      return <Briefcase className="w-5 h-5 text-green-600" />;
    } else {
      return <Heart className="w-5 h-5 text-purple-600" />;
    }
  };

  const getAgeCategory = (ageRange: string) => {
    if (ageRange.includes("0-4") || ageRange.includes("5-9")) {
      return "Balita & Anak";
    } else if (ageRange.includes("10-14") || ageRange.includes("15-19")) {
      return "Remaja";
    } else if (
      ageRange.includes("20-") ||
      ageRange.includes("30-") ||
      ageRange.includes("40-")
    ) {
      return "Dewasa Produktif";
    } else {
      return "Lansia";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 z-0">
      {/* Chart Section */}
      <div className="mb-8">
        <DynamicBarChart
          categories={categories}
          series={series}
          title="Statistik Penduduk Berdasarkan Kelompok Umur dan Jenis Kelamin"
          width={800}
          height={400}
        />
      </div>

      {/* Summary Cards - Updated to include 5 cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Total Penduduk
              </p>
              <p className="text-2xl font-bold text-blue-700">
                {grandTotal.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="p-3 bg-blue-600 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Laki-laki</p>
              <p className="text-2xl font-bold text-green-700">
                {totalLakiLaki.toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-green-600">
                {((totalLakiLaki / grandTotal) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-green-600 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-pink-600">Perempuan</p>
              <p className="text-2xl font-bold text-pink-700">
                {totalPerempuan.toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-pink-600">
                {((totalPerempuan / grandTotal) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-pink-600 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Belum Mengisi</p>
              <p className="text-2xl font-bold text-red-700">
                {totalBelumMengisi.toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-red-600">
                {((totalBelumMengisi / grandTotal) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-red-600 rounded-full">
              <UserX className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Rasio L:P</p>
              <p className="text-2xl font-bold text-orange-700">
                {(totalLakiLaki / totalPerempuan).toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-orange-600 rounded-full">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Table with Belum Mengisi column */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Detail Data Kelompok Umur dan Jenis Kelamin
          </h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Total: {grandTotal.toLocaleString("id-ID")} jiwa
          </span>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kelompok Umur
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Laki-laki
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Perempuan
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Belum Mengisi
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Persentase
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Visualisasi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {genderUmurStats.map((item, index) => (
                <tr
                  key={item.label}
                  className="hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {getIcon(item.label)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {getAgeCategory(item.label)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-semibold text-green-600">
                      {item.lakiLaki.toLocaleString("id-ID")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {((item.lakiLaki / item.total) * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-semibold text-pink-600">
                      {item.perempuan.toLocaleString("id-ID")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {((item.perempuan / item.total) * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-semibold text-red-600">
                      {item.belumMengisi.toLocaleString("id-ID")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {((item.belumMengisi / item.total) * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {item.total.toLocaleString("id-ID")}
                    </div>
                    <div className="text-xs text-gray-500">jiwa</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-semibold text-gray-900">
                      {((item.total / grandTotal) * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {/* Belum Mengisi bar */}
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-1.5 bg-red-500 rounded-full transition-all duration-1000 ease-out group-hover:opacity-80"
                            style={{
                              width: `${Math.max(
                                2,
                                (item.belumMengisi / grandTotal) * 100 * 10
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-red-600 w-8">BM</span>
                      </div>
                      {/* Laki-laki bar */}
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-1.5 bg-green-500 rounded-full transition-all duration-1000 ease-out group-hover:opacity-80"
                            style={{
                              width: `${Math.max(
                                5,
                                (item.lakiLaki / grandTotal) * 100 * 5
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-green-600 w-8">L</span>
                      </div>
                      {/* Perempuan bar */}
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-1.5 bg-pink-500 rounded-full transition-all duration-1000 ease-out group-hover:opacity-80"
                            style={{
                              width: `${Math.max(
                                5,
                                (item.perempuan / grandTotal) * 100 * 5
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-pink-600 w-8">P</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Updated Table Footer with Data Quality Information */}
        <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Balita & Anak (0-9)
              </div>
              <div className="text-lg font-bold text-pink-600">
                {genderUmurStats
                  .filter(
                    (item) =>
                      item.label.includes("0-4") || item.label.includes("5-9")
                  )
                  .reduce((sum, item) => sum + item.total, 0)
                  .toLocaleString("id-ID")}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Remaja (10-19)
              </div>
              <div className="text-lg font-bold text-blue-600">
                {genderUmurStats
                  .filter(
                    (item) =>
                      item.label.includes("10-14") ||
                      item.label.includes("15-19")
                  )
                  .reduce((sum, item) => sum + item.total, 0)
                  .toLocaleString("id-ID")}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Dewasa (20-49)
              </div>
              <div className="text-lg font-bold text-green-600">
                {genderUmurStats
                  .filter(
                    (item) =>
                      item.label.includes("20-") ||
                      item.label.includes("30-") ||
                      item.label.includes("40-")
                  )
                  .reduce((sum, item) => sum + item.total, 0)
                  .toLocaleString("id-ID")}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Lansia (50+)
              </div>
              <div className="text-lg font-bold text-purple-600">
                {genderUmurStats
                  .filter(
                    (item) =>
                      item.label.includes("50-") ||
                      item.label.includes("55-") ||
                      item.label.includes("60-") ||
                      item.label.includes("65+")
                  )
                  .reduce((sum, item) => sum + item.total, 0)
                  .toLocaleString("id-ID")}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Data Valid
              </div>
              <div className="text-lg font-bold text-green-600">
                {(
                  ((grandTotal - totalBelumMengisi) / grandTotal) *
                  100
                ).toFixed(1)}
                %
              </div>
            </div>
          </div>
        </div>

        {/* Data Quality Summary */}
        <div className="mt-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">
            Ringkasan Kualitas Data
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-green-600 font-bold text-lg">
                {(
                  ((totalLakiLaki + totalPerempuan) / grandTotal) *
                  100
                ).toFixed(1)}
                %
              </div>
              <div className="text-gray-600">Data Lengkap</div>
            </div>
            <div className="text-center">
              <div className="text-red-600 font-bold text-lg">
                {((totalBelumMengisi / grandTotal) * 100).toFixed(1)}%
              </div>
              <div className="text-gray-600">Belum Lengkap</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 font-bold text-lg">
                {grandTotal.toLocaleString("id-ID")}
              </div>
              <div className="text-gray-600">Total Jiwa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
