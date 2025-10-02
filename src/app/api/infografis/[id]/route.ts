import { NextRequest, NextResponse } from "next/server";
import { InfografisDesaService } from "@/lib/prisma-services/infografisDesaService";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { InfografisUpdate } from "@/types/infografis";

// by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const infografisId = parseInt(params.id);
    if (isNaN(infografisId)) {
      return NextResponse.json(
        { error: "Invalid infografis ID" },
        { status: 400 }
      );
    }

    const infografis = await InfografisDesaService.getInfografisById(
      infografisId
    );
    if (!infografis) {
      return NextResponse.json(
        { error: "Infografis not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(infografis, { status: 200 });
  } catch (error) {
    console.error("❌ GET /api/infografis/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch infografis" },
      { status: 500 }
    );
  }
}

// Update infografis by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const infografisId = parseInt(params.id);
    if (isNaN(infografisId)) {
      return NextResponse.json(
        { error: "Invalid infografis ID" },
        { status: 400 }
      );
    }

    const existingInfografis = await InfografisDesaService.getInfografisById(
      infografisId
    );
    if (!existingInfografis) {
      return NextResponse.json(
        { error: "Infografis not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    // Extract form fields
    const desa_id = formData.get("desa_id") as string;
    const title = formData.get("title") as string;
    const gambar_path = formData.get("gambar_path") as File | null;

    // Validation
    if (!desa_id || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imagePath: string | undefined;
    // Handle file upload
    if (gambar_path && gambar_path.size > 0) {
      try {
        const defaultImages = [
          "/assets/default/image-not-available.png",
          "/assets/default/default.jpg",
        ];

        if (
          existingInfografis.gambar_path &&
          !defaultImages.includes(existingInfografis.gambar_path)
        ) {
          let imagePath: string;

          if (existingInfografis.gambar_path.startsWith("/assets/")) {
            // ✅ path dari public (misal: /assets/uploads/articles/xxx.jpg)
            imagePath = path.join(
              process.cwd(),
              "public",
              existingInfografis.gambar_path
            );
          } else if (existingInfografis.gambar_path.startsWith("/uploads/")) {
            // ✅ path dari uploads (misal: /uploads/articles/xxx.jpg)
            imagePath = path.join(
              process.cwd(),
              existingInfografis.gambar_path
            );
          } else {
            imagePath = "";
          }

          if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
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

        // Write file to disk
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        imagePath = `/assets/uploads/infografis/${fileName}`;
      } catch (fileError) {
        console.error("❌ File upload error:", fileError);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    const data: InfografisUpdate = {
      title,
      ...(imagePath && { gambar_path: imagePath }),
    };

    const updatedInfografis = await InfografisDesaService.updateInfografis(
      infografisId,
      data
    );
    return NextResponse.json(updatedInfografis, { status: 200 });
  } catch (error) {
    console.error("❌ PUT /api/infografis/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update infografis" },
      { status: 500 }
    );
  }
}

// Delete infografis by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const infografisId = parseInt(params.id);
    if (isNaN(infografisId)) {
      return NextResponse.json(
        { error: "Invalid infografis ID" },
        { status: 400 }
      );
    }

    const existingInfografis = await InfografisDesaService.getInfografisById(
      infografisId
    );
    if (!existingInfografis) {
      return NextResponse.json(
        { error: "Infografis not found" },
        { status: 404 }
      );
    }

    // Delete associated image file if it exists
    if (existingInfografis.gambar_path) {
      let imagePath: string;

      if (existingInfografis.gambar_path.startsWith("/assets/")) {
        // ✅ path dari public (misal: /assets/uploads/articles/xxx.jpg)
        imagePath = path.join(
          process.cwd(),
          "public",
          existingInfografis.gambar_path
        );
      } else if (existingInfografis.gambar_path.startsWith("/uploads/")) {
        // ✅ path dari uploads (misal: /uploads/articles/xxx.jpg)
        imagePath = path.join(process.cwd(), existingInfografis.gambar_path);
      } else {
        imagePath = "";
      }

      if (imagePath && fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await InfografisDesaService.deleteInfografis(infografisId);
    return NextResponse.json(
      { message: "Infografis deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ DELETE /api/infografis/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete infografis" },
      { status: 500 }
    );
  }
}
