import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Website Desa",
  description: "Website resmi desa",
};

export default function SubdomainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <header className="bg-green-600 text-white p-4">
          <nav className="container mx-auto">
            <h1 className="text-2xl font-bold">Website Desa</h1>
            <div className="mt-2">
              <a href="/" className="hover:text-green-200 mr-4">
                Beranda
              </a>
              <a href="/profil" className="hover:text-green-200 mr-4">
                Profil
              </a>
              <a href="/berita" className="hover:text-green-200 mr-4">
                Berita
              </a>
              <a href="/pelayanan" className="hover:text-green-200 mr-4">
                Pelayanan
              </a>
              <a href="/kontak" className="hover:text-green-200">
                Kontak
              </a>
            </div>
          </nav>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="bg-gray-800 text-white p-6 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Website Desa. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
