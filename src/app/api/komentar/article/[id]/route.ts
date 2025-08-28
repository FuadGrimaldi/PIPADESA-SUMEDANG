import { KomentarArtikelService } from "@/lib/prisma-services/komentarArtikelService";
import { NextResponse } from "next/server";

// get comments by article_id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const articleId = parseInt(params.id, 10);
    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    const komentars = await KomentarArtikelService.getKomentarsByArticleId(
      articleId
    );
    return NextResponse.json(komentars);
  } catch (error: any) {
    console.error(`GET /api/komentar/article/${params.id} error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
