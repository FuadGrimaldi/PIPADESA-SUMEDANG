export default function StrukturPage() {
  return (
    <div className="container min-h-screen  ">
      <div className="relative px-[31px] lg:px-[100px] px-4 py-8 bg-gray-800">
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-[#C0B099] via-50% to-white pointer-events-none" />

        <div className="relative pt-16 z-10">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Struktur Organisasi
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center">
            Struktur organisasi adalah susunan hierarki yang menunjukkan
            pembagian tugas, tanggung jawab, dan hubungan antar bagian dalam
            suatu organisasi. Ini membantu dalam pengelolaan dan koordinasi
            kegiatan organisasi.
          </p>
        </div>
      </div>

      <div className="px-[31px] lg:px-[100px] px-4 py-8"></div>
    </div>
  );
}
