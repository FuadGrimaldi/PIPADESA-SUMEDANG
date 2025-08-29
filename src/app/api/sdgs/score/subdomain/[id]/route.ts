import { SdgsDesaService } from "@/lib/prisma-services/sdgsDesaService";
import { NextResponse, NextRequest } from "next/server";

// get by sdgsscore desa_id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const desaId = parseInt(params.id, 10);
    if (isNaN(desaId)) {
      return NextResponse.json({ error: "Invalid desa ID" }, { status: 400 });
    }
    const sdgsScores = await SdgsDesaService.getAllSdgsScoresByDesaId(desaId);
    return NextResponse.json(sdgsScores, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching SDG scores by desa ID:", error);
    return NextResponse.json(
      { message: "Failed to fetch SDG scores", error: String(error) },
      { status: 500 }
    );
  }
}
