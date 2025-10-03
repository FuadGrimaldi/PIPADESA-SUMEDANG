import { SdgsDesaService } from "@/lib/prisma-services/sdgsDesaService";
import { NextResponse, NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

// get by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid SDG ID" }, { status: 400 });
    }
    const sdgs = await SdgsDesaService.getSdgsById(id);
    if (!sdgs) {
      return NextResponse.json({ error: "SDG not found" }, { status: 404 });
    }
    return NextResponse.json(sdgs);
  } catch (error: any) {
    console.error("GET /api/sdgs/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// update by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid SDG ID" }, { status: 400 });
    }
    const existingSdgs = await SdgsDesaService.getSdgsById(id);
    if (!existingSdgs) {
      return NextResponse.json({ error: "SDG not found" }, { status: 404 });
    }
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const image = formData.get("image") as File | null;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    let filePath: string | undefined = existingSdgs.image || undefined;
    // Handle file upload
    if (image && image.size > 0) {
      try {
        const defaultImages = [
          "/assets/default/image-not-available.png",
          "/assets/default/default.jpg",
        ];
        if (existingSdgs.image && !defaultImages.includes(existingSdgs.image)) {
          {
            let imagePath: string;

            if (existingSdgs.image.startsWith("/assets/")) {
              // ✅ path dari public (misal: /assets/uploads/articles/xxx.jpg)
              imagePath = path.join(
                process.cwd(),
                "public",
                existingSdgs.image
              );
            } else if (existingSdgs.image.startsWith("/uploads/")) {
              // ✅ path dari uploads (misal: /uploads/articles/xxx.jpg)
              imagePath = path.join(process.cwd(), existingSdgs.image);
            } else {
              imagePath = "";
            }

            if (imagePath && fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }
          }
        }
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
        filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        filePath = `/uploads/sdgs/${fileName}`;
      } catch (error) {
        console.error("❌ Error uploading image:", error);
        return NextResponse.json(
          { message: "Image upload failed", error: String(error) },
          { status: 500 }
        );
      }
    }
    const sdgsData: any = {
      title,
      image: filePath,
    };
    const updatedSdgs = await SdgsDesaService.updateSdgs(id, sdgsData);

    return NextResponse.json(updatedSdgs);
  } catch (error: any) {
    console.error("PUT /api/sdgs/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// delete by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid SDG ID" }, { status: 400 });
    }
    const existingSdgs = await SdgsDesaService.getSdgsById(id);
    if (!existingSdgs) {
      return NextResponse.json({ error: "SDG not found" }, { status: 404 });
    }
    // Delete associated image if it exists and is not a default image
    const defaultImages = [
      "/assets/default/image-not-available.png",
      "/assets/default/default.jpg",
    ];
    if (existingSdgs.image && !defaultImages.includes(existingSdgs.image)) {
      let imagePath: string;

      if (existingSdgs.image.startsWith("/assets/")) {
        // ✅ path dari public (misal: /assets/uploads/articles/xxx.jpg)
        imagePath = path.join(process.cwd(), "public", existingSdgs.image);
      } else if (existingSdgs.image.startsWith("/uploads/")) {
        // ✅ path dari uploads (misal: /uploads/articles/xxx.jpg)
        imagePath = path.join(process.cwd(), existingSdgs.image);
      } else {
        imagePath = "";
      }

      if (imagePath && fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await SdgsDesaService.deleteSdgs(id);
    return NextResponse.json({ message: "SDG deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/sdgs/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
