import { KomentarArtikelService } from "@/lib/prisma-services/komentarArtikelService";
import { NextRequest, NextResponse } from "next/server";

// get all comments
export async function GET() {
  try {
    const komentars = await KomentarArtikelService.getAllKomentars();
    return NextResponse.json(komentars);
  } catch (error: any) {
    console.error("GET /api/komentar error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// create a new comment
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate required fields
    if (!data.article_id || !data.name || !data.email || !data.pesan) {
      console.error("Missing required fields:", data);
      return NextResponse.json(
        { error: "Missing required fields: article_id, name, email, pesan" },
        { status: 400 }
      );
    }

    const newKomentar = await KomentarArtikelService.createKomentar(data);
    return NextResponse.json(newKomentar, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/komentar error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
