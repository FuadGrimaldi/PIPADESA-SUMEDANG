import { SdgsDesaService } from "@/lib/prisma-services/sdgsDesaService";
import { NextResponse, NextRequest } from "next/server";

// get by sdgsscore id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sdgsScoreId = parseInt(params.id, 10);
    if (isNaN(sdgsScoreId)) {
      return NextResponse.json(
        { error: "Invalid SDG score ID" },
        { status: 400 }
      );
    }
    const sdgsScore = await SdgsDesaService.getSdgsScoreById(sdgsScoreId);
    if (!sdgsScore) {
      return NextResponse.json(
        { error: "SDG score not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(sdgsScore, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching SDG score by ID:", error);
    return NextResponse.json(
      { message: "Failed to fetch SDG score", error: String(error) },
      { status: 500 }
    );
  }
}

// update sdgsscore
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sdgsScoreId = parseInt(params.id, 10);
    if (isNaN(sdgsScoreId)) {
      return NextResponse.json(
        { error: "Invalid SDG score ID" },
        { status: 400 }
      );
    }
    const body = await request.json();
    const { desa_id, sdgs_id, score, tahun } = body;
    const updateData: any = {};
    if (desa_id !== undefined) {
      if (typeof desa_id !== "number") {
        return NextResponse.json(
          { error: "desa_id must be a number" },
          { status: 400 }
        );
      }
      updateData.desa_id = desa_id;
    }
    if (sdgs_id !== undefined) {
      if (typeof sdgs_id !== "number") {
        return NextResponse.json(
          { error: "sdgs_id must be a number" },
          { status: 400 }
        );
      }
      updateData.sdgs_id = sdgs_id;
    }
    if (score !== undefined) {
      if (typeof score !== "number") {
        return NextResponse.json(
          { error: "score must be a number" },
          { status: 400 }
        );
      }
      updateData.score = score;
    }
    if (tahun !== undefined) {
      if (typeof tahun !== "number") {
        return NextResponse.json(
          { error: "tahun must be a number" },
          { status: 400 }
        );
      }
      updateData.tahun = tahun;
    }
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }
    const updatedSdgsScore = await SdgsDesaService.updateSdgsScore(
      sdgsScoreId,
      updateData
    );
    return NextResponse.json(updatedSdgsScore, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating SDG score:", error);
    return NextResponse.json(
      { message: "Failed to update SDG score", error: String(error) },
      { status: 500 }
    );
  }
}

// delete sdgsscore
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sdgsScoreId = parseInt(params.id, 10);
    if (isNaN(sdgsScoreId)) {
      return NextResponse.json(
        { error: "Invalid SDG score ID" },
        { status: 400 }
      );
    }
    await SdgsDesaService.deleteSdgsScore(sdgsScoreId);
    return NextResponse.json(
      { message: "SDG score deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting SDG score:", error);
    return NextResponse.json(
      { message: "Failed to delete SDG score", error: String(error) },
      { status: 500 }
    );
  }
}
