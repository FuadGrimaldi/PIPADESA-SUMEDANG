import { OrganisasiDesaService } from "@/lib/prisma-services/organisasiDesaService";
import { NextRequest, NextResponse } from "next/server";

// by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const category = await OrganisasiDesaService.getCategoryById(id);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error: any) {
    console.error("GET /api/organisasi/kategori/[id] error:", error);
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
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const existingCategory = await OrganisasiDesaService.getCategoryById(id);
    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const namaKategori = formData.get("nama_kategori") as string;
    const desaId = formData.get("desa_id") as string;

    // Validate required fields
    if (!namaKategori) {
      console.error("Missing required field: nama_kategori");
      return NextResponse.json(
        { error: "Missing required field: nama_kategori" },
        { status: 400 }
      );
    }

    const updateData = {
      nama_kategori: namaKategori,
      desa_id: parseInt(desaId),
    };
    const updatedCategory = await OrganisasiDesaService.updateCategory(
      id,
      updateData
    );

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/organisasi/kategori/[id] error:", error);
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
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const deletedCategory = await OrganisasiDesaService.deleteCategory(id);
    if (!deletedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/organisasi/kategori/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
