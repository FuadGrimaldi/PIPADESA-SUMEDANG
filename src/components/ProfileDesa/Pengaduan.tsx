"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import LaporCard from "../Card/LaporCard";

const PengaduanComp = () => {
  const [error, setError] = useState<string | null>(null);

  // Loading stat

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Galeri Desa
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Temukan berbagai foto dan momen berharga dari kegiatan dan
              peristiwa di desa kita.
            </p>
          </div>
        </div>
        <div className="text-center"></div>
      </div>
    );
  }

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Pengaduan
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Silahkan ajukan pengaduan dengan klik tombol di bawah ini.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full "
        >
          <div>
            <LaporCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PengaduanComp;
