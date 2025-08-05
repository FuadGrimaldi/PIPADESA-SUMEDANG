import Image from "next/image";
import React from "react";

const SidebarNewsPhoto = () => {
  const items = [
    {
      title: "Why UI/UX still matters in 2025",
      link: "/#",
      date: "Aug 1, 2025",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop&crop=center",
      category: "Design",
    },
    {
      title: "Breaking barriers with edge computing",
      link: "/#",
      date: "Jul 28, 2025",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop&crop=center",
      category: "Technology",
    },
    {
      title: "Top 10 programming trends to watch",
      link: "/#",
      date: "Jul 25, 2025",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&crop=center",
      category: "Programming",
    },
    {
      title: "Machine Learning in Web Development",
      link: "/#",
      date: "Jul 22, 2025",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop&crop=center",
      category: "AI",
    },
    {
      title: "Machine Learning in Web Development",
      link: "/#",
      date: "Jul 22, 2025",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop&crop=center",
      category: "AI",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b-2 border-[#C0B099] pb-2">
        Informasi Lainnya
      </h4>

      <div className="space-y-5">
        {items.slice(0, 4).map((item, idx) => (
          <article
            key={idx}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700/50"
          >
            <a href={item.link} className="block">
              <div className="relative overflow-hidden">
                <Image
                  width={400}
                  height={200}
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-4">
                <h5 className="text-sm font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {item.title}
                </h5>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <time dateTime={item.date} className="flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item.date}
                  </time>

                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-blue-600 dark:text-blue-400">
                      Read more
                    </span>
                    <svg
                      className="w-3 h-3 ml-1 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href="/berita"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200"
        >
          Lihat Semua Berita
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SidebarNewsPhoto;
