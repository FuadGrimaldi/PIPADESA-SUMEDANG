import SidebarNewsPhoto from "@/components/Sidebar/SidebarNews";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";
import Wave1 from "@/components/Ui/Wave/Wave1";
import SumedangWeatherWidget from "@/components/Ui/Weather/SumedangWeather";
import ArticleDetail from "@/components/ProfileDesa/DetailBerita";

type Props = {
  params: { id: string };
};

export default function DetailBeritaPage({ params }: Props) {
  const id = params.id; // Assuming you're using a routing library that provides useParams // Assuming you're using a routing library that provides useParams
  const links = [
    { to: "/", label: "Home" },
    { to: "/berita", label: "Berita" },
    { to: `/berita/${id}`, label: `${id}` },
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
              <ArticleDetail articleId={parseInt(id)} />
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
