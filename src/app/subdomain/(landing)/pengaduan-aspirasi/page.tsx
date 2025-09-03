import SidebarNewsPhoto from "@/components/Sidebar/SidebarNews";
import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";
import Wave1 from "@/components/Ui/Wave/Wave1";
import SumedangWeatherWidget from "@/components/Ui/Weather/SumedangWeather";
import { headers } from "next/headers";
import { getDesaBySubdomain } from "@/lib/prisma-services/profileDesaService";
import PengaduanAspirasiComp from "@/components/ProfileDesa/PengaduanAspirasi";

export default async function PengaduanAspirasiPage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const desa = await getDesaBySubdomain(subdomain);
  const desaId = Number(desa?.id);
  const links = [
    { to: "/", label: "Home" },
    { to: "/pengaduan-aspirasi", label: "Pengaduan dan Aspirasi Desa" },
  ];
  return (
    <div className="container min-h-screen">
      <div className="relative px-[31px] lg:px-[100px] py-8 bg-gray-800 overflow-visible pt-[90px]">
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-[#C0B099] via-50% to-white pointer-events-none" />
        <Breadcrumb links={links} />

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start ">
          {/* Main Content */}
          <div className="w-full lg:flex-1 ">
            <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
              {/* disini */}
              <PengaduanAspirasiComp desaId={desaId} />
            </div>
            <SumedangWeatherWidget />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[300px] flex-shrink-0 bg-white">
            <SidebarNewsPhoto desaId={desaId} />
          </div>
        </div>
        <Wave1 />
      </div>
    </div>
  );
}
