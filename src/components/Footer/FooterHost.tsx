import { Globe } from "lucide-react";
export default function FooterHost() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Globe className="w-12 h-12 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold mb-4">SID Kabupaten Sumedang</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Sistem Informasi Desa yang menghubungkan seluruh desa di Kabupaten
            Sumedang untuk transparansi informasi dan pelayanan yang lebih baik
            kepada masyarakat.
          </p>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-400">
              © 2024 Sistem Informasi Desa Kabupaten Sumedang. Seluruh hak cipta
              dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
