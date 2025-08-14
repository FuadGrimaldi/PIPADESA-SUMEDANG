import { NextResponse } from "next/server";
import { OfficialsService } from "@/lib/prisma-services/officialService";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const official = await OfficialsService.getOfficialsByDesaId(
      Number(params.id)
    );
    if (!official) {
      return NextResponse.json(
        { error: "Official not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(official);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
