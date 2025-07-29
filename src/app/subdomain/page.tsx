import { headers } from "next/headers";

export default function SubdomainHomePage() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Selamat Datang di Desa {subdomain}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Website resmi Desa {subdomain}
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Profil Desa</h3>
          <p className="text-gray-600 mb-4">
            Pelajari lebih lanjut tentang sejarah, visi, dan misi desa kami.
          </p>
          <a href="/profil" className="text-green-600 hover:text-green-700">
            Selengkapnya →
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Berita Terkini</h3>
          <p className="text-gray-600 mb-4">
            Dapatkan informasi terbaru seputar kegiatan dan program desa.
          </p>
          <a href="/berita" className="text-green-600 hover:text-green-700">
            Selengkapnya →
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Pelayanan</h3>
          <p className="text-gray-600 mb-4">
            Akses berbagai layanan administrasi dan kemasyarakatan.
          </p>
          <a href="/pelayanan" className="text-green-600 hover:text-green-700">
            Selengkapnya →
          </a>
        </div>
      </section>
    </div>
  );
}
