import { SdgsDesaService } from "@/lib/prisma-services/sdgsDesaService";
import { NextResponse, NextRequest } from "next/server";

// create sdgsscore
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { desa_id, sdgs_id, score, tahun } = body;
    if (
      typeof desa_id !== "number" ||
      typeof sdgs_id !== "number" ||
      typeof score !== "number" ||
      typeof tahun !== "number"
    ) {
      return NextResponse.json(
        { error: "desa_id, sdgs_id, score, and tahun must be numbers" },
        { status: 400 }
      );
    }
    const newSdgsScore = await SdgsDesaService.createSdgsScore({
      desa_id,
      sdgs_id,
      score,
      tahun,
    });
    return NextResponse.json(newSdgsScore, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating SDG score:", error);
    return NextResponse.json(
      { message: "Failed to create SDG score", error: String(error) },
      { status: 500 }
    );
  }
}
