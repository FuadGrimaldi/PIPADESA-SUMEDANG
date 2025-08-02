import React from "react";

type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
};

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Gotong Royong Bersihkan Lingkungan",
    excerpt:
      "Warga Desa Cikeusi melaksanakan kegiatan gotong royong membersihkan jalan utama desa...",
    date: "2025-07-30",
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-01.jpg",
  },
  {
    id: 2,
    title: "Pelatihan UMKM untuk Warga",
    excerpt:
      "Pelatihan UMKM dilaksanakan untuk meningkatkan keterampilan usaha mikro masyarakat...",
    date: "2025-07-28",
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-02.jpg",
  },
  {
    id: 3,
    title: "Penyaluran Bantuan Sosial",
    excerpt:
      "Desa Cikeusi menyalurkan bantuan sosial kepada warga kurang mampu...",
    date: "2025-07-25",
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-03.jpg",
  },
  {
    id: 4,
    title: "Pembukaan Jalan Baru",
    excerpt:
      "Jalan penghubung antar dusun resmi dibuka untuk memudahkan akses transportasi...",
    date: "2025-07-20",
    image:
      "https://cdn.tailgrids.com/assets/images/application/blogs/blog-01/image-03.jpg",
  },
];
const News = () => {
  const displayedNews = newsData.slice(0, 3);
  return (
    <section className=" pb-16 pt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            Berita dan Informasi
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Temukan berbagai kabar terbaru, pengumuman resmi, dan informasi
            penting seputar kegiatan dan perkembangan di lingkungan kita.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 ">
          {/* Main Blog Cards */}
          <div className="w-full lg:w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedNews.map((news) => (
              <BlogCard
                key={news.id}
                date={news.date}
                CardTitle={news.title}
                CardDescription={news.excerpt}
                image={news.image}
              />
            ))}
          </div>
          <div className="bg-gray-200  rounded-lg shadow-lg px-[0.5px]"></div>

          {/* Sidebar */}
          <SidebarNews />
        </div>

        {/* Show All Button */}
        <div className="text-left mt-6">
          <a
            href="/news"
            className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded transition text-sm hover:bg-blue-500"
          >
            Lihat Semua Berita...
          </a>
        </div>
      </div>
    </section>
  );
};

export default News;

const BlogCard = ({ image, date, CardTitle, CardDescription }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <img src={image} alt={CardTitle} className="w-full h-48 object-cover" />
        <div className="absolute top-0 right-0 text-black text-xs px-3 py-1 m-2 rounded backdrop-blur-xl bg-white/60">
          Kegiatan Desa
        </div>
      </div>

      <div className="p-5">
        <span className="inline-block text-xs font-medium text-black border-2 border-blue-300 px-3 py-1 rounded-lg">
          {date}
        </span>
        <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-blue-600 transition">
          <a href="/#">{CardTitle}</a>
        </h3>
        <p className="mt-2 text-sm text-gray-700">{CardDescription}</p>
      </div>
    </div>
  );
};

const SidebarNews = () => {
  const items = [
    {
      title: "Why UI/UX still matters in 2025",
      link: "/#",
      date: "Aug 1, 2025",
    },
    {
      title: "Breaking barriers with edge computing",
      link: "/#",
      date: "Jul 28, 2025",
    },
    {
      title: "Top 10 programming trends to watch",
      link: "/#",
      date: "Jul 25, 2025",
    },
    {
      title: "Top 10 programming trends to watch",
      link: "/#",
      date: "Jul 25, 2025",
    },
  ];

  return (
    <div className="w-full lg:w-1/4">
      <h4 className="text-xl font-semibold text-dark dark:text-white mb-4">
        Informasi Lainnya
      </h4>
      <ul className="space-y-4">
        {items.map((item, idx) => (
          <li key={idx} className="border-b pb-3 dark:border-gray-700">
            <a
              href={item.link}
              className="block text-md font-medium text-blue-600 hover:underline"
            >
              {item.title}
            </a>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {item.date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
