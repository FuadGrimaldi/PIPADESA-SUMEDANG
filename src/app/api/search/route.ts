// src/app/api/search/route.ts
import { NextResponse } from "next/server";
import { ArticlesDesaService } from "@/lib/prisma-services/articlesDesaService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query") || "";
  const desaIdParam = searchParams.get("desa_id");
  const tipe = searchParams.get("tipe") || undefined;

  const desa_id = desaIdParam ? Number(desaIdParam) : undefined;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  if (!desa_id) {
    return NextResponse.json(
      { error: "desa_id parameter is required" },
      { status: 400 }
    );
  }

  try {
    const results = await ArticlesDesaService.searchArticles(
      query,
      desa_id,
      tipe,
      page,
      limit
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("❌ Search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
