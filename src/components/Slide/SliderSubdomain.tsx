"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

const partners = [
  { id: 1, logo: "/assets/logo-fix/bantuan-sosial.png", name: "Partner 1" },
  { id: 2, logo: "/assets/logo-fix/e-office.jpeg", name: "Partner 2" },
  {
    id: 3,
    logo: "/assets/logo-fix/LAPOR-removebg-preview.png",
    name: "Partner 3",
  },
  { id: 4, logo: "/assets/logo-fix/logo-pemkab.png", name: "Partner 4" },
  { id: 5, logo: "/assets/logo-fix/sitabaha.png", name: "Partner 5" },
  { id: 6, logo: "/assets/logo-fix/logo-sumedang-500.png", name: "Partner 1" },
];

const PartnerLogos = () => {
  return (
    <section id="partners" className="px-6 lg:px-[60px] py-10">
      <div className="mx-auto max-w-7xl pl-6 ">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="flex items-center"
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id} className="flex justify-center">
              <div className="w-[150px] h-[80px] relative transition duration-300 cursor-pointer">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100px, 112px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PartnerLogos;
