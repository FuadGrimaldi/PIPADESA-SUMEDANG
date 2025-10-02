import { SdgsDesaService } from "@/lib/prisma-services/sdgsDesaService";
import { NextResponse, NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { CreatSdgs } from "@/types/sdgs";

// GET /api/sdgs
export async function GET() {
  try {
    const sdgs = await SdgsDesaService.getAllSdgs();
    return NextResponse.json(sdgs, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching SDGs:", error);
    return NextResponse.json(
      { message: "Failed to fetch SDGs", error: String(error) },
      { status: 500 }
    );
  }
}

// POST /api/sdgs
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const image = formData.get("image") as File | null;
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    let imagePath: string | undefined;
    // Handle file upload
    if (image && image.size > 0) {
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(image.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;
        // Ensure the uploads directory exists
        const uploadDir = path.join(process.cwd(), "uploads", "sdgs");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        imagePath = `/assets/uploads/sdgs/${fileName}`;
      } catch (error) {
        console.error("❌ Error uploading image:", error);
        return NextResponse.json(
          { message: "Image upload failed", error: String(error) },
          { status: 500 }
        );
      }
    }

    const data: CreatSdgs = {
      title,
      image: imagePath ?? "/assets/default/image-not-available.png",
    };
    const newSdgs = await SdgsDesaService.createSdgs(data);
    return NextResponse.json(newSdgs, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating SDG:", error);
    return NextResponse.json(
      { message: "Failed to create SDG", error: String(error) },
      { status: 500 }
    );
  }
}
