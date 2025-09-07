import { prisma } from "./prisma";
import {
  OrganisasiCreate,
  OrganisasiUpdate,
  KategoriOrganisasiCreate,
} from "@/types/organisasi";

export class OrganisasiDesaService {
  // Get all categories
  static async getAllCategories() {
    return prisma.kategori_organisasi.findMany({
      orderBy: { nama_kategori: "asc" },
      include: { profile_desa: { select: { id: true, nama_desa: true } } },
    });
  }
  // get categori by id
  static async getCategoryById(id: number) {
    return prisma.kategori_organisasi.findUnique({
      where: { id },
      include: { profile_desa: { select: { id: true, nama_desa: true } } },
    });
  }
  // get category by name
  static async getCategoryByName(nama_kategori: string) {
    return prisma.kategori_organisasi.findFirst({
      where: { nama_kategori },
      include: { profile_desa: { select: { id: true, nama_desa: true } } },
    });
  }
  static async getCategoryByDesaId(desa_id: number) {
    return prisma.kategori_organisasi.findMany({
      where: { desa_id },
      orderBy: { nama_kategori: "asc" },
      include: { profile_desa: { select: { id: true, nama_desa: true } } },
    });
  }
  // Create a new category
  static async createCategory(data: KategoriOrganisasiCreate) {
    try {
      const newCategory = await prisma.kategori_organisasi.create({
        data: {
          nama_kategori: data.nama_kategori,
          desa_id: data.desa_id, // Ensure desa_id is included
        },
      });
      return newCategory;
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error(`Failed to create category: ${error}`);
    }
  }
  // Update an existing category
  static async updateCategory(id: number, data: KategoriOrganisasiCreate) {
    try {
      const updatedCategory = await prisma.kategori_organisasi.update({
        where: { id },
        data: {
          nama_kategori: data.nama_kategori,
          desa_id: data.desa_id, // Ensure desa_id is included
        },
      });
      return updatedCategory;
    } catch (error) {
      console.error("Error updating category:", error);
      throw new Error(`Failed to update category: ${error}`);
    }
  }

  // Delete a category
  static async deleteCategory(id: number) {
    try {
      const deletedCategory = await prisma.kategori_organisasi.delete({
        where: { id },
      });
      return deletedCategory;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw new Error(`Failed to delete category: ${error}`);
    }
  }
  // Get all organizations
  static async getAllOrganizations() {
    try {
      const organizations = await prisma.organisasi.findMany({
        include: {
          profile_desa: {
            select: {
              id: true,
              nama_desa: true,
            },
          },
          kategori_organisasi: {
            select: {
              id: true,
              nama_kategori: true,
            },
          },
        },
        orderBy: {
          nama_organisasi: "asc",
        },
      });
      return organizations;
    } catch (error) {
      throw new Error(`Failed to fetch organizations: ${error}`);
    }
  }

  // Get organization by ID
  static async getOrganizationById(id: number) {
    try {
      const organization = await prisma.organisasi.findUnique({
        where: { id },
        include: {
          profile_desa: {
            select: {
              id: true,
              nama_desa: true,
            },
          },
          kategori_organisasi: {
            select: {
              id: true,
              nama_kategori: true,
            },
          },
        },
      });
      return organization;
    } catch (error) {
      throw new Error(`Failed to fetch organization by ID: ${error}`);
    }
  }
  // Get organizations by desa_id
  static async getOrganizationsByDesaId(desa_id: number) {
    try {
      const organizations = await prisma.organisasi.findMany({
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
          kategori_organisasi: {
            select: {
              id: true,
              nama_kategori: true,
            },
          },
        },
        orderBy: {
          nama_organisasi: "asc",
        },
      });
      return organizations;
    } catch (error) {
      throw new Error(`Failed to fetch organizations by desa_id: ${error}`);
    }
  }
  // Create a new organization
  static async createOrganization(data: OrganisasiCreate) {
    try {
      // Validate required fields
      if (!data.nama_organisasi || !data.desa_id || !data.kategori_id) {
        throw new Error(
          "Required fields are missing: nama_organisasi, desa_id, kategori_id"
        );
      }

      // Check if desa exists
      const desaExists = await prisma.profile_desa.findUnique({
        where: { id: data.desa_id },
      });

      if (!desaExists) {
        throw new Error(`Desa with ID ${data.desa_id} not found`);
      }

      // Check if kategori exists
      const kategoriExists = await prisma.kategori_organisasi.findUnique({
        where: { id: data.kategori_id },
      });

      if (!kategoriExists) {
        throw new Error(`Kategori with ID ${data.kategori_id} not found`);
      }

      // Create organization data with proper typing
      const createData: any = {
        nama_organisasi: data.nama_organisasi,
        desa_id: data.desa_id,
        kategori_id: data.kategori_id,
        nama_ketua: data.nama_ketua,
        deskripsi_kegiatan: data.deskripsi_kegiatan,
        logo_path: data.logo_path,
      };
      if (
        data.logo_path !== undefined &&
        data.logo_path !== null &&
        data.logo_path.trim() !== ""
      ) {
        createData.logo_path = data.logo_path;
      }

      const newOrganization = await prisma.organisasi.create({
        data: createData,
        include: {
          profile_desa: {
            select: {
              id: true,
              nama_desa: true,
            },
          },
          kategori_organisasi: {
            select: {
              id: true,
              nama_kategori: true,
            },
          },
        },
      });

      return newOrganization;
    } catch (error) {
      console.error("Error creating organization:", error);
      throw new Error(`Failed to create organization: ${error}`);
    }
  }
  // Update an existing organization
  static async updateOrganization(id: number, data: OrganisasiUpdate) {
    try {
      const createData: any = {
        nama_organisasi: data.nama_organisasi,
        desa_id: data.desa_id,
        kategori_id: data.kategori_id,
        nama_ketua: data.nama_ketua,
        deskripsi_kegiatan: data.deskripsi_kegiatan,
        logo_path: data.logo_path,
      };
      if (
        data.logo_path !== undefined &&
        data.logo_path !== null &&
        data.logo_path.trim() !== ""
      ) {
        createData.logo_path = data.logo_path;
      }
      const updatedOrganization = await prisma.organisasi.update({
        where: { id },
        data: createData,
      });
      return updatedOrganization;
    } catch (error) {
      throw new Error(`Failed to update organization: ${error}`);
    }
  }
  // Delete an organization
  static async deleteOrganization(id: number) {
    try {
      const deletedOrganization = await prisma.organisasi.delete({
        where: { id },
      });
      return deletedOrganization;
    } catch (error) {
      throw new Error(`Failed to delete organization: ${error}`);
    }
  }
  static async searchOrgansasi(
    query: string,
    desa_id: number,
    kategori_id?: string,
    page: number = 1,
    limit: number = 10
  ) {
    const skip = (page - 1) * limit;

    const whereClause: any = { desa_id };

    if (query && query.trim() !== "") {
      whereClause.OR = [
        { nama_organisasi: { contains: query } },
        { nama_ketua: { contains: query } },
        { deskripsi_kegiatan: { contains: query } },
      ];
    }

    if (kategori_id && kategori_id.trim() !== "") {
      whereClause.kategori_id = Number(kategori_id);
    }

    return prisma.organisasi.findMany({
      where: whereClause,
      skip,
      take: limit,

      include: {
        profile_desa: {
          select: { id: true, nama_desa: true },
        },
        kategori_organisasi: {
          select: { id: true, nama_kategori: true },
        },
      },
    });
  }
}
