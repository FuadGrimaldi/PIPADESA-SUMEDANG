import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function CardTahuSumedang() {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-lg px-6 md:px-8 pb-3 md:pb-6 text-white">
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0">
            <Image
              src="/assets/logo-fix/super-app-tahu.png"
              alt="Logo Tahu Sumedang"
              fill
              sizes="(max-width: 768px) 80px, 112px"
              className="object-contain"
              unoptimized={true}
            />
          </div>

          <div>
            <h2 className="lg:text-xl text-lg font-bold text-white">
              Super App
            </h2>
            <h3 className="lg:text-xl text-lg font-extrabold text-orange-400">
              Tahu Sumedang
            </h3>
          </div>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          Portal Layanan Publik Sumedang.
          <br /> Satu akun untuk semua layanan publik
        </p>
      </div>
      <div className=" space-y-3">
        <div className="flex space-x-2">
          <Link
            href={"https://play.google.com/store/search?q=Tahu+Sumedang&c=apps"}
            className="flex-1 bg-black hover:bg-gray-900 text-white text-xs py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1"
          >
            <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
              <span className="text-black text-xs font-bold">G</span>
            </div>
            <span>Play Store</span>
          </Link>

          <Link
            href={"https://tahu.sumedangkab.go.id/"}
            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white text-xs py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1"
          >
            <span>Website</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
