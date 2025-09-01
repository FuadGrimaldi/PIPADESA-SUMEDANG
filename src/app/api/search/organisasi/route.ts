// app/api/search/route.ts
import { NextResponse } from "next/server";
import { OrganisasiDesaService } from "@/lib/prisma-services/organisasiDesaService";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    const desaId = parseInt(searchParams.get("desa_id") || "0");
    const kategoriId = searchParams.get("kategori_id") || undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!desaId) {
      return NextResponse.json(
        { error: "desa_id wajib diisi" },
        { status: 400 }
      );
    }

    const results = await OrganisasiDesaService.searchOrgansasi(
      query,
      desaId,
      kategoriId,
      page,
      limit
    );

    return NextResponse.json({ results });
  } catch (error: any) {
    console.error("API search error:", error);
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}
