import { getDesaBySubdomain } from "@/lib/prisma-services/profileDesaService";
import Link from "next/link";
import Image from "next/image";

const Hero = async ({ subdomain }: { subdomain: string | null }) => {
  const desa = await getDesaBySubdomain(subdomain || "");

  if (!subdomain) {
    return (
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">Welcome to Website Desa</h1>
            <p className="mt-4 text-lg">Your journey starts here.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 relative">
      <div
        className="hero lg:h-[350px] h-[500px] rounded-2xl shadow-lg relative overflow-hidden"
        style={{
          backgroundImage: `url(${
            desa?.foto_depan
              ? desa.foto_depan
              : "https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp"
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Hero Overlay */}
        <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>

        {/* Logo Kiri */}
        <div className="absolute top-1 left-1 z-20">
          <Image
            src={"/assets/logo-fix/logo-sumedang-500.png"}
            alt="Logo Desa"
            width={80}
            height={80}
            className="rounded-full shadow-lg p-1"
          />
        </div>

        {/* Logo Kanan */}
        <div className="absolute top-1 right-1 z-20">
          <Image
            src={"/assets/logo-fix/logo-sumedang-500.png"}
            alt="Logo Pemda"
            width={80}
            height={80}
            className="rounded-full shadow-lg p-1"
          />
        </div>

        {/* Content Container */}
        <div className="flex justify-center items-center w-full h-full rounded-2xl relative z-10">
          <div className="text-white text-center max-w-2xl mx-auto px-4 pb-6">
            <div className="bg-black/30 backdrop-blur-sm p-2 rounded-lg border border-white/20">
              <h1 className="mb-4 text-2xl md:text-3xl font-bold drop-shadow-lg">
                {desa?.nama_desa || subdomain}
              </h1>
              <p className="mb-6 text-sm md:text-base drop-shadow-md leading-relaxed">
                Dapatkan informasi terkini tentang pelayanan, berita, dan
                kegiatan desa.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link href="/layanan">
                  <div className="px-4 py-2 lg:text-base text-sm border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-md font-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                    Jelajahi Layanan
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Info Bar Bottom (Optional) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600/80 to-blue-800/80 backdrop-blur-sm p-3 z-10">
          <div className="flex justify-between items-center text-white lg:text-sm text-xs">
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{desa?.alamat || "kab. sumedang"}</span>
            </div>

            {desa?.email && (
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{desa.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Geometric decoration */}
          <div className="absolute top-6 right-24 w-8 h-8 border-2 border-white/30 rotate-45"></div>
          <div className="absolute bottom-20 left-24 w-6 h-6 border-2 border-white/20 rotate-12"></div>
          <div className="absolute top-16 left-1/4 w-4 h-4 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-24 right-1/4 w-3 h-3 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
