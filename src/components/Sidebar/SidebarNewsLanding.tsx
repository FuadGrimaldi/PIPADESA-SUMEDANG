import React from "react";
import { Article } from "@/types/article";
// Updated SidebarNews component
interface SidebarNewsProps {
  articles: Article[];
}

const SidebarNewsLanding = ({ articles }: SidebarNewsProps) => {
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Fallback items if no articles available
  const fallbackItems = [
    {
      title: "Informasi akan segera tersedia",
      link: "#",
      date: formatDate(new Date()),
    },
  ];

  const displayItems = articles.length > 0 ? articles : fallbackItems;

  return (
    <div>
      <h4 className="text-xl font-bold text-dark dark:text-white mb-3">
        Informasi Terbaru
      </h4>
      <ul className="space-y-4">
        {displayItems.slice(0, 1).map((item, idx) => (
          <li
            key={idx}
            className="border-b pb-3 dark:border-gray-700 shadow-md p-3 rounded-lg bg-white"
          >
            <a
              href={
                articles.length > 0 ? `/berita/${(item as Article).id}` : "#"
              }
              className="block text-md font-medium text-blue-600 hover:underline line-clamp-2"
            >
              {articles.length > 0 ? (item as Article).title : item.title}
            </a>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {articles.length > 0
                ? formatDate((item as Article).published_at)
                : item.date}
            </span>
          </li>
        ))}
      </ul>

      {articles.length > 1 && (
        <div className="mt-4">
          <a href="/berita" className="text-sm text-blue-600 hover:underline">
            Lihat semua informasi →
          </a>
        </div>
      )}
    </div>
  );
};

export default SidebarNewsLanding;
