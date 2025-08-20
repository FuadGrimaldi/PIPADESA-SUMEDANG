"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TahuSumedangComp() {
  // Data layanan dan gambar
  const layananData = {
    ktpRusak: "/assets/additional/ktp-rusak-tahu-app.jpg",
    kk: "/assets/additional/layanan-kk.jpg",
    akta: "/assets/additional/layanan-akta.jpg",
    tahu: "/assets/additional/layanan-ktp.jpg",
  };

  // State untuk gambar aktif
  const [layanan, setLayanan] = useState("tahu");

  return (
    <section>
      <div>
        <div className="text-center mb-6 border-b-4 border-[#C0B099] pb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Informasi Lainnya
          </h1>
          <p className="text-lg text-gray-600">
            Temukan informasi penting dan layanan terkait Tahu Sumedang di sini.
            Klik tombol di bawah untuk memilih layanan yang Anda butuhkan.
          </p>
        </div>
        {/* Tombol Pilihan Layanan dengan perulangan */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {[
            { key: "ktpRusak", label: "Layanan KTP Rusak" },
            { key: "kk", label: "Layanan KK" },
            { key: "akta", label: "Layanan Akta" },
            { key: "tahu", label: "Tahu Sumedang" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setLayanan(item.key)}
              className={`px-4 py-2 rounded-lg border transition ${
                layanan === item.key
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="bg-white max-w-4xl mx-auto">
          <motion.div
            key={layanan} // supaya animasi jalan saat ganti gambar
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Image
              src={layananData[layanan]}
              alt={layanan}
              width={1000}
              height={1000}
              className="w-full h-auto rounded-lg shadow-lg"
              unoptimized
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
