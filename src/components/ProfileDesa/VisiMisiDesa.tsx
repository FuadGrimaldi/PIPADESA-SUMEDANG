"use client";
import { motion } from "framer-motion";
export default function VisiMisiDesa() {
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
              Menjadi desa mandiri yang berbasis potensi lokal serta berdaya
              saing di tingkat nasional, dengan tata kelola yang transparan dan
              partisipatif.
            </p>
          </div>

          <div>
            <h2 className="lg:text-3xl text-2xl font-bold text-primary mb-4">
              Misi
            </h2>
            <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 leading-relaxed">
              <li>
                Meningkatkan kualitas sumber daya manusia melalui pendidikan dan
                pelatihan berbasis potensi desa.
              </li>
              <li>
                Mendorong kemandirian ekonomi desa dengan memanfaatkan produk
                lokal dan teknologi tepat guna.
              </li>
              <li>
                Memperkuat tata kelola pemerintahan desa yang transparan,
                akuntabel, dan berbasis digital.
              </li>
              <li>
                Menjaga kelestarian lingkungan hidup dan pengelolaan sumber daya
                alam yang berkelanjutan.
              </li>
              <li>
                Memperkuat solidaritas dan partisipasi masyarakat dalam
                pembangunan desa.
              </li>
            </ul>
          </div>
          <div className="mt-10">
            <h2 className="lg:text-3xl text-2xl font-bold text-primary mb-4">
              Tujuan
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus, quae.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
