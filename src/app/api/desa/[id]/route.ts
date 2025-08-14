import { NextResponse } from "next/server";
import {
  getDesaById,
  updateDesa,
  deleteDesa,
} from "@/lib/prisma-services/profileDesaService";

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
    const body = await req.json();
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid desa ID" },
        { status: 400 }
      );
    }
    const updatedDesa = await updateDesa(id, {
      ...body,
      updated_at: new Date(),
    });

    return NextResponse.json(updatedDesa);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal update desa" }, { status: 500 });
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
    const deletedUser = await deleteDesa(id);
    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "Desa not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Desa deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete Desa", error },
      { status: 500 }
    );
  }
}
