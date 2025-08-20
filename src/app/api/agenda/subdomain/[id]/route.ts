import { NextRequest, NextResponse } from "next/server";
import { AgendaDesaService } from "@/lib/prisma-services/agendaDesaService";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const desaId = parseInt(params.id);
    if (isNaN(desaId)) {
      return NextResponse.json({ error: "Invalid desa ID" }, { status: 400 });
    }
    const agenda = await AgendaDesaService.getAgendasByDesaId(desaId);

    return NextResponse.json(agenda);
  } catch (error: any) {
    console.error("GET /api/agenda/subdomain/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
