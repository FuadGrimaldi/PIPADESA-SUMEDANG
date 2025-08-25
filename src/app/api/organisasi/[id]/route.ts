import { OrganisasiDesaService } from "@/lib/prisma-services/organisasiDesaService";
import { NextRequest, NextResponse } from "next/server";
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
      return NextResponse.json(
        { error: "Invalid organization ID" },
        { status: 400 }
      );
    }

    const organization = await OrganisasiDesaService.getOrganizationById(id);
    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(organization);
  } catch (error: any) {
    console.error("GET /api/organisasi/[id] error:", error);
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
      return NextResponse.json(
        { error: "Invalid organization ID" },
        { status: 400 }
      );
    }

    const existingOrganization =
      await OrganisasiDesaService.getOrganizationById(id);
    if (!existingOrganization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

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
    let logoPath: string | undefined =
      existingOrganization.logo_path || undefined;
    if (logoFile && logoFile.size > 0) {
      try {
        const defaultImages = [
          "/assets/default/image-not-available.png",
          "/assets/default/default.jpg",
        ];
        if (
          existingOrganization.logo_path &&
          !defaultImages.includes(existingOrganization.logo_path)
        ) {
          // Delete old image if it exists
          const oldImagePath = path.join(
            process.cwd(),
            "public",
            existingOrganization.logo_path
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        const bytes = await logoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(logoFile.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(
          process.cwd(),
          "public",
          "assets",
          "uploads",
          "organisasi"
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write file to disk
        logoPath = path.join(uploadDir, fileName);
        await writeFile(logoPath, buffer);
        logoPath = `/assets/uploads/organisasi/${fileName}`;
      } catch (error) {
        console.error("Error saving logo file:", error);
        return NextResponse.json(
          { error: "Failed to upload logo file" },
          { status: 500 }
        );
      }
    }
    // Prepare update data
    const updateData: any = {
      nama_organisasi: namaOrganisasi,
      desa_id: parseInt(desaId),
      kategori_id: parseInt(kategoriId),
      nama_ketua: namaKetua,
      deskripsi_kegiatan: deskripsiKegiatan,
      logo_path: logoPath || "/assets/default/default.png",
    };
    // Update organization
    const updatedOrganization = await OrganisasiDesaService.updateOrganization(
      id,
      updateData
    );
    return NextResponse.json(updatedOrganization, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/organisasi/[id]error:", error);
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
      return NextResponse.json(
        { error: "Invalid organization ID" },
        { status: 400 }
      );
    }

    const existingOrganization =
      await OrganisasiDesaService.getOrganizationById(id);
    if (!existingOrganization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }
    await OrganisasiDesaService.deleteOrganization(id);
    if (existingOrganization.logo_path) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        existingOrganization.logo_path
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return NextResponse.json({ message: "Organization deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/organisasi/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
