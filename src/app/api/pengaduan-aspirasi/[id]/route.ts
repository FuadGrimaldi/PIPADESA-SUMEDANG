import { PengaduanAspirasiService } from "@/lib/prisma-services/pengaduanAspirasiService";
import { NextResponse, NextRequest } from "next/server";

// get by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const pengaduanAspirasi =
      await PengaduanAspirasiService.getPengaduanAspirasiById(id);
    if (!pengaduanAspirasi) {
      return NextResponse.json(
        { message: "Pengaduan or Aspirasi not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(pengaduanAspirasi, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to fetch pengaduan and aspirasi by id: ${error}` },
      { status: 500 }
    );
  }
}
// delete by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const deletedPengaduanAspirasi =
      await PengaduanAspirasiService.deletePengaduanAspirasi(id);
    if (!deletedPengaduanAspirasi) {
      return NextResponse.json(
        { message: "Pengaduan or Aspirasi not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(deletedPengaduanAspirasi, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to delete pengaduan and aspirasi by id: ${error}` },
      { status: 500 }
    );
  }
}
// update by id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const data = await request.json();
    const updatedPengaduanAspirasi =
      await PengaduanAspirasiService.updatePengaduanAspirasi(id, data);
    if (!updatedPengaduanAspirasi) {
      return NextResponse.json(
        { message: "Pengaduan or Aspirasi not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedPengaduanAspirasi, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to update pengaduan and aspirasi by id: ${error}` },
      { status: 500 }
    );
  }
}
