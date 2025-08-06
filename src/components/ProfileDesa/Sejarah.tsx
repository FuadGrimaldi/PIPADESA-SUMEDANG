"use client";
import { motion } from "framer-motion";
export default function SejarahDesa() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6 border-b-4 border-[#C0B099] pb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Sejarah
          </h1>
          <p className="text-lg text-gray-600">
            Menelusuri Jejak Sejarah Desa Kita
          </p>
        </div>

        <div className="bg-white max-w-4xl mx-auto">
          {/* Fetch data mulai dari sini */}
          <div className="mb-12">
            <h2 className="lg:text-3xl text-2xl font-bold text-primary mb-4">
              Sejarah Desa
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Desa kita memiliki sejarah yang kaya dan beragam, dimulai dari
              pembentukan komunitas awal hingga perkembangan yang pesat saat
              ini. Sejak zaman dahulu, desa ini telah menjadi pusat kegiatan
              sosial, ekonomi, dan budaya masyarakat setempat.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
