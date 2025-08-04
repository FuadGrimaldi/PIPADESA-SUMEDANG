import SidebarNewsPhoto from "@/components/Sidebar/SidebarNews";

import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";
import Wave1 from "@/components/Ui/Wave/Wave1";
import SumedangWeatherWidget from "@/components/Ui/Weather/SumedangWeather";

export default function BeritaPage() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/berita", label: "Berita" },
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
              <h1 className="text-2xl font-bold mb-4">Berita</h1>
              <p>Berita terbaru akan ditampilkan di sini.</p>
              {/* Placeholder for news content */}
            </div>
            <SumedangWeatherWidget />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[300px] flex-shrink-0 bg-white">
            <SidebarNewsPhoto />
          </div>
        </div>
        <Wave1 />
      </div>
    </div>
  );
}
