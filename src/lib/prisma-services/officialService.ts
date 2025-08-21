import { prisma } from "./prisma";
import { CreateOfficialData, UpdateOfficialData } from "@/types/official";

export class OfficialsService {
  // Get all officials
  static async getAllOfficials() {
    try {
      const officials = await prisma.officials.findMany({
        include: {
          profile_desa: {
            select: {
              id: true,
              nama_desa: true,
            },
          },
        },
        orderBy: {
          display_order: "asc",
        },
      });
      return officials;
    } catch (error) {
      throw new Error(`Failed to fetch officials: ${error}`);
    }
  }

  // Get officials by desa_id
  static async getOfficialsByDesaId(desa_id: number) {
    try {
      const officials = await prisma.officials.findMany({
        where: {
          desa_id: desa_id,
        },
        include: {
          profile_desa: {
            select: {
              id: true,
              nama_desa: true,
            },
          },
        },
        orderBy: {
          display_order: "asc",
        },
      });
      return officials;
    } catch (error) {
      throw new Error(`Failed to fetch officials by desa_id: ${error}`);
    }
  }

  // Get single official by id
  static async getOfficialById(id: number) {
    try {
      const official = await prisma.officials.findUnique({
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
      return official;
    } catch (error) {
      throw new Error(`Failed to fetch official: ${error}`);
    }
  }

  // Create new official - Fixed
  static async createOfficial(data: CreateOfficialData) {
    try {
      // Handle optional photo field
      const createData: any = {
        desa_id: data.desa_id,
        name: data.name,
        position: data.position,
        display_order: data.display_order,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Only add photo if it exists and is not undefined
      if (
        data.photo !== undefined &&
        data.photo !== null &&
        data.photo.trim() !== ""
      ) {
        createData.photo = data.photo;
      }

      const official = await prisma.officials.create({
        data: createData,
        include: {
          profile_desa: {
            select: {
              id: true,
              nama_desa: true,
            },
          },
        },
      });
      return official;
    } catch (error) {
      throw new Error(`Failed to create official: ${error}`);
    }
  }

  // Update official - Fixed
  static async updateOfficial(data: UpdateOfficialData) {
    try {
      const { id, ...updateData } = data;

      if (
        !data.name ||
        !data.position ||
        !data.desa_id ||
        data.display_order === undefined
      ) {
        throw new Error(
          "Missing required fields: name, position, desa_id, display_order"
        );
      }

      // Handle optional photo field
      const finalUpdateData: any = {
        desa_id: updateData.desa_id,
        name: updateData.name,
        position: updateData.position,
        display_order: updateData.display_order,
        updated_at: new Date(),
      };

      if (updateData.photo !== undefined) {
        if (updateData.photo === null || updateData.photo === "") {
          // Remove photo if explicitly set to null or empty
          finalUpdateData.photo = null;
        } else {
          finalUpdateData.photo = updateData.photo;
        }
      }

      const official = await prisma.officials.update({
        where: { id },
        data: finalUpdateData,
        include: {
          profile_desa: {
            select: {
              id: true,
              nama_desa: true,
            },
          },
        },
      });
      return official;
    } catch (error) {
      throw new Error(`Failed to update official: ${error}`);
    }
  }

  // Delete official
  static async deleteOfficial(id: number) {
    try {
      const official = await prisma.officials.delete({
        where: { id },
      });
      return official;
    } catch (error) {
      throw new Error(`Failed to delete official: ${error}`);
    }
  }

  // Get next display order
  static async getNextDisplayOrder(desa_id: number) {
    try {
      const lastOfficial = await prisma.officials.findFirst({
        where: { desa_id },
        orderBy: { display_order: "desc" },
      });
      return (lastOfficial?.display_order || 0) + 1;
    } catch (error) {
      throw new Error(`Failed to get next display order: ${error}`);
    }
  }
}
