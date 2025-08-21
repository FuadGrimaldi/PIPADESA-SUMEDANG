import { OrganisasiDesaService } from "@/lib/prisma-services/organisasiDesaService";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const kategori = await OrganisasiDesaService.getCategoryByDesaId(
      Number(params.id)
    );
    if (!kategori) {
      return NextResponse.json(
        { error: "Kategori not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(kategori, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
