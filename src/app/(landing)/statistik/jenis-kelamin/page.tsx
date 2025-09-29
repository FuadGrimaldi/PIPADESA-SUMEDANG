import GenderStats from "@/components/Statistik/GenderStats";
import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";
import SumedangWeatherWidget from "@/components/Ui/Weather/SumedangWeather";
export default function StatistikPage() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/statistik", label: "Statistik" },
    { to: "/statistik/status-penduduk", label: "Status Penduduk" },
  ];
  return (
    <div className="order-1 lg:order-2">
      <Breadcrumb links={links} />
      {/* Main Content Area */}
      <main>
        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
          <div className="container mx-auto px-4">
            <GenderStats />
          </div>
        </div>

        {/* Weather Widget */}
        <div className="w-full mt-4">
          <SumedangWeatherWidget />
        </div>
      </main>
    </div>
  );
}
