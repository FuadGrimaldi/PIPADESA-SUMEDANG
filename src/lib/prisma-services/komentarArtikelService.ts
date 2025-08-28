import { prisma } from "./prisma";
import {
  Komentar,
  CreateKomentarData,
  UpdateKomentarData,
} from "@/types/komentar";

export class KomentarArtikelService {
  // Get all comments
  static async getAllKomentars() {
    try {
      const komentars = await prisma.komentar.findMany({
        orderBy: {
          created_at: "desc",
        },
      });
      return komentars;
    } catch (error) {
      throw new Error(`Failed to fetch comments: ${error}`);
    }
  }

  // Get comments by article_id
  static async getKomentarsByArticleId(article_id: number) {
    try {
      const komentars = await prisma.komentar.findMany({
        where: {
          article_id: article_id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return komentars;
    } catch (error) {
      throw new Error(`Failed to fetch comments by article_id: ${error}`);
    }
  }

  // Get single comment by id
  static async getKomentarById(id: number) {
    try {
      const komentar = await prisma.komentar.findUnique({
        where: { id },
      });
      return komentar;
    } catch (error) {
      throw new Error(`Failed to fetch comment by id: ${error}`);
    }
  }

  // Create a new comment
  static async createKomentar(data: CreateKomentarData) {
    try {
      const createData: any = {
        article_id: data.article_id,
        name: data.name,
        email: data.email,
        no_telp: data.no_telp,
        pesan: data.pesan,
        status: data.status || "Pending",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const newKomentar = await prisma.komentar.create({
        data: createData,
      });
      return newKomentar;
    } catch (error) {
      throw new Error(`Failed to create comment: ${error}`);
    }
  }

  // Update an existing comment
  static async updateKomentar(id: number, data: UpdateKomentarData) {
    try {
      const updatedKomentar = await prisma.komentar.update({
        where: { id },
        data,
      });
      return updatedKomentar;
    } catch (error) {
      throw new Error(`Failed to update comment: ${error}`);
    }
  }

  // Delete a comment
  static async deleteKomentar(id: number) {
    try {
      const deletedKomentar = await prisma.komentar.delete({
        where: { id },
      });
      return deletedKomentar;
    } catch (error) {
      throw new Error(`Failed to delete comment: ${error}`);
    }
  }
}
