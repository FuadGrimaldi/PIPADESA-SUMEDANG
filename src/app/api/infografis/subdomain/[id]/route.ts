import { NextRequest, NextResponse } from "next/server";
import { InfografisDesaService } from "@/lib/prisma-services/infografisDesaService";

// get by id desa
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const desaId = parseInt(params.id);
    if (isNaN(desaId)) {
      return NextResponse.json({ error: "Invalid desa ID" }, { status: 400 });
    }

    const infografis = await InfografisDesaService.getInfografisByDesaId(
      desaId
    );
    return NextResponse.json(infografis, { status: 200 });
  } catch (error) {
    console.error("❌ GET /api/infografis/subdomain/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch infografis" },
      { status: 500 }
    );
  }
}
