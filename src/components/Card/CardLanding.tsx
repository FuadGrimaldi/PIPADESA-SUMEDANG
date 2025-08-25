import Image from "next/image";
import { Article } from "@/types/article";
import { Agenda } from "@/types/agenda";

interface BlogCardAgendaProps {
  agenda: Agenda;
}

const BlogCardAgenda = ({ agenda }: BlogCardAgendaProps) => {
  // Format date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Truncate description
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (!content) return "";
    const plainText = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <Image
          src={agenda.poster || "/images/default-agenda.jpg"}
          alt={agenda.judul}
          className="w-full h-48 object-cover"
          width={400}
          height={200}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/default-agenda.jpg";
          }}
        />
      </div>

      <div className="p-5">
        <span className="inline-block text-xs font-medium text-black border-2 border-blue-300 px-3 py-1 rounded-lg">
          {formatDate(agenda.waktu)}
        </span>
        <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-blue-600 transition">
          <p className="line-clamp-2">{agenda.judul}</p>
        </h3>
        <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600"></div>
        <span>
          <strong>Waktu:</strong> {formatDate(agenda.waktu)}
        </span>
        <br />
        {agenda.lokasi && (
          <span>
            <strong>Lokasi:</strong> {agenda.lokasi}
          </span>
        )}
      </div>
    </div>
  );
};

// Updated BlogCard component to use Article data
interface BlogCardProps {
  article: Article;
}

const BlogCard = ({ article }: BlogCardProps) => {
  // Format date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Truncate description
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (!content) return "";
    const plainText = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <Image
          src={article.featured_image || "/images/default-article.jpg"}
          alt={article.title}
          className="w-full h-48 object-cover"
          width={400}
          height={200}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/default-article.jpg";
          }}
        />
        <div className="absolute top-0 right-0 text-black text-xs px-3 py-1 m-2 rounded backdrop-blur-xl bg-white/60">
          {article.tipe || "Berita"}
        </div>
      </div>

      <div className="p-5">
        <span className="inline-block text-xs font-medium text-black border-2 border-blue-300 px-3 py-1 rounded-lg">
          {formatDate(article.published_at)}
        </span>
        <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-blue-600 transition">
          <a href={`/berita/${article.id}`} className="line-clamp-2">
            {article.title}
          </a>
        </h3>
        <p className="mt-2 text-sm text-gray-700 line-clamp-3">
          {truncateContent(article.content)}
        </p>
      </div>
    </div>
  );
};
export { BlogCard, BlogCardAgenda };
