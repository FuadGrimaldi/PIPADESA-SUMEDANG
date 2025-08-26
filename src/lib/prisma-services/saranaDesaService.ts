import { prisma } from "./prisma";
import {
  SaranaCreate,
  SaranaUpdate,
  SaranaKategori,
  Status,
} from "@/types/sarana";

export class SaranaDesaService {
  // Get all sarana
  static async getAllSarana() {
    return prisma.sarana_prasarana.findMany({
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

  // Create a new sarana
  static async createSarana(data: SaranaCreate) {
    try {
      const createData: any = {
        desa_id: data.desa_id,
        kategori: data.kategori,
        nama_sarana: data.nama_sarana,
        deskripsi: data.deskripsi,
        alamat_lokasi: data.alamat_lokasi,
        foto_path: data.foto_path,
        koordinat_lat: data.koordinat_lat,
        koordinat_long: data.koordinat_long,
      };

      if (
        data.foto_path !== undefined &&
        data.foto_path !== null &&
        data.foto_path.trim() !== ""
      ) {
        createData.foto_path = data.foto_path;
      }

      // Set default status to 'pending' if not provided
      createData.status = data.status || Status.pending;

      const sarana = await prisma.sarana_prasarana.create({ data: createData });
      return sarana;
    } catch (error) {
      console.error("❌ Prisma createSarana error:", error);
      throw error;
    }
  }
  // Get sarana by ID
  static async getSaranaById(id: number) {
    return prisma.sarana_prasarana.findUnique({
      where: { id },
      include: {
        profile_desa: {
          select: {
            id: true,
            nama_desa: true,
          },
        },
      },
    });
  }

  // Get sarana by desaId and optional kategori filter
  static async getSaranaByDesaId(desaId: number) {
    return prisma.sarana_prasarana.findMany({
      where: { desa_id: desaId },
      orderBy: { id: "desc" },
    });
  }

  // Update an existing sarana
  static async updateSarana(id: number, data: SaranaUpdate) {
    try {
      const updateData: any = {};
      if (data.kategori !== undefined) updateData.kategori = data.kategori;
      if (data.nama_sarana !== undefined)
        updateData.nama_sarana = data.nama_sarana;
      if (data.deskripsi !== undefined) updateData.deskripsi = data.deskripsi;
      if (data.alamat_lokasi !== undefined)
        updateData.alamat_lokasi = data.alamat_lokasi;
      if (data.koordinat_lat !== undefined)
        updateData.koordinat_lat = data.koordinat_lat;
      if (data.koordinat_long !== undefined)
        updateData.koordinat_long = data.koordinat_long;
      if (
        data.foto_path !== undefined &&
        data.foto_path !== null &&
        data.foto_path.trim() !== ""
      ) {
        updateData.foto_path = data.foto_path;
      }
      if (data.status !== undefined) updateData.status = data.status;
      const sarana = await prisma.sarana_prasarana.update({
        where: { id },
        data: updateData,
      });
      return sarana;
    } catch (error) {
      console.error("❌ Prisma updateSarana error:", error);
      throw error;
    }
  }
  // Delete a sarana
  static async deleteSarana(id: number) {
    return prisma.sarana_prasarana.delete({
      where: { id },
    });
  }
}
