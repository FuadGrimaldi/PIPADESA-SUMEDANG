import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Website Desa - Platform Resmi",
  description: "Platform resmi untuk website desa di seluruh Indonesia",
};

export default function HostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <header className="bg-blue-600 text-white p-4">
          <nav className="container mx-auto">
            <h1 className="text-2xl font-bold">Website Desa Platform</h1>
            <p className="text-blue-100">
              Platform Resmi Desa Digital Indonesia
            </p>
          </nav>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="bg-gray-800 text-white p-6 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Website Desa Platform. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
