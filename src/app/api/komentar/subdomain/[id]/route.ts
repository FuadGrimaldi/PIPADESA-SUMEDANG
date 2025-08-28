import { KomentarArtikelService } from "@/lib/prisma-services/komentarArtikelService";
import { NextResponse } from "next/server";

// get by desa_id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const desaId = parseInt(params.id, 10);
    if (isNaN(desaId)) {
      return NextResponse.json({ error: "Invalid desa ID" }, { status: 400 });
    }

    const komentars = await KomentarArtikelService.getKomentarsByDesaId(desaId);
    return NextResponse.json(komentars);
  } catch (error: any) {
    console.error(`GET /api/komentar/subdomain/${params.id} error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
