import { OrganisasiDesaService } from "@/lib/prisma-services/organisasiDesaService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const organizations = await OrganisasiDesaService.getAllCategories();
    return NextResponse.json(organizations);
  } catch (error: any) {
    console.error("GET /api/organisasi error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const namaKategori = formData.get("nama_kategori") as string;
    const desaId = formData.get("desa_id") as string;

    // Validate required fields
    if (!namaKategori) {
      console.error("Missing required field: nama_kategori");
      return NextResponse.json(
        { error: "Missing required field: nama_kategori" },
        { status: 400 }
      );
    }

    const newCategory = await OrganisasiDesaService.createCategory({
      nama_kategori: namaKategori,
      desa_id: parseInt(desaId), // Ensure desa_id is a number
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/organisasi error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
