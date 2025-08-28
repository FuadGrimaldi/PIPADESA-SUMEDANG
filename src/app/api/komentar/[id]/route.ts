import { KomentarArtikelService } from "@/lib/prisma-services/komentarArtikelService";
import { NextRequest, NextResponse } from "next/server";

// get coment by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const komentarId = parseInt(params.id, 10);
    if (isNaN(komentarId)) {
      return NextResponse.json(
        { error: "Invalid komentar ID" },
        { status: 400 }
      );
    }

    const komentar = await KomentarArtikelService.getKomentarById(komentarId);
    if (!komentar) {
      return NextResponse.json(
        { error: "Komentar not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(komentar);
  } catch (error: any) {
    console.error(`GET /api/komentar/${params.id} error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// update a comment by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const komentarId = parseInt(params.id, 10);
    if (isNaN(komentarId)) {
      return NextResponse.json(
        { error: "Invalid komentar ID" },
        { status: 400 }
      );
    }

    const data = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.pesan) {
      console.error("Missing required fields:", data);
      return NextResponse.json(
        { error: "Missing required fields: name, email, pesan" },
        { status: 400 }
      );
    }

    const updatedKomentar = await KomentarArtikelService.updateKomentar(
      komentarId,
      data
    );
    return NextResponse.json(updatedKomentar);
  } catch (error: any) {
    console.error(`PUT /api/komentar/${params.id} error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// delete a comment by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const komentarId = parseInt(params.id, 10);
    if (isNaN(komentarId)) {
      return NextResponse.json(
        { error: "Invalid komentar ID" },
        { status: 400 }
      );
    }

    await KomentarArtikelService.deleteKomentar(komentarId);
    return NextResponse.json(
      { message: "Komentar deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`DELETE /api/komentar/${params.id} error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
