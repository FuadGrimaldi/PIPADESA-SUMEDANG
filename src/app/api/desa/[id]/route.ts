import { NextResponse } from "next/server";
import {
  getDesaById,
  updateDesa,
  deleteDesa,
} from "@/lib/prisma-services/profileDesaService";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid desa ID" },
      { status: 400 }
    );
  }

  try {
    const desa = await getDesaById(id);
    if (!desa) {
      return NextResponse.json(
        { success: false, message: "desa not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: desa }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch desa", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid desa ID" },
        { status: 400 }
      );
    }

    // Check if desa exists
    const existingDesa = await getDesaById(id);
    if (!existingDesa) {
      return NextResponse.json({ error: "Desa not found" }, { status: 404 });
    }

    // Parse form data
    const formData = await req.formData();

    // Extract form fields
    const updateData: any = {};

    // Get all text fields from form data
    formData.forEach((value, key) => {
      if (key !== "foto_depan" && typeof value === "string") {
        if (key === "lat" || key === "lng") {
          // konversi ke float
          updateData[key] = value ? parseFloat(value) : null;
        } else {
          updateData[key] = value;
        }
      }
    });

    // Handle file upload
    const foto_depan = formData.get("foto_depan") as File | null;
    let imagePath: string | undefined = existingDesa.foto_depan || undefined;

    if (foto_depan && foto_depan.size > 0) {
      try {
        const defaultImages = [
          "/assets/default/image-not-available.png",
          "/assets/default/default.jpg",
        ];
        // Delete old image if it exists
        if (
          existingDesa.foto_depan &&
          !defaultImages.includes(existingDesa.foto_depan)
        ) {
          let imagePath: string;

          if (existingDesa.foto_depan.startsWith("/assets/")) {
            // ✅ path dari public (misal: /assets/uploads/articles/xxx.jpg)
            imagePath = path.join(
              process.cwd(),
              "public",
              existingDesa.foto_depan
            );
          } else if (existingDesa.foto_depan.startsWith("/uploads/")) {
            // ✅ path dari uploads (misal: /uploads/articles/xxx.jpg)
            imagePath = path.join(process.cwd(), existingDesa.foto_depan);
          } else {
            imagePath = "";
          }

          if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }

        // Process new image
        const bytes = await foto_depan.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(foto_depan.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "uploads", "profile-desa");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write file
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        // Update image path (fix path to match upload directory)
        imagePath = `/assets/uploads/profile-desa/${fileName}`;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 }
        );
      }
    }

    // Prepare final update data
    const finalUpdateData = {
      ...updateData,
      foto_depan: imagePath,
      updated_at: new Date(),
    };

    // Update desa
    const updatedDesa = await updateDesa(id, finalUpdateData);

    return NextResponse.json(
      {
        success: true,
        message: "Desa updated successfully",
        data: updatedDesa,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update desa error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal update desa",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid desa ID" },
      { status: 400 }
    );
  }

  try {
    // Check if desa exists
    const existingDesa = await getDesaById(id);
    if (!existingDesa) {
      return NextResponse.json(
        { success: false, message: "Desa not found" },
        { status: 404 }
      );
    }
    const defaultImages = [
      "/assets/default/image-not-available.png",
      "/assets/default/default.jpg",
    ];

    // Delete associated image file if exists
    if (
      existingDesa.foto_depan &&
      !defaultImages.includes(existingDesa.foto_depan)
    ) {
      let imagePath: string;

      if (existingDesa.foto_depan.startsWith("/assets/")) {
        // ✅ path dari public (misal: /assets/uploads/articles/xxx.jpg)
        imagePath = path.join(process.cwd(), "public", existingDesa.foto_depan);
      } else if (existingDesa.foto_depan.startsWith("/uploads/")) {
        // ✅ path dari uploads (misal: /uploads/articles/xxx.jpg)
        imagePath = path.join(process.cwd(), existingDesa.foto_depan);
      } else {
        imagePath = "";
      }

      if (imagePath && fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete desa from database
    const deletedDesa = await deleteDesa(id);

    return NextResponse.json(
      {
        success: true,
        message: "Desa deleted successfully",
        data: deletedDesa,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete desa error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete Desa",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
