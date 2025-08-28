import { prisma } from "./prisma";
import {
  PengaduanAspirasiCreate,
  PengaduanAspirasiUpdate,
} from "@/types/pengaduanAspirasi";

export class PengaduanAspirasiService {
  // Get all pengaduan and aspirasi
  static async getAllPengaduanAspirasis() {
    try {
      const pengaduanAspirasis = await prisma.pengaduan_aspirasi.findMany({
        orderBy: {
          created_at: "desc",
        },
      });
      return pengaduanAspirasis;
    } catch (error) {
      throw new Error(`Failed to fetch pengaduan and aspirasi: ${error}`);
    }
  }

  // Get pengaduan and aspirasi by desa_id
  static async getPengaduanAspirasisByDesaId(desa_id: number) {
    try {
      const pengaduanAspirasis = await prisma.pengaduan_aspirasi.findMany({
        where: {
          desa_id: desa_id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return pengaduanAspirasis;
    } catch (error) {
      throw new Error(
        `Failed to fetch pengaduan and aspirasi by desa_id: ${error}`
      );
    }
  }

  // Get single pengaduan and aspirasi by id
  static async getPengaduanAspirasiById(id: number) {
    try {
      const pengaduanAspirasi = await prisma.pengaduan_aspirasi.findUnique({
        where: { id },
      });
      return pengaduanAspirasi;
    } catch (error) {
      throw new Error(`Failed to fetch pengaduan and aspirasi by id: ${error}`);
    }
  }

  // Create new pengaduan or aspirasi
  static async createPengaduanAspirasi(data: PengaduanAspirasiCreate) {
    try {
      const createData: any = {
        desa_id: data.desa_id,
        name: data.name,
        email: data.email,
        no_telp: data.no_telp,
        pesan: data.pesan,
        kategori: data.kategori,
        status: data.status || "pending", // default to Pending if not provided
        created_at: new Date(),
        updated_at: new Date(),
      };
      const newPengaduanAspirasi = await prisma.pengaduan_aspirasi.create({
        data: createData,
      });
      return newPengaduanAspirasi;
    } catch (error) {
      throw new Error(`Failed to create pengaduan or aspirasi: ${error}`);
    }
  }

  // Update existing pengaduan or aspirasi
  static async updatePengaduanAspirasi(
    id: number,
    data: PengaduanAspirasiUpdate
  ) {
    try {
      const updatedPengaduanAspirasi = await prisma.pengaduan_aspirasi.update({
        where: { id },
        data: {
          ...data,
          updated_at: new Date(),
        },
      });
      return updatedPengaduanAspirasi;
    } catch (error) {
      throw new Error(`Failed to update pengaduan or aspirasi: ${error}`);
    }
  }
  // Delete pengaduan or aspirasi
  static async deletePengaduanAspirasi(id: number) {
    try {
      const deletedPengaduanAspirasi = await prisma.pengaduan_aspirasi.delete({
        where: { id },
      });
      return deletedPengaduanAspirasi;
    } catch (error) {
      throw new Error(`Failed to delete pengaduan or aspirasi: ${error}`);
    }
  }
}
