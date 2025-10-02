import { NextRequest, NextResponse } from "next/server";
import { AgendaDesaService } from "@/lib/prisma-services/agendaDesaService";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { UpdateAgendaData, AgendaKategori, Status } from "@/types/agenda";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid agenda ID" }, { status: 400 });
    }

    const agenda = await AgendaDesaService.getAgendaById(id);
    if (!agenda) {
      return NextResponse.json({ error: "Agenda not found" }, { status: 404 });
    }

    return NextResponse.json(agenda);
  } catch (error: any) {
    console.error("GET /api/agenda/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid agenda ID" }, { status: 400 });
    }
    const existingAgenda = await AgendaDesaService.getAgendaById(id);
    if (!existingAgenda) {
      return NextResponse.json({ error: "Agenda not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const desa_id = formData.get("desa_id") as string;
    const judul = formData.get("judul") as string;
    const slug = formData.get("slug") as string;
    const kategori = formData.get("kategori") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const lokasi = formData.get("lokasi") as string;
    const waktu = formData.get("waktu") as string;
    const poster = formData.get("poster") as File | null;
    const created_by = formData.get("created_by") as string;
    const status = formData.get("status") as string;

    // Validation
    if (!desa_id || !judul || !slug || !kategori || !deskripsi || !waktu) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let posterPath: string | undefined = existingAgenda.poster || undefined;

    // Handle file upload
    if (poster && poster.size > 0) {
      const defaultImages = [
        "/assets/default/image-not-available.png",
        "/assets/default/default.jpg",
      ];
      try {
        if (
          existingAgenda.poster &&
          !defaultImages.includes(existingAgenda.poster)
        ) {
          let imagePath: string;

          if (existingAgenda.poster.startsWith("/assets/")) {
            // ✅ path dari public (misal: /assets/uploads/articles/xxx.jpg)
            imagePath = path.join(
              process.cwd(),
              "public",
              existingAgenda.poster
            );
          } else if (existingAgenda.poster.startsWith("/uploads/")) {
            // ✅ path dari uploads (misal: /uploads/articles/xxx.jpg)
            imagePath = path.join(process.cwd(), existingAgenda.poster);
          } else {
            imagePath = "";
          }

          if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
        const bytes = await poster.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(poster.name);
        const fileName = `${uniqueSuffix}${fileExtension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "uploads", "agenda");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write file to disk
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        posterPath = `/assets/uploads/agenda/${fileName}`;
      } catch (error) {
        console.error("Error uploading poster:", error);
        return NextResponse.json(
          { error: "Failed to upload poster" },
          { status: 500 }
        );
      }
    }
    const updateData: UpdateAgendaData = {
      desa_id: parseInt(desa_id),
      judul,
      slug,
      kategori: kategori as AgendaKategori,
      deskripsi,
      lokasi,
      waktu: new Date(waktu).toISOString(),
      poster: posterPath,
      created_by: parseInt(created_by),
      status: status as Status,
    };
    const updatedAgenda = await AgendaDesaService.updateAgenda(id, updateData);
    return NextResponse.json(updatedAgenda);
  } catch (error: any) {
    console.error("PUT /api/agenda/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid agenda ID" }, { status: 400 });
    }

    const existingAgenda = await AgendaDesaService.getAgendaById(id);
    if (!existingAgenda) {
      return NextResponse.json({ error: "Agenda not found" }, { status: 404 });
    }
    const defaultImages = [
      "/assets/default/image-not-available.png",
      "/assets/default/default.jpg",
    ];
    // Delete poster if it exists
    if (
      existingAgenda.poster &&
      !defaultImages.includes(existingAgenda.poster)
    ) {
      let imagePath: string;

      if (existingAgenda.poster.startsWith("/assets/")) {
        // ✅ path dari public (misal: /assets/uploads/articles/xxx.jpg)
        imagePath = path.join(process.cwd(), "public", existingAgenda.poster);
      } else if (existingAgenda.poster.startsWith("/uploads/")) {
        // ✅ path dari uploads (misal: /uploads/articles/xxx.jpg)
        imagePath = path.join(process.cwd(), existingAgenda.poster);
      } else {
        imagePath = "";
      }

      if (imagePath && fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await AgendaDesaService.deleteAgenda(id);
    return NextResponse.json({ message: "Agenda deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/agenda/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
