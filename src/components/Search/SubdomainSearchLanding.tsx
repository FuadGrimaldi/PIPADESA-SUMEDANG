export default function FloatingSearchBar() {
  return (
    <div className="absolute left-1/2 top-[92%] z-30 w-[90%] max-w-4xl -translate-x-1/2 rounded-xl bg-white p-4 shadow-lg">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        {/* Input Search */}
        <div className="relative w-full md:flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 12.414M15 11a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Vertical Divider */}
        <div className="hidden h-6 w-px bg-gray-300 md:block" />

        {/* Kategori */}
        <div className="w-full md:w-40">
          <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
            <option>Wisata</option>
            <option>UMKM</option>
            <option>Event</option>
          </select>
        </div>

        {/* Tombol */}
        <div className="w-full md:w-auto">
          <button className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Cari
          </button>
        </div>
      </div>
    </div>
  );
}
