import { NextRequest, NextResponse } from "next/server";
import { InfografisDesaService } from "@/lib/prisma-services/infografisDesaService";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { InfografisCreate } from "@/types/infografis";

export async function GET(req: NextRequest) {
  try {
    const infografis = await InfografisDesaService.getAllInfografis();
    return NextResponse.json(infografis, { status: 200 });
  } catch (error) {
    console.error("❌ GET /api/infografis error:", error);
    return NextResponse.json(
      { error: "Failed to fetch infografis" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Extract form fields
    const desa_id = formData.get("desa_id") as string;
    const title = formData.get("title") as string;
    const gambar_path = formData.get("gambar_path") as File | null;
    // Validation
    if (!desa_id || !title || !gambar_path) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imagePath: string | undefined;
    // Handle file upload
    if (gambar_path && gambar_path.size > 0) {
      try {
        const bytes = await gambar_path.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(gambar_path.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "uploads", "infografis");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write file
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        imagePath = `/uploads/infografis/${fileName}`;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 }
        );
      }
    }
    const data: InfografisCreate = {
      desa_id: parseInt(desa_id),
      title,
      gambar_path: imagePath ?? "/assets/default/image-not-available.png",
    };

    const newInfografis = await InfografisDesaService.createInfografis(data);
    return NextResponse.json(newInfografis, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/infografis error:", error);
    return NextResponse.json(
      { error: "Failed to create infografis" },
      { status: 500 }
    );
  }
}
