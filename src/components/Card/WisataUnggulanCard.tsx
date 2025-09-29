import Image from "next/image";
import { motion } from "framer-motion";

interface Sarana {
  id: number;
  nama_sarana: string;
  deskripsi: string;
  foto_path: string;
  alamat_lokasi: string;
}

interface CardEksklusifProps {
  sarana: Sarana;
  onClick: (sarana: Sarana) => void;
}

export default function CardEksklusif({ sarana, onClick }: CardEksklusifProps) {
  return (
    <motion.div
      className="relative w-full max-w-3xl mx-auto rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(sarana)}
    >
      {/* Background image */}
      <div className="relative h-72 md:h-96 w-full">
        <Image
          src={sarana.foto_path}
          alt={sarana.nama_sarana}
          fill
          priority
          className="object-cover group-hover:brightness-75 transition"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 p-6 text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          {sarana.nama_sarana}
        </h2>
        <p className="text-sm md:text-base mb-4 line-clamp-2">
          {sarana.deskripsi}
        </p>
        <p className="text-xs md:text-sm text-gray-200 italic">
          📍 {sarana.alamat_lokasi}
        </p>
        <button className="mt-4 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow">
          Lihat Detail
        </button>
      </div>

      {/* Label eksklusif */}
      <span className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold shadow">
        🌟 Eksklusif
      </span>
    </motion.div>
  );
}
