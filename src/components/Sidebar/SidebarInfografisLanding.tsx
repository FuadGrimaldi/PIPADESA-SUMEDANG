"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

type Infografis = {
  id: number;
  desa_id: number;
  title: string;
  gambar_path: string;
};

interface InfographicSliderProps {
  infografis?: Infografis[];
}

const InfographicSlider = ({ infografis }: InfographicSliderProps) => {
  const swiperRef = useRef<SwiperType>();

  if (!infografis || infografis.length === 0) {
    return (
      <p className="text-center py-10 text-gray-600">Belum ada infografis.</p>
    );
  }

  return (
    <div className={`infographic-slider`}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Infografis Desa
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Informasi penting dalam bentuk visual yang mudah dipahami
          </p>
        </div>

        {/* Custom Navigation Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Swiper Slider */}
      <div className="relative">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={20}
          slidesPerView={1}
          effect="coverflow"
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet custom-bullet",
            bulletActiveClass:
              "swiper-pagination-bullet-active custom-bullet-active",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={infografis.length > 1}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 1, spaceBetween: 10 },
            1024: { slidesPerView: 1, spaceBetween: 10 },
          }}
          className="infographic-swiper"
        >
          {infografis.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="group relative bg-gray-50 dark:bg-gray-50 hover:rounded-2xl rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                {/* Image Container */}
                <div className="relative h-[420px] overflow-hidden rounded-2xl">
                  <Image
                    src={item.gambar_path}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="flex justify-center mt-6">
          <div className="swiper-pagination !relative !bottom-0"></div>
        </div>
      </div>

      {/* View All Link */}
      <div className="mt-4">
        <a
          href="/informasi-tambahan"
          className="text-sm text-blue-600 hover:underline"
        >
          Lihat semua infografis →
        </a>
      </div>
    </div>
  );
};

export default InfographicSlider;
