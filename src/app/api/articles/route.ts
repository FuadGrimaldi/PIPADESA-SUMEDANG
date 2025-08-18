import { NextRequest, NextResponse } from "next/server";
import { ArticlesDesaService } from "@/lib/prisma-services/articlesDesaService";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { ArticleType, ArticleStatus, ArticleCreate } from "@/types/article";

export async function GET() {
  try {
    const articles = await ArticlesDesaService.getAllArticles();
    return NextResponse.json(articles);
  } catch (error: any) {
    console.error("GET /api/articles error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log("POST /api/articles - Starting request");
    console.log("Form data received:", formData);

    // Extract form fields
    const user_id = formData.get("user_id") as string;
    const desa_id = formData.get("desa_id") as string;
    const tipe = formData.get("tipe") as string;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const featured_image = formData.get("featured_image") as File | null;
    const dokumen_terkait_path = formData.get("dokumen_terkait_path") as string;
    const waktu_kegiatan = formData.get("waktu_kegiatan") as string;
    const lokasi_kegiatan = formData.get("lokasi_kegiatan") as string;
    const status = formData.get("status") as string;
    const published_at = formData.get("published_at") as string;

    // Validation
    if (!user_id || !desa_id || !tipe || !title || !slug || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imagePath: string | undefined;

    // Handle file upload
    if (featured_image && featured_image.size > 0) {
      console.log("Processing featured image upload");
      try {
        const bytes = await featured_image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(featured_image.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(
          process.cwd(),
          "public",
          "assets",
          "uploads",
          "articles"
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write file
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        imagePath = `/assets/uploads/articles/${fileName}`;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 }
        );
      }
    }

    // 🔑 Konversi string → enum
    const articleData: ArticleCreate = {
      user_id: parseInt(user_id),
      desa_id: parseInt(desa_id),
      tipe: tipe as ArticleType, // enum
      title,
      slug,
      content,
      featured_image: imagePath ?? null,
      dokumen_terkait_path: dokumen_terkait_path || null,
      waktu_kegiatan: new Date(waktu_kegiatan).toISOString() || null,
      lokasi_kegiatan: lokasi_kegiatan || null,
      status: (status as ArticleStatus) || ArticleStatus.draft,
      published_at:
        new Date(published_at).toISOString() || new Date().toISOString(),
    };
    console.log("Article data prepared:", articleData);

    // Create article
    const article = await ArticlesDesaService.createArticle(articleData);

    return NextResponse.json(article, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/articles error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
