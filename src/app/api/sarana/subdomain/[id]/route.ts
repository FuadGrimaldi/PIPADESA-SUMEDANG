import { SaranaDesaService } from "@/lib/prisma-services/saranaDesaService";
import { NextRequest, NextResponse } from "next/server";
import { SaranaKategori } from "@/types/sarana";

// GET /api/sarana/subdomain/[id]?type=TIPE
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const desaId = parseInt(params.id);
    if (!desaId) {
      return NextResponse.json({ error: "Invalid desa ID" }, { status: 400 });
    }

    // Ambil query params (tipe)
    const { searchParams } = new URL(req.url);
    const typeParam = searchParams.get("type") || undefined;

    const sarana = await SaranaDesaService.getSaranaByDesaId(
      desaId,
      typeParam as SaranaKategori | undefined // cast ke union type
    );

    if (!sarana || sarana.length === 0) {
      return NextResponse.json({ error: "Sarana not found" }, { status: 404 });
    }

    return NextResponse.json(sarana);
  } catch (error: any) {
    console.error("GET /api/sarana/subdomain/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
