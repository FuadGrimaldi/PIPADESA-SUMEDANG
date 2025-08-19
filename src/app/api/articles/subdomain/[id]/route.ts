import { NextRequest, NextResponse } from "next/server";
import { ArticlesDesaService } from "@/lib/prisma-services/articlesDesaService";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const desaId = parseInt(params.id);
    if (isNaN(desaId)) {
      return NextResponse.json({ error: "Invalid desa ID" }, { status: 400 });
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const tipe = searchParams.get("tipe");
    const status = searchParams.get("status") || "PUBLISHED";

    const articles = await ArticlesDesaService.getArticlesByDesaId(desaId);

    return NextResponse.json(articles);
  } catch (error: any) {
    console.error("GET /api/articles/subdomain/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
