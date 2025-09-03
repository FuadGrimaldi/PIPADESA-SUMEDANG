"use client";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Globe,
  Users,
  FileText,
  Clock,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Headphones,
} from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  loket: string;
  description: string;
  icon: any;
}

const DetailInstansi = ({ id }) => {
  const officeData = {
    name: "DINAS PENANAMAN MODAL DAN PELAYANAN TERPADU SATU PINTU",
    shortName: "DPMPTSP",
    address:
      "Jl. Prabu Geusan Ulun No.36, Regol Wetan, Sumedang Sel., Kabupaten Sumedang, Jawa Barat",
    email: "ptsp.sumedang@gmail.com",
    phone: "(0261) 205657",
    website: "https://ptsp.sumedangkab.go.id",
    services: [
      {
        id: "e2",
        name: "Pelayanan Perizinan/Pendampingan",
        loket: "Loket E2",
        description: "Layanan perizinan usaha dan pendampingan investasi",
        icon: FileText,
      },
      {
        id: "e3",
        name: "Informasi Investasi",
        loket: "Loket E3",
        description: "Informasi peluang investasi dan regulasi terkait",
        icon: TrendingUp,
      },
      {
        id: "e4",
        name: "Pelayanan Pengaduan MPP",
        loket: "Loket E4",
        description: "Penanganan pengaduan dan keluhan masyarakat",
        icon: Headphones,
      },
      {
        id: "e5",
        name: "Pusat Informasi MPP",
        loket: "Loket E5",
        description: "Pusat informasi dan panduan layanan publik",
        icon: Users,
      },
      {
        id: "e",
        name: "Informasi Lain",
        loket: "Loket E",
        description: "Informasi umum dan layanan tambahan lainnya",
        icon: Globe,
      },
    ],
    stats: [
      { label: "Layanan Tersedia", value: "50+", icon: FileText },
      { label: "Pengguna Aktif", value: "1.2K+", icon: Users },
      { label: "Rating Kepuasan", value: "4.8", icon: Star },
      { label: "Waktu Proses", value: "< 3 Hari", icon: Clock },
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 py-8 md:px-5 lg:px-6"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden ">
            <div
              className="bg-gradient-to-r from-[#7c5a3a] to-[#C3B1A5]  px-8 py-8 md:py-6"
              style={{ backgroundColor: "#7c5a3a" }}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="bg-white/10 p-4 rounded-2xl mb-6"
                >
                  <Building2 className="w-9 h-9 text-white" />
                </motion.div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {officeData.name}
                </h1>
                <p className="text-slate-300 text-lg max-w-2xl">
                  Melayani masyarakat dengan profesional, transparan, dan
                  akuntabel untuk kemudahan berinvestasi dan berusaha
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              Daftar Layanan
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Pilih layanan yang Anda butuhkan untuk mendapatkan informasi
              lengkap dan panduan proses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officeData.services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={cardHoverVariants}
                whileHover="hover"
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 h-full transition-all duration-300 group-hover:shadow-xl group-hover:border-slate-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-slate-100 group-hover:bg-slate-200 transition-colors p-3 rounded-xl">
                      <service.icon className="w-6 h-6 text-slate-600" />
                    </div>
                    <span className="bg-slate-800 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {service.loket}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-slate-900">
                    {service.name}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center text-slate-500 group-hover:text-slate-700 transition-colors">
                    <span className="text-sm font-medium">Lihat Detail</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact & Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-lg">
                <Phone className="w-5 h-5 text-slate-600" />
              </div>
              Informasi Kontak
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <MapPin className="w-5 h-5 text-slate-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-slate-800 mb-1">Alamat</div>
                  <div className="text-slate-600 text-sm leading-relaxed">
                    {officeData.address}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <Mail className="w-5 h-5 text-slate-500 flex-shrink-0" />
                <div>
                  <div className="font-medium text-slate-800 mb-1">Email</div>
                  <a
                    href={`mailto:${officeData.email}`}
                    className="text-slate-600 text-sm hover:text-slate-800 transition-colors"
                  >
                    {officeData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <Phone className="w-5 h-5 text-slate-500 flex-shrink-0" />
                <div>
                  <div className="font-medium text-slate-800 mb-1">Telepon</div>
                  <a
                    href={`tel:${officeData.phone}`}
                    className="text-slate-600 text-sm hover:text-slate-800 transition-colors"
                  >
                    {officeData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <Globe className="w-5 h-5 text-slate-500 flex-shrink-0" />
                <div>
                  <div className="font-medium text-slate-800 mb-1">Website</div>
                  <a
                    href={officeData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 text-sm hover:text-slate-800 transition-colors"
                  >
                    {officeData.website}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Operating Hours */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-slate-600" />
                </div>
                Jam Operasional
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-1 rounded-lg bg-slate-50">
                  <span className="font-medium text-slate-700">
                    Senin - Kamis
                  </span>
                  <span className="text-slate-600 font-mono text-sm">
                    08:00 - 16:00
                  </span>
                </div>
                <div className="flex justify-between items-center p-1 rounded-lg bg-slate-50">
                  <span className="font-medium text-slate-700">Jumat</span>
                  <span className="text-slate-600 font-mono text-sm">
                    08:00 - 16:30
                  </span>
                </div>
                <div className="flex justify-between items-center p-1 rounded-lg bg-red-50">
                  <span className="font-medium text-red-700">
                    Sabtu - Minggu
                  </span>
                  <span className="text-red-600 font-mono text-sm">Tutup</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Shield className="w-5 h-5" />
                Layanan Unggulan
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Dapatkan kemudahan perizinan dan investasi dengan sistem
                terintegrasi dan pelayanan prima
              </p>
              <div className="flex gap-3">
                <button className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-sm font-medium">
                  Panduan Investasi
                </button>
                <button className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-sm font-medium">
                  Cek Status
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailInstansi;
