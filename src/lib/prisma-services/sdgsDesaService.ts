import { prisma } from "./prisma";
import {
  Sdgs,
  CreatSdgs,
  CreateSdgsScore,
  UpdateSdgs,
  UpdateSdgsScore,
} from "@/types/sdgs";

export class SdgsDesaService {
  // Get all SDGs
  static async getAllSdgs() {
    return prisma.sdgs.findMany({
      orderBy: { id: "asc" },
    });
  }
  // Create a new SDG
  static async createSdgs(data: CreatSdgs) {
    try {
      const createData: any = {
        title: data.title,
        image: data.image,
      };
      if (
        data.image !== undefined &&
        data.image !== null &&
        data.image.trim() !== ""
      ) {
        createData.image = data.image;
      }
      const sdgs = await prisma.sdgs.create({ data: createData });
      return sdgs;
    } catch (error) {
      console.error("❌ Prisma createSdgs error:", error);
      throw error;
    }
  }
  // Get a single SDG by id
  static async getSdgsById(id: number) {
    return prisma.sdgs.findUnique({
      where: { id },
    });
  }
  // Update an existing SDG
  static async updateSdgs(id: number, data: UpdateSdgs) {
    try {
      const updateData: any = {
        title: data.title,
        image: data.image,
      };
      if (data.title !== undefined) {
        updateData.title = data.title;
      }
      if (
        data.image !== undefined &&
        data.image !== null &&
        data.image.trim() !== ""
      ) {
        updateData.image = data.image;
      }
      const sdgs = await prisma.sdgs.update({
        where: { id },
        data: updateData,
      });
      return sdgs;
    } catch (error) {
      console.error("❌ Prisma updateSdgs error:", error);
      throw error;
    }
  }
  // Delete an SDG
  static async deleteSdgs(id: number) {
    try {
      await prisma.sdgs.delete({
        where: { id },
      });
      return { message: "SDG deleted successfully" };
    } catch (error) {
      console.error("❌ Prisma deleteSdgs error:", error);
      throw error;
    }
  }
  // Get all SDG scores for a specific desa
  static async getAllSdgsScoresByDesaId(desaId: number) {
    return prisma.sdgsscore.findMany({
      where: { desa_id: desaId }, // filter by desa_id
      include: {
        profile_desa: {
          select: {
            id: true,
            nama_desa: true,
          },
        },
        sdgs: {
          select: {
            id: true,
            title: true,
            image: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });
  }
  // Get all SDG scores
  static async getAllSdgsScores() {
    return prisma.sdgsscore.findMany({
      include: {
        profile_desa: {
          select: {
            id: true,
            nama_desa: true,
          },
        },
        sdgs: {
          select: {
            id: true,
            title: true,
            image: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });
  }
  // Create a new SDG score
  static async createSdgsScore(data: CreateSdgsScore) {
    try {
      const createData: any = {
        desa_id: data.desa_id,
        sdgs_id: data.sdgs_id,
        score: data.score,
        tahun: data.tahun,
      };
      const sdgsScore = await prisma.sdgsscore.create({ data: createData });
      return sdgsScore;
    } catch (error) {
      console.error("❌ Prisma createSdgsScore error:", error);
      throw error;
    }
  }
  // Update an existing SDG score
  static async updateSdgsScore(id: number, data: UpdateSdgsScore) {
    try {
      const updateData: any = {};
      if (data.desa_id !== undefined) {
        updateData.desa_id = data.desa_id;
      }
      if (data.sdgs_id !== undefined) {
        updateData.sdgs_id = data.sdgs_id;
      }
      if (data.score !== undefined) {
        updateData.score = data.score;
      }
      if (data.tahun !== undefined) {
        updateData.tahun = data.tahun;
      }
      const sdgsScore = await prisma.sdgsscore.update({
        where: { id },
        data: updateData,
      });
      return sdgsScore;
    } catch (error) {
      console.error("❌ Prisma updateSdgsScore error:", error);
      throw error;
    }
  }
  // Delete an SDG score
  static async deleteSdgsScore(id: number) {
    try {
      await prisma.sdgsscore.delete({
        where: { id },
      });
      return { message: "SDG score deleted successfully" };
    } catch (error) {
      console.error("❌ Prisma deleteSdgsScore error:", error);
      throw error;
    }
  }
  // Get a single SDG score by id
  static async getSdgsScoreById(id: number) {
    return prisma.sdgsscore.findUnique({
      where: { id },
      include: {
        profile_desa: {
          select: {
            id: true,
            nama_desa: true,
          },
        },
        sdgs: {
          select: {
            id: true,
            title: true,
            image: true,
          },
        },
      },
    });
  }
}
