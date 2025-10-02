import { NextResponse } from "next/server";
import {
  getAllDesa,
  createDesa,
} from "@/lib/prisma-services/profileDesaService";
import { CreateDesa } from "@/types/desa";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const desa = await getAllDesa();
    return NextResponse.json({ success: true, data: desa }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch desa", error },
      { status: 500 }
    );
  }
}

// post desa
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    // Extract form fields
    const subdomain = formData.get("subdomain") as string;
    const nama_desa = formData.get("nama_desa") as string;
    const alamat = formData.get("alamat") as string;
    const telepon = formData.get("telepon") as string;
    const email = formData.get("email") as string;
    const foto_depan = formData.get("foto_depan") as File | null;
    const twitter = formData.get("twitter") as string;
    const instagram = formData.get("instagram") as string;
    const visi = formData.get("visi") as string;
    const misi = formData.get("misi") as string;
    const tujuan = formData.get("tujuan") as string;
    const sejarah = formData.get("sejarah") as string;
    const gmaps_embed_url = formData.get("gmaps_embed_url") as string;
    const lat = formData.get("lat") as string;
    const lng = formData.get("lng") as string;
    // Validation
    if (
      !subdomain ||
      !nama_desa ||
      !alamat ||
      !telepon ||
      !email ||
      !twitter ||
      !instagram ||
      !visi ||
      !misi ||
      !tujuan ||
      !sejarah ||
      !gmaps_embed_url
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    let imagePath: string | undefined;
    // Handle file upload
    if (foto_depan && foto_depan.size > 0) {
      try {
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
        imagePath = `/assets/uploads/profile-desa/${fileName}`;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 }
        );
      }
    }
    const desaData: CreateDesa = {
      subdomain,
      nama_desa,
      alamat,
      telepon,
      email,
      foto_depan: imagePath ?? "/assets/default/image-not-available.png",
      twitter,
      instagram,
      visi,
      misi,
      tujuan,
      sejarah,
      gmaps_embed_url,
      lat: lat ? parseFloat(lat) : null,
      lng: lng ? parseFloat(lng) : null,
    };
    // Call your service to create the desa
    // Assuming you have a function createDesa in your service
    const newDesa = await createDesa(desaData);
    // For demonstration, we'll just return the data
    return NextResponse.json(
      { success: true, message: "Desa created successfully", data: newDesa },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating desa:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create desa",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
