import { SaranaDesaService } from "@/lib/prisma-services/saranaDesaService";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import {
  SaranaCreate,
  SaranaKategori,
  Status,
  SaranaWisataUnggulan,
} from "@/types/sarana";

export async function GET() {
  try {
    const sarana = await SaranaDesaService.getAllSarana();
    return NextResponse.json(sarana);
  } catch (error: any) {
    console.error("GET /api/sarana error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// create new sarana
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const namaSarana = formData.get("nama_sarana") as string;
    const desaId = formData.get("desa_id") as string;
    const kategori = formData.get("kategori") as string;
    const deskripsi = formData.get("deskripsi") as string | null;
    const alamatLokasi = formData.get("alamat_lokasi") as string | null;
    const koordinatLat = formData.get("koordinat_lat") as string | null;
    const tipe = formData.get("tipe") as string;
    const unggulan = formData.get("unggulan") as string | null;
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
    let fotoPath: string | undefined;
    if (fotoFile && fotoFile.size > 0) {
      try {
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
          "sarana"
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Save file to disk
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        // Set the relative path to be saved in the database
        fotoPath = `/assets/sarana/${fileName}`;
      } catch (fileError) {
        console.error("File upload error:", fileError);
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 }
        );
      }
    }
    const saranaData: SaranaCreate = {
      nama_sarana: namaSarana,
      desa_id: parseInt(desaId),
      kategori: kategori as SaranaKategori, // ✅ aman
      deskripsi: deskripsi || "",

      alamat_lokasi: alamatLokasi || "",
      koordinat_lat: koordinatLat || "",
      unggulan: (unggulan as SaranaWisataUnggulan) || "N",
      koordinat_long: koordinatLong || "",
      status: (status as Status) || Status.pending, // fallback default
      foto_path: fotoPath || "/assets/default/image-not-available.png",
    };
    const newSarana = await SaranaDesaService.createSarana(saranaData);
    return NextResponse.json(newSarana, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/sarana error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
