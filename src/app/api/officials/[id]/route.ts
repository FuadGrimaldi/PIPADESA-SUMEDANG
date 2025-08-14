import { NextRequest, NextResponse } from "next/server";
import { OfficialsService } from "@/lib/prisma-services/officialService";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("PUT /api/officials/[id] - Starting request");

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid official ID" },
        { status: 400 }
      );
    }

    // Get current official data to check for existing photo
    const currentOfficial = await OfficialsService.getOfficialById(id);
    if (!currentOfficial) {
      return NextResponse.json(
        { error: "Official not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    // Extract form fields
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const desa_id = formData.get("desa_id") as string;
    const display_order = formData.get("display_order") as string;
    const photoFile = formData.get("photo") as File | null;

    console.log("Form data received:", {
      name,
      position,
      desa_id,
      display_order,
      photoFile: photoFile?.name || "No file",
    });

    // Validation
    if (!name || !position || !desa_id || !display_order) {
      console.error("Missing required fields:", {
        name,
        position,
        desa_id,
        display_order,
      });
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, position, desa_id, display_order",
        },
        { status: 400 }
      );
    }

    // Parse numbers
    const parsedDesaId = parseInt(desa_id);
    const parsedDisplayOrder = parseInt(display_order);

    if (isNaN(parsedDesaId) || isNaN(parsedDisplayOrder)) {
      console.error("Invalid number fields:", { desa_id, display_order });
      return NextResponse.json(
        { error: "desa_id and display_order must be valid numbers" },
        { status: 400 }
      );
    }

    let photoPath: string | undefined = currentOfficial.photo || undefined;

    // Handle file upload
    if (photoFile && photoFile.size > 0) {
      try {
        // Delete old photo if exists
        if (currentOfficial.photo) {
          const oldPhotoPath = path.join(
            process.cwd(),
            "public",
            currentOfficial.photo
          );
          if (fs.existsSync(oldPhotoPath)) {
            console.log("Deleting old photo:", oldPhotoPath);
            fs.unlinkSync(oldPhotoPath);
          }
        }

        const bytes = await photoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(photoFile.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(
          process.cwd(),
          "public",
          "assets",
          "uploads",
          "officials"
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write new file
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        photoPath = `/assets/uploads/officials/${fileName}`;
        console.log("New file uploaded successfully:", photoPath);
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 }
        );
      }
    }

    const updateData = {
      id,
      desa_id: parsedDesaId,
      name,
      position,
      display_order: parsedDisplayOrder,
      photo: photoPath,
    };

    console.log("Updating official with data:", updateData);

    const updatedOfficial = await OfficialsService.updateOfficial(updateData);

    console.log("Official updated successfully:", updatedOfficial);
    return NextResponse.json(updatedOfficial, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/officials/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid official ID" },
        { status: 400 }
      );
    }

    // Get current official data to delete photo
    const currentOfficial = await OfficialsService.getOfficialById(id);
    if (!currentOfficial) {
      return NextResponse.json(
        { error: "Official not found" },
        { status: 404 }
      );
    }

    // Delete photo file if exists
    if (currentOfficial.photo) {
      const photoPath = path.join(
        process.cwd(),
        "public",
        currentOfficial.photo
      );
      if (fs.existsSync(photoPath)) {
        console.log("Deleting photo:", photoPath);
        fs.unlinkSync(photoPath);
      }
    }

    // Delete from database
    await OfficialsService.deleteOfficial(id);

    console.log("Official deleted successfully:", id);
    return NextResponse.json({ message: "Official deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/officials/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid official ID" },
        { status: 400 }
      );
    }

    const official = await OfficialsService.getOfficialById(id);
    if (!official) {
      return NextResponse.json(
        { error: "Official not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(official);
  } catch (error: any) {
    console.error("GET /api/officials/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
