import LaporCard from "@/components/Card/LaporCard";
import StatistikPenduduk from "@/components/Landing/DataStatistik";
import Hero from "@/components/Landing/HeroSubdomain";
import News from "@/components/News/News";
import PartnerLogos from "@/components/Slide/SliderSubdomain";
import { headers } from "next/headers";
import { getDesaBySubdomain } from "@/lib/prisma-services/profileDesaService";

export default async function SubdomainHomePage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const desa = await getDesaBySubdomain(subdomain);

  return (
    <div className="container min-h-screen  ">
      <div className="relative px-[31px] lg:px-[100px] px-4 py-8 bg-gray-800">
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-100 via-[#C0B099] via-50% to-gray-100 pointer-events-none" />

        <div className="relative pt-16 z-10">
          <Hero subdomain={subdomain} />
        </div>
      </div>

      <div id="news-landing" className="px-[31px] lg:px-[100px] px-4 py-8">
        <News desaId={Number(desa?.id)} />
      </div>
      <div
        id="kemerdekaan-landing"
        className="px-[31px] lg:px-[100px] px-4 h-[300px] bg-[#fcf6f0]"
      ></div>

      <div id="stats" className="px-[31px] lg:px-[100px] px-4 py-8">
        <div className="bg-none">
          <StatistikPenduduk desaId={Number(desa?.id)} namaDesa={subdomain} />
        </div>
        <div className=" py-8 hover:scale-105 transition-transform duration-300">
          <LaporCard />
        </div>
      </div>
      <div id="partner-landing" className="px-[31px] lg:px-[100px] px-4 py-8">
        <PartnerLogos />
      </div>
    </div>
  );
}
