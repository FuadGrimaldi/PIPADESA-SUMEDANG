import Image from "next/image";

export default function SubdomainAbout() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Tentang Kami</h2>
        </div>

        {/* Content */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Gambar + Nama */}
          <div className="flex flex-col items-center lg:w-5/12 w-full">
            <div className="w-56 h-56 mb-4">
              <Image
                src="/assets/perangkat-desa/crop1.jpg"
                alt="Kepala Desa Cikeusi"
                className="w-full h-full object-contain rounded-md shadow-md"
                width={224}
                height={224}
              />
            </div>
            <div className="bg-[#c3b39b] text-white py-2 px-6 rounded-md shadow-md text-center">
              <p className="font-bold uppercase text-sm">Nama</p>
              <p className="text-md">Kepala Desa Cikeusi</p>
            </div>
          </div>

          {/* Sambutan */}
          <div className="lg:w-7/12 w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Sambutan Kepala Desa
            </h3>
            <h4 className="text-2xl font-bold italic text-[#c3b39b] mb-6">
              Desa Cikeusi
            </h4>
            <p className="text-gray-700 mb-4">
              Assalamu’alaikum Warahmatullahi Wabarakatuh,
            </p>
            <p className="text-gray-700 mb-4">
              Saya mengucapkan terima kasih kepada seluruh warga Desa Cikeusi
              atas dukungan dan partisipasinya dalam membangun desa kita
              tercinta. Mari kita terus jaga kebersamaan, gotong royong, dan
              semangat untuk memajukan Cikeusi menjadi desa yang mandiri,
              sejahtera, dan berdaya.
            </p>
            <p className="text-gray-700 mb-4">
              Semoga Allah SWT senantiasa meridhoi setiap langkah kita.
            </p>
            <p className="text-gray-700">
              Wassalamu’alaikum Warahmatullahi Wabarakatuh.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
