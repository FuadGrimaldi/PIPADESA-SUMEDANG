import { PengaduanAspirasiService } from "@/lib/prisma-services/pengaduanAspirasiService";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const pengaduanAspirasis =
      await PengaduanAspirasiService.getAllPengaduanAspirasis();
    return NextResponse.json(pengaduanAspirasis, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to fetch pengaduan and aspirasi: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // Validate required fields
    if (
      !data.desa_id ||
      !data.name ||
      !data.email ||
      !data.no_telp ||
      !data.pesan ||
      !data.kategori
    ) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: desa_id, name, email, no_telp, pesan, kategori",
        },
        { status: 400 }
      );
    }
    const newPengaduanAspirasi =
      await PengaduanAspirasiService.createPengaduanAspirasi(data);
    return NextResponse.json(newPengaduanAspirasi, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to create pengaduan and aspirasi: ${error}` },
      { status: 500 }
    );
  }
}
