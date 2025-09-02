import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

export default function CardNews({
  id,
  category,
  image,
  date,
  CardTitle,
  CardDescription,
}) {
  return (
    <Link
      href={`/berita/${id}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative">
        <Image
          src={image}
          alt={CardTitle}
          className="w-full h-48 object-cover"
          width={400}
          height={200}
        />
        <div className="absolute top-0 right-0 text-black text-xs px-3 py-1 m-2 rounded backdrop-blur-xl bg-white/60">
          {category}
        </div>
      </div>

      <div className="p-5">
        <time dateTime={date} className="flex items-center text-[12px]">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          {date}
        </time>
        <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-blue-600 transition">
          <span>{CardTitle}</span>
        </h3>
        <div className="mt-2 text-sm text-gray-600">
          {parse(CardDescription)}
        </div>
      </div>
    </Link>
  );
}
