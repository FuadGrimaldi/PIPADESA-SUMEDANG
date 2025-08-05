"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function StrukturDesa() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Data aparatur desa (gunakan foto placeholder atau ganti dengan URL foto asli)
  const aparaturDesa = [
    {
      id: 1,
      nama: "H. Ahmad Suryadi, S.Sos",
      jabatan: "Kepala Desa",
      foto: "/assets/perangkat-desa/default-profile.jpg", // Fixed: provide default image
    },
    {
      id: 2,
      nama: "Dra. Siti Nurhalimah",
      jabatan: "Sekretaris Desa",
      foto: "/assets/perangkat-desa/default-profile.jpg", // Fixed: provide default image
    },
    {
      id: 3,
      nama: "Drs. Bambang Hermawan",
      jabatan: "Kepala Urusan Pemerintahan",
      foto: "/assets/perangkat-desa/default-profile.jpg", // Fixed: provide default image
    },
    {
      id: 4,
      nama: "Sri Wahyuni, S.E",
      jabatan: "Kepala Urusan Keuangan",
      foto: "/assets/perangkat-desa/default-profile.jpg", // Fixed: provide default image
    },
    {
      id: 5,
      nama: "Ir. Dadang Supriatna",
      jabatan: "Kepala Urusan Perencanaan",
      foto: "/assets/perangkat-desa/default-profile.jpg", // Fixed: provide default image
    },
    {
      id: 6,
      nama: "Hj. Yayah Komariah",
      jabatan: "Kepala Dusun 1",
      foto: "/assets/perangkat-desa/default-profile.jpg", // Fixed: provide default image
    },
    {
      id: 7,
      nama: "Hj. Yayah Komariah",
      jabatan: "Kepala Dusun 1",
      foto: "/assets/perangkat-desa/default-profile.jpg", // Fixed: provide default image
    },
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(aparaturDesa.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Function to get image source with fallback
  const getImageSrc = (foto: string) => {
    if (!foto || foto === "") {
      return "/assets/perangkat-desa/default-profile.jpg";
    }
    return foto;
  };

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-1 border-b-4 border-[#C0B099] pb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Struktur Desa
          </h1>
          <p className="text-lg text-gray-600">
            Pegawai Desa yang jujur, berkomitmen, dan siap melayani masyarakat
            dengan sepenuh hati
          </p>
        </div>

        <div className="bg-white max-w-6xl mx-auto overflow-hidden">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                      {aparaturDesa
                        .slice(
                          slideIndex * itemsPerSlide,
                          (slideIndex + 1) * itemsPerSlide
                        )
                        .map((aparatur) => (
                          <motion.div
                            key={aparatur.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                          >
                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-full -translate-y-16 translate-x-16 opacity-30 group-hover:opacity-50 transition-opacity"></div>

                            <div className="relative p-6">
                              {/* Profile Image */}
                              <div className="flex justify-center mb-6">
                                <div className="relative">
                                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                                    <Image
                                      src={getImageSrc(aparatur.foto)}
                                      alt={aparatur.nama}
                                      className="w-full h-full object-cover"
                                      width={128}
                                      height={128}
                                      unoptimized={getImageSrc(
                                        aparatur.foto
                                      ).startsWith("http")}
                                    />
                                  </div>
                                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#D2B48C] to-[#DEB887] rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                  </div>
                                </div>
                              </div>

                              {/* Info */}
                              <div className="text-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                                  {aparatur.nama}
                                </h3>
                                <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#D2B48C] to-[#DEB887] text-white text-sm font-semibold rounded-full mb-3">
                                  {aparatur.jabatan}
                                </div>
                              </div>

                              {/* Hover Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-green-500/0 group-hover:from-blue-500/5 group-hover:to-green-500/5 transition-all duration-300 rounded-xl"></div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-blue-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 border border-gray-200"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600 hover:text-blue-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-blue-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 border border-gray-200"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600 hover:text-blue-600" />
                </button>
              </>
            )}

            {/* Pagination Dots */}
            {totalSlides > 1 && (
              <div className="flex justify-center space-x-2 p-6 bg-gray-50">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "bg-gradient-to-r from-blue-500 to-green-500 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
