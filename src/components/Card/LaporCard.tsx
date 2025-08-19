import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LaporCard() {
  return (
    <div
      id="lapor-card"
      className="w-full  rounded-xl overflow-hidden bg-cover bg-center text-white py-8 pr-6 lg:pr-[100px] pl-[60px] md:flex md:items-center md:justify-between "
    >
      <div className="flex items-center gap-4 mb-6 md:mb-0 ">
        <Image
          src="/assets/logo-fix/logolapor.png"
          alt="logo lapor"
          className="object-contain "
          width={250}
          height={250}
        />
      </div>

      <div className="max-w-md">
        <p className="mb-4">
          Kami melayani dengan sepenuh hati tanpa gratifikasi dan pungli. Klik
          tombol dibawah apabila menemukan pelayanan yang menyimpang.
        </p>
        <Link
          href="https://www.lapor.go.id/"
          className="inline-flex items-center gap-2 bg-white text-red-600 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition hover:bg-gray-300"
        >
          Laporkan
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
