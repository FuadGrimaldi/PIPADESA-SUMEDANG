import Link from "next/link";

interface CardInstansiProps {
  id: string | number;
  alt?: string;
  kontak?: string;
  jenis?: string;
  nama_instansi?: string;
  nama_layanan?: string;
}

export default function CardInstansi({
  id,
  alt,
  kontak,
  jenis,
  nama_instansi,
  nama_layanan,
}: CardInstansiProps) {
  return (
    <Link href={`/instansi/${id}`}>
      <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-[#ECE1D1] cursor-pointer relative">
        {/* Header with Letter Badge */}
        <div className="relative p-6 pb-4">
          {/* Institution Name */}
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2 leading-tight">
            {nama_instansi || "Nama Instansi"}
          </h3>

          {/* Contact Info */}
          {kontak && (
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>{kontak}</span>
            </div>
          )}

          {/* Action Button */}
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
              {/* Service Name */}
              {jenis && <p className="text-sm">{jenis}</p>}
              <span></span>
            </div>

            <div className="flex items-center text-[#C0B099] font-medium text-sm group-hover:text-blue-700 transition-colors">
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
