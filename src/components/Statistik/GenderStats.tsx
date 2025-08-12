import DynamicPieChart from "../Ui/Chart/PieChart";
import { Users, UserCheck, UserX, TrendingUp } from "lucide-react";

export default function GenderStats() {
  const genderStats = [
    { label: "Belum Mengisi", value: 97 },
    { label: "Laki - Laki", value: 2533 },
    { label: "Perempuan", value: 2541 },
  ];

  // Calculate total and percentages
  const total = genderStats.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentages = genderStats.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));

  // Get colors for consistency with chart
  const colors = ["#ef4444", "#3b82f6", "#ec4899"]; // red, blue, pink

  const getIcon = (label: string) => {
    switch (label) {
      case "Laki - Laki":
        return <UserCheck className="w-5 h-5 text-blue-600" />;
      case "Perempuan":
        return <UserCheck className="w-5 h-5 text-pink-600" />;
      case "Belum Mengisi":
        return <UserX className="w-5 h-5 text-red-600" />;
      default:
        return <Users className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 z-0">
      {/* Chart Section */}
      <DynamicPieChart
        data={genderStats}
        title="Statistik Jenis Kelamin Penduduk"
        width={400}
        height={300}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-6">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">
                Total Penduduk
              </p>
              <p className="text-2xl font-bold text-orange-700">
                {total.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="p-3 bg-orange-600 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">
                Data Lengkap
              </p>
              <p className="text-2xl font-bold text-orange-700">
                {(
                  ((dataWithPercentages.find(
                    (item) => item.label !== "Belum Mengisi"
                  )?.value || 0) /
                    total) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
            <div className="p-3 bg-orange-600 rounded-full">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Rasio L:P</p>
              <p className="text-2xl font-bold text-orange-700">
                {(() => {
                  const laki =
                    dataWithPercentages.find(
                      (item) => item.label === "Laki - Laki"
                    )?.value ?? 0;
                  const perempuan =
                    dataWithPercentages.find(
                      (item) => item.label === "Perempuan"
                    )?.value ?? 1;
                  return (laki / perempuan).toFixed(2);
                })()}
              </p>
            </div>
            <div className="p-3 bg-orange-600 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Detail Data Jenis Kelamin
          </h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Total: {total.toLocaleString("id-ID")} jiwa
          </span>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Jenis Kelamin
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Jumlah
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
              {dataWithPercentages.map((item, index) => (
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
                          {item.label === "Laki - Laki"
                            ? "Male"
                            : item.label === "Perempuan"
                            ? "Female"
                            : "Unspecified"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {item.value.toLocaleString("id-ID")}
                    </div>
                    <div className="text-xs text-gray-500">jiwa</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="inline-flex items-center">
                      <span
                        className="inline-block w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: colors[index] }}
                      ></span>
                      <span className="text-lg font-semibold text-gray-900">
                        {item.percentage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full transition-all duration-1000 ease-out group-hover:opacity-80"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: colors[index],
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      {item.percentage}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Statistics */}
        <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Total Jiwa
              </div>
              <div className="text-lg font-bold text-gray-900">
                {total.toLocaleString("id-ID")}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Terbanyak
              </div>
              <div className="text-lg font-bold text-blue-600">
                {
                  dataWithPercentages.reduce((max, item) =>
                    item.value > max.value ? item : max
                  ).label
                }
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Data Valid
              </div>
              <div className="text-lg font-bold text-green-600">
                {(
                  100 -
                  parseFloat(
                    dataWithPercentages.find(
                      (item) => item.label === "Belum Mengisi"
                    )?.percentage || "0"
                  )
                ).toFixed(1)}
                %
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Selisih L-P
              </div>
              <div className="text-lg font-bold text-purple-600">
                {Math.abs(
                  (dataWithPercentages.find(
                    (item) => item.label === "Laki - Laki"
                  )?.value || 0) -
                    (dataWithPercentages.find(
                      (item) => item.label === "Perempuan"
                    )?.value || 0)
                ).toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
