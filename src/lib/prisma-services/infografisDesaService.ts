import { prisma } from "./prisma";
import {
  Infografis,
  InfografisCreate,
  InfografisUpdate,
} from "@/types/infografis";

export class InfografisDesaService {
  // Get all infografis
  static async getAllInfografis() {
    return prisma.infografis.findMany({
      include: {
        profile_desa: {
          select: {
            id: true,
            nama_desa: true,
          },
        },
      },
      orderBy: { id: "desc" },
    });
  }

  // Create a new infografis
  static async createInfografis(data: InfografisCreate) {
    try {
      const createData: any = {
        desa_id: data.desa_id,
        title: data.title,
        gambar_path: data.gambar_path,
      };

      if (
        data.gambar_path !== undefined &&
        data.gambar_path !== null &&
        data.gambar_path.trim() !== ""
      ) {
        createData.gambar_path = data.gambar_path;
      }

      const infografis = await prisma.infografis.create({ data: createData });
      return infografis;
    } catch (error) {
      console.error("❌ Prisma createInfografis error:", error);
      throw error;
    }
  }

  // Get infografis by desaId
  static async getInfografisByDesaId(desaId: number) {
    return prisma.infografis.findMany({
      where: { desa_id: desaId },
      orderBy: { id: "desc" },
    });
  }

  // Update an existing infografis
  static async updateInfografis(id: number, data: InfografisUpdate) {
    try {
      const updateData: any = {};
      if (data.title !== undefined) updateData.title = data.title;
      if (data.gambar_path !== undefined)
        updateData.gambar_path = data.gambar_path;

      const infografis = await prisma.infografis.update({
        where: { id },
        data: updateData,
      });
      return infografis;
    } catch (error) {
      console.error("❌ Prisma updateInfografis error:", error);
      throw error;
    }
  }

  // Delete an infografis
  static async deleteInfografis(id: number) {
    try {
      const infografis = await prisma.infografis.delete({
        where: { id },
      });
      return infografis;
    } catch (error) {
      console.error("❌ Prisma deleteInfografis error:", error);
      throw error;
    }
  }
  // Get infografis by id
  static async getInfografisById(id: number): Promise<Infografis | null> {
    return prisma.infografis.findUnique({
      where: { id },
    });
  }
}
