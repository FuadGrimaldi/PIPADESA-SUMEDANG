import { Users, Home, User } from "lucide-react";

const dataStatistik = [
  {
    title: "Warga",
    value: "123456",
    icon: <Users className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "Keluarga",
    value: "123456",
    icon: <Home className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "Laki-Laki",
    value: "123456",
    icon: <User className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "Perempuan",
    value: "123456",
    icon: <User className="w-8 h-8 text-purple-500" />,
  },
];

export default function StatistikPenduduk() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              STATISTIK
            </h2>
            <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white mb-2">
              JUMLAH PENDUDUK
            </h1>
            <p className="text-xl font-semibold italic text-[#C4B49B] mb-4">
              Desa Cikeusi
            </p>
            <div className="w-full h-[1px] bg-gray-300 mb-4"></div>
          </div>
          <div>
            <div className="w-full h-[1px] bg-gray-300 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Data kependudukan bersumber dari sensus penduduk dan proyeksi.
              Untuk tahun tanpa sensus, digunakan data proyeksi berdasarkan tren
              dan asumsi demografis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {dataStatistik.map((item, index) => (
            <div
              key={index}
              className="group px-6 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow hover:-translate-y-1 duration-300"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full transition-all group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-2xl font-bold text-black dark:text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
