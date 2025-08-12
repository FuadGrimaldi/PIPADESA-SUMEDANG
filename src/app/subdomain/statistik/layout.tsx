import SejarahDesa from "@/components/ProfileDesa/Sejarah";
import SidebarNewsPhoto from "@/components/Sidebar/SidebarNews";
import VillageSidebar from "@/components/Sidebar/SidebarStatistik";
import Wave1 from "@/components/Ui/Wave/Wave1";
import SumedangWeatherWidget from "@/components/Ui/Weather/SumedangWeather";

export default function StatistikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="relative px-[31px] lg:px-[100px] py-8 bg-gray-800 overflow-visible pt-[90px]">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#C0B099] via-50% to-white" />

        {/* Container with responsive padding */}
        <div className="relative z-10 container mx-auto  py-6 sm:py-8 pt-[90px]">
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[350px_1fr] gap-4 sm:gap-6 lg:gap-8 items-start">
            {/* Sidebar */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-4">
                <VillageSidebar />
              </div>
            </div>

            {children}
          </div>
        </div>

        {/* Wave Component */}
        <Wave1 />
      </div>
    </div>
  );
}
