import { VideoDesaService } from "@/lib/prisma-services/videoDesaService";
import { NextResponse, NextRequest } from "next/server";

// GET /api/videos/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = parseInt(params.id, 10);
    const video = await VideoDesaService.getVideoById(videoId);
    if (video) {
      return NextResponse.json(video, { status: 200 });
    } else {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("❌ GET /api/videos/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// PUT /api/videos/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = parseInt(params.id, 10);
    const data = await request.json();
    const updatedVideo = await VideoDesaService.updateVideo(videoId, data);
    return NextResponse.json(updatedVideo, { status: 200 });
  } catch (error) {
    console.error("❌ PUT /api/videos/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// DELETE /api/videos/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = parseInt(params.id, 10);
    const result = await VideoDesaService.deleteVideo(videoId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("❌ DELETE /api/videos/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
