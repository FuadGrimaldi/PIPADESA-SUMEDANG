import SearchBerita from "@/components/Search/SearchNews";
import SidebarNewsPhoto from "@/components/Sidebar/SidebarNews";
import Breadcrumb from "@/components/Ui/breadchum/Breadchumb";
import Wave1 from "@/components/Ui/Wave/Wave1";
import SumedangWeatherWidget from "@/components/Ui/Weather/SumedangWeather";
import { headers } from "next/headers";
import { getDesaBySubdomain } from "@/lib/prisma-services/profileDesaService";
import SearchArticle from "@/components/ProfileDesa/SearchArticle";
import { ArticlesDesaService } from "@/lib/prisma-services/articlesDesaService";
import { Article, ArticleType } from "@/types/article";

interface SearchPageProps {
  searchParams: {
    query?: string;
    tipe?: string;
    desa_id?: string;
    page?: string;
    limit?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const desa = await getDesaBySubdomain(subdomain);
  const desaId = Number(desa?.id);
  const links = [
    { to: "/", label: "Home" },
    { to: "/search", label: "Search" },
  ];

  // Fetch search results from the API
  const query = searchParams.query || "";
  const tipe = searchParams.tipe || "";
  const page = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "10");

  let results: Article[] = [];
  let error = null;
  const hasSearchQuery =
    (query && query.trim() !== "") || (tipe && tipe.trim() !== "");

  if (hasSearchQuery) {
    try {
      const rawResults = await ArticlesDesaService.searchArticles(
        query.trim(),
        desaId,
        tipe && tipe.trim() !== "" ? tipe : undefined,
        page,
        limit
      );
      results = rawResults.map((article: any) => ({
        ...article,
        tipe: article.tipe as ArticleType,
      }));
    } catch (err: any) {
      console.error("Search error:", err);
      error = err.message || "Failed to search articles";
      results = [];
    }
  }

  return (
    <div className="container min-h-screen">
      <div className="relative px-[31px] lg:px-[100px] py-8 bg-gray-800 overflow-visible pt-[90px]">
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-[#C0B099] via-50% to-white pointer-events-none" />
        <Breadcrumb links={links} />

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start ">
          {/* Main Content */}
          <div className="w-full lg:flex-1 ">
            <div className="mb-4">
              <SearchBerita desaId={Number(desa?.id)} />
              <div className="mb-4 bg-white rounded-lg shadow-lg p-6">
                <SearchArticle articles={results} />
              </div>
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
