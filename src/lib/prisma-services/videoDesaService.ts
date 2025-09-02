import { prisma } from "./prisma";
import { Video, VideoCreate, VideoUpdate } from "@/types/video";

export class VideoDesaService {
  // Get all videos
  static async getAllVideos() {
    return prisma.videos.findMany({
      orderBy: { uploaded_at: "desc" },
    });
  }

  // Create a new video
  static async createVideo(data: VideoCreate) {
    try {
      const createData: any = {
        desa_id: data.desa_id,
        title: data.title,
        deskripsi: data.deskripsi,
        embed_url: data.embed_url,
        categori: data.categori,
        uploaded_at: data.uploaded_at || new Date(),
        created_at: data.created_at || new Date(),
        updated_at: data.updated_at || new Date(),
      };
      const video = await prisma.videos.create({ data: createData });
      return video;
    } catch (error) {
      console.error("❌ Prisma createVideo error:", error);
      throw error;
    }
  }

  // Get a single video by id
  static async getVideoById(id: number) {
    return prisma.videos.findUnique({
      where: { id },
    });
  }
  // Update an existing video
  static async updateVideo(id: number, data: VideoUpdate) {
    try {
      const updateData: any = {};
      if (data.title !== undefined) {
        updateData.title = data.title;
      }
      if (data.deskripsi !== undefined) {
        updateData.deskripsi = data.deskripsi;
      }
      if (data.embed_url !== undefined) {
        updateData.embed_url = data.embed_url;
      }
      if (data.categori !== undefined) {
        updateData.categori = data.categori;
      }
      if (data.uploaded_at !== undefined) {
        updateData.uploaded_at = data.uploaded_at;
      }
      const video = await prisma.videos.update({
        where: { id },
        data: updateData,
      });
      return video;
    } catch (error) {
      console.error("❌ Prisma updateVideo error:", error);
      throw error;
    }
  }
  // Delete a video
  static async deleteVideo(id: number) {
    try {
      await prisma.videos.delete({
        where: { id },
      });
      return { message: "Video deleted successfully" };
    } catch (error) {
      console.error("❌ Prisma deleteVideo error:", error);
      throw error;
    }
  }
  // Get videos by desa_id
  static async getVideosByDesaId(desa_id: number) {
    return prisma.videos.findMany({
      where: { desa_id },
      include: {
        profile_desa: { select: { id: true, nama_desa: true } },
      },
      orderBy: { uploaded_at: "desc" },
    });
  }
}
