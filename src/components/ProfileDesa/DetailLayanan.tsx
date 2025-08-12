"use client";
import { motion } from "framer-motion";
import { Download, Clock, Building2, FileText, Calendar } from "lucide-react";
import Image from "next/image";

interface DetailLayananProps {
  id: string;
}

const DetailLayanan = ({ id }: DetailLayananProps) => {
  const instansiData = {
    nama: "BPHTB",
    lembaga: "BADAN PENGELOLAAN PENDAPATAN DAERAH",
    deskripsi: "Melayani Pembayaran BPHTB",
    persyaratan: [
      {
        no: 2,
        nama: "BPHTB",
        keterangan: "",
        file: "/files/bphtb.pdf",
      },
    ],
    jamBuka: [
      { hari: "Senin", jam: "07:00 - 14:00" },
      { hari: "Selasa", jam: "07:00 - 14:00" },
      { hari: "Rabu", jam: "07:00 - 14:00" },
      { hari: "Kamis", jam: "07:00 - 14:00" },
      { hari: "Jumat", jam: "07:00 - 14:00" },
      { hari: "Sabtu", jam: "08:00 - 14:00" },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen  from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-5 lg:p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
        >
          <div
            className="flex flex-col md:flex-row bg-gradient-to-r from-[#7c5a3a] to-[#C3B1A5] px-6 py-8 md:px-8 backdrop-blur-md bg-opacity-80"
            style={{ backgroundColor: "#7c5a3a" }}
          >
            <div className="flex items-start flex-1 gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {instansiData.nama}
                </h1>
                <p className="text-blue-100 text-lg font-medium">
                  {instansiData.lembaga}
                </p>
              </div>
            </div>
            <div>
              <Image
                src="/assets/logo-fix/logo-sumedang-500.png"
                alt="Instansi Image"
                width={80}
                height={80}
                className="rounded-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Deskripsi Layanan
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-base">
                {/* {instansiData.deskripsi} */} Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quasi quod, aut mollitia dicta
                aperiam eos rerum dolores ullam. Laborum, modi.
              </p>
            </div>

            {/* Requirements Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 md:px-8 md:py-6 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    Persyaratan
                  </h2>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                        No
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                        Persyaratan
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                        Keterangan
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                        File
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {instansiData.persyaratan.map((item, index) => (
                      <tr
                        key={item.no}
                        className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-slate-25"
                        }`}
                      >
                        <td className="px-6 py-4 text-slate-700 font-medium">
                          {item.no}
                        </td>
                        <td className="px-6 py-4 text-slate-700">
                          {item.nama}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {item.keterangan || "-"}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={item.file}
                            download
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Operating Hours */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Jam Buka Layanan
                </h2>
              </div>

              <div className="space-y-3">
                {instansiData.jamBuka.map((jam, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-1 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="font-medium text-slate-700">
                        {jam.hari}
                      </span>
                    </div>
                    <span className="text-slate-600 font-mono text-sm bg-white px-2 py-1 rounded">
                      {jam.jam}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-lg p-6 md:p-8 text-white">
              <h3 className="text-lg font-semibold mb-3">Informasi Penting</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Pastikan semua persyaratan telah dipenuhi sebelum mengajukan
                layanan. Untuk informasi lebih lanjut, silakan hubungi petugas
                yang bertugas.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailLayanan;
