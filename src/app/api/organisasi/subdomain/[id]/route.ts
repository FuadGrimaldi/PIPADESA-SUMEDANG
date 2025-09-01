import { OrganisasiDesaService } from "@/lib/prisma-services/organisasiDesaService";
import { NextRequest, NextResponse } from "next/server";

// GET /api/organisasi/subdomain/:id desa_id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const desaId = Number(params.id);
    if (isNaN(desaId)) {
      return NextResponse.json(
        { error: "Invalid desa_id parameter" },
        { status: 400 }
      );
    }
    const organizations = await OrganisasiDesaService.getOrganizationsByDesaId(
      desaId
    );
    return NextResponse.json(organizations);
  } catch (error: any) {
    console.error("GET /api/organisasi/subdomain/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
