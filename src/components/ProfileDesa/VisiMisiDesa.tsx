"use client";
import { motion } from "framer-motion";
import { Desa } from "@/types/desa";

interface VisiMisiDesaProps {
  visi: string;
  misi: string;
  tujuan: string;
}

export default function VisiMisiDesa({
  visi,
  misi,
  tujuan,
}: VisiMisiDesaProps) {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6 border-b-4 border-[#C0B099] pb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Visi & Misi
          </h1>
          <p className="text-lg text-gray-600">
            Menuju Desa Mandiri, Berdaya Saing & Berkelanjutan
          </p>
        </div>

        <div className="bg-white max-w-4xl mx-auto">
          {/* Fetch data mulai dari sini */}
          <div className="mb-10">
            <h2 className="lg:text-3xl text-2xl font-bold text-primary mb-4">
              Visi
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {visi || "Loading... Visi desa belum tersedia."}
            </p>
          </div>

          <div>
            <h2 className="lg:text-3xl text-2xl font-bold text-primary mb-4">
              Misi
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {misi || "Loading... Visi desa belum tersedia."}
            </p>
          </div>
          <div className="mt-10">
            <h2 className="lg:text-3xl text-2xl font-bold text-primary mb-4">
              Tujuan
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {tujuan || "Loading... Tujuan desa belum tersedia."}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
