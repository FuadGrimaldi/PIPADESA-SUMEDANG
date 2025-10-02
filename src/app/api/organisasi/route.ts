import { OrganisasiDesaService } from "@/lib/prisma-services/organisasiDesaService";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const organizations = await OrganisasiDesaService.getAllOrganizations();
    return NextResponse.json(organizations);
  } catch (error: any) {
    console.error("GET /api/organisasi error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const namaOrganisasi = formData.get("nama_organisasi") as string;
    const desaId = formData.get("desa_id") as string;
    const kategoriId = formData.get("kategori_id") as string;
    const namaKetua = formData.get("nama_ketua") as string;
    const deskripsiKegiatan = formData.get("deskripsi_kegiatan") as string;
    const logoFile = formData.get("logo_path") as File | null;

    // Validate required fields
    if (!namaOrganisasi || !desaId || !kategoriId) {
      console.error("Missing required fields:", {
        namaOrganisasi,
        desaId,
        kategoriId,
      });
      return NextResponse.json(
        {
          error:
            "Missing required fields: nama_organisasi, desa_id, kategori_id",
        },
        { status: 400 }
      );
    }

    // Handle file upload
    let logoPath: string | undefined;
    if (logoFile && logoFile.size > 0) {
      try {
        const bytes = await logoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(logoFile.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "uploads", "organisasi");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write file
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        logoPath = `/assets/uploads/organisasi/${fileName}`;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 }
        );
      }
    }
    const organizationData = {
      nama_organisasi: namaOrganisasi,
      desa_id: parseInt(desaId),
      kategori_id: parseInt(kategoriId),
      nama_ketua: namaKetua,
      deskripsi_kegiatan: deskripsiKegiatan,
      logo_path: logoPath || "/assets/default/default.png",
    };
    const organization = await OrganisasiDesaService.createOrganization(
      organizationData
    );

    return NextResponse.json(organization, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/organisasi error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
