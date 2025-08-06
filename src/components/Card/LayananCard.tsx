import Link from "next/link";

export default function CardLayanan({
  id,
  alt,
  link,
  nama_layanan,
  nama_instansi,
}) {
  // Function to generate background color based on the first letter
  const getBackgroundColor = (letter) => {
    const colors = ["bg-gradient-to-br from-blue-500 to-blue-600"];

    const charCode = letter ? letter.toUpperCase().charCodeAt(0) : 65;
    const index = (charCode - 65) % colors.length;
    return colors[index];
  };

  // Get the first letter of nama_layanan or alt as fallback
  const displayLetter = nama_layanan
    ? nama_layanan.charAt(0).toUpperCase()
    : alt || "L";
  const backgroundColorClass = getBackgroundColor(displayLetter);

  return (
    <Link href={`/layanan/${id}`}>
      <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-[#ECE1D1] cursor-pointer">
        {/* Letter Avatar Section */}
        <div className="relative h-32 flex items-center justify-center">
          <div
            className={`w-28 h-28 ${backgroundColorClass} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <span className="text-2xl font-bold text-white">
              {displayLetter}
            </span>
          </div>

          {/* Decorative background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Instansi Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#C0B099] text-white border border-[#ECE1D1]">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              {nama_instansi || "Instansi"}
            </span>
          </div>

          {/* Service Name */}
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-3 leading-tight">
            {nama_layanan || "Nama Layanan"}
          </h3>

          {/* Service Description/Info */}
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Layanan {nama_layanan?.toLowerCase() || "layanan"} yang tersedia
            untuk masyarakat melalui {nama_instansi || "instansi terkait"}.
          </p>

          {/* Action Button/Link Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Klik untuk detail</span>
            </div>

            <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
              <span className="mr-1">Lihat</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </Link>
  );
}

// CSS untuk grid pattern background (tambahkan ke global CSS atau Tailwind config)
const styles = `
.bg-grid-pattern {
  background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
`;
