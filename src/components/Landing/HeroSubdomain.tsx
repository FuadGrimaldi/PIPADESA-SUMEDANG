import FloatingSearchBar from "@/components/Search/SubdomainSearchLanding";
import { getDesaBySubdomain } from "@/lib/prisma-services/profileDesaService";
import { NextRequest } from "next/server";

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
      {" "}
      {/* Tambahkan relative di sini */}
      <div
        className="hero h-[500px] rounded-2xl shadow-lg"
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
        <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>

        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white z-10">
          <div className="max-w-xl text-left bg-opacity-50 p-6 rounded-lg">
            <h1 className="mb-5 text-4xl font-bold">
              Selamat Datang di Website Resmi Desa {subdomain}
            </h1>
            <p className="mb-5 text-lg">
              Website resmi Desa {subdomain}. Dapatkan informasi terkini tentang
              pelayanan, berita, dan kegiatan desa.
            </p>
            <div className="w-1/3 py-3 border border-blue-600 rounded-lg text-center cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white hover:shadow-lg hover:border-transparent hover:-translate-y-1">
              Jelajahi Layanan
            </div>
          </div>
        </div>
      </div>
      {/* ⬇️ Tambahkan komponen pencarian di bawah Hero */}
      <FloatingSearchBar />
    </div>
  );
};

export default Hero;
