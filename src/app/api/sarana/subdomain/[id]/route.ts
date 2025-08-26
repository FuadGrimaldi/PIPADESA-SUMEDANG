import { SaranaDesaService } from "@/lib/prisma-services/saranaDesaService";
import { NextRequest, NextResponse } from "next/server";

// get by desaId
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const desaId = parseInt(params.id);
    if (!desaId) {
      return NextResponse.json({ error: "Invalid desa ID" }, { status: 400 });
    }

    const sarana = await SaranaDesaService.getSaranaByDesaId(desaId);
    if (!sarana) {
      return NextResponse.json({ error: "Sarana not found" }, { status: 404 });
    }

    return NextResponse.json(sarana);
  } catch (error: any) {
    console.error("GET /api/sarana/[desaId] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
