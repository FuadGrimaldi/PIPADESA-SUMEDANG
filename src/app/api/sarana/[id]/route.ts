import { SaranaDesaService } from "@/lib/prisma-services/saranaDesaService";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { SaranaUpdate, SaranaKategori, Status } from "@/types/sarana";

// get by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid sarana ID" }, { status: 400 });
    }

    const sarana = await SaranaDesaService.getSaranaById(id);
    if (!sarana) {
      return NextResponse.json({ error: "Sarana not found" }, { status: 404 });
    }

    return NextResponse.json(sarana);
  } catch (error: any) {
    console.error("GET /api/sarana/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// update sarana by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid sarana ID" }, { status: 400 });
    }
    const existingSarana = await SaranaDesaService.getSaranaById(id);
    if (!existingSarana) {
      return NextResponse.json({ error: "Sarana not found" }, { status: 404 });
    }
    const formData = await req.formData();
    const namaSarana = formData.get("nama_sarana") as string;
    const desaId = formData.get("desa_id") as string;
    const kategori = formData.get("kategori") as string;
    const deskripsi = formData.get("deskripsi") as string | null;
    const alamatLokasi = formData.get("alamat_lokasi") as string | null;
    const koordinatLat = formData.get("koordinat_lat") as string | null;
    const koordinatLong = formData.get("koordinat_long") as string | null;
    const status = formData.get("status") as string | null;
    const fotoFile = formData.get("foto_path") as File | null;
    // Validate required fields
    if (!namaSarana || !desaId || !kategori) {
      console.error("Missing required fields:", {
        namaSarana,
        desaId,
        kategori,
      });
      return NextResponse.json(
        { error: "Missing required fields: nama_sarana, desa_id, kategori" },
        { status: 400 }
      );
    }
    // Handle file upload
    let fotoPath: string | undefined = existingSarana.foto_path || undefined;
    if (fotoFile && fotoFile.size > 0) {
      try {
        const defaultImages = [
          "/assets/default/image-not-available.png",
          "/assets/default/default.jpg",
        ];
        if (
          existingSarana.foto_path &&
          !defaultImages.includes(existingSarana.foto_path)
        ) {
          // Delete old image if it exists
          const oldImagePath = path.join(
            process.cwd(),
            "public",
            existingSarana.foto_path
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        const bytes = await fotoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(fotoFile.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(
          process.cwd(),
          "public",
          "assets",
          "uploads",
          "sarana"
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write file to disk
        fotoPath = path.join(uploadDir, fileName);
        await writeFile(fotoPath, buffer);
        fotoPath = `/assets/uploads/sarana/${fileName}`;
      } catch (error) {
        console.error("Error saving foto file:", error);
        return NextResponse.json(
          { error: "Failed to upload foto file" },
          { status: 500 }
        );
      }
    }
    const updateData: SaranaUpdate = {
      nama_sarana: namaSarana,
      kategori: kategori as SaranaKategori,
      deskripsi: deskripsi || undefined,
      alamat_lokasi: alamatLokasi || undefined,
      koordinat_lat: koordinatLat || undefined,
      koordinat_long: koordinatLong || undefined,
      foto_path: fotoPath,
      status: (status as Status) || existingSarana.status,
    };
    const updatedSarana = await SaranaDesaService.updateSarana(id, updateData);
    return NextResponse.json(updatedSarana);
  } catch (error: any) {
    console.error("PUT /api/sarana/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// delete sarana by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid sarana ID" }, { status: 400 });
    }
    const existingSarana = await SaranaDesaService.getSaranaById(id);
    if (!existingSarana) {
      return NextResponse.json({ error: "Sarana not found" }, { status: 404 });
    }
    // Delete associated image if it exists and is not a default image
    const defaultImages = [
      "/assets/default/image-not-available.png",
      "/assets/default/default.jpg",
    ];
    if (
      existingSarana.foto_path &&
      !defaultImages.includes(existingSarana.foto_path)
    ) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        existingSarana.foto_path
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await SaranaDesaService.deleteSarana(id);
    return NextResponse.json({ message: "Sarana deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/sarana/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
