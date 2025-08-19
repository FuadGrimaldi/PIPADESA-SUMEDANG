// src/app/api/gallery/subdomain/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ArticlesDesaService } from "@/lib/prisma-services/articlesDesaService";
import { AgendaDesaService } from "@/lib/prisma-services/agendaDesaService";
import { GalleryItem } from "@/types/gallery";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const desaId = parseInt(params.id);
    if (isNaN(desaId)) {
      return NextResponse.json({ error: "Invalid desa ID" }, { status: 400 });
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");

    // Fetch published articles with images
    const articles = await ArticlesDesaService.getArticlesByDesaId(desaId);

    // Fetch published agendas with posters
    const agendas = await AgendaDesaService.getAgendasByDesaId(desaId);

    // Convert articles to gallery items
    const articleGalleryItems: GalleryItem[] = articles
      .filter((article) => article.featured_image) // Only articles with images
      .map((article) => ({
        id: `article-${article.id}`,
        originalId: article.id,
        type: "article" as const,
        title: article.title,
        image_url: article.featured_image!,
        published_date: new Date(article.published_at),
        slug: article.slug,
      }));

    // Convert agendas to gallery items
    const agendaGalleryItems: GalleryItem[] = agendas
      .filter((agenda) => agenda.poster) // Only published agendas with posters
      .map((agenda) => ({
        id: `agenda-${agenda.id}`,
        originalId: agenda.id,
        type: "agenda" as const,
        title: agenda.judul,
        image_url: agenda.poster!,
        published_date: new Date(agenda.waktu),
      }));

    // Combine and sort by published date (newest first)
    const allGalleryItems = [
      ...articleGalleryItems,
      ...agendaGalleryItems,
    ].sort((a, b) => b.published_date.getTime() - a.published_date.getTime());

    // Implement pagination
    const startIndex = (page - 1) * limit;
    const paginatedItems = allGalleryItems.slice(
      startIndex,
      startIndex + limit
    );

    return NextResponse.json({
      items: paginatedItems,
      total: allGalleryItems.length,
      page,
      limit,
      totalPages: Math.ceil(allGalleryItems.length / limit),
    });
  } catch (error: any) {
    console.error("GET /api/gallery/subdomain/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
