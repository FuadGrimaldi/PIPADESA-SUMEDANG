import { NextRequest, NextResponse } from "next/server";
import { OfficialsService } from "@/lib/prisma-services/officialService";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const officials = await OfficialsService.getAllOfficials();
    return NextResponse.json(officials);
  } catch (error: any) {
    console.error("GET /api/officials error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Extract form fields
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const desa_id = formData.get("desa_id") as string;
    const display_order = formData.get("display_order") as string;
    const photoFile = formData.get("photo") as File | null;

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

    let photoPath: string | undefined;

    // Handle file upload
    if (photoFile && photoFile.size > 0) {
      try {
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

        // Write file
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        photoPath = `/assets/uploads/officials/${fileName}`;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 }
        );
      }
    }

    const officialData = {
      desa_id: parsedDesaId,
      name,
      position,
      display_order: parsedDisplayOrder,
      photo: photoPath || "/assets/default/default.png",
    };

    const official = await OfficialsService.createOfficial(officialData);
    return NextResponse.json(official, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/officials error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
