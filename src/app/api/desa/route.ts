import { NextResponse } from "next/server";
import { getAllDesa } from "@/lib/prisma-services/profileDesaService";

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
