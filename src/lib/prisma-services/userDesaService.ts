import { prisma } from "./prisma";
import { UserCreate, UserUpdate, Roles } from "@/types/user";

export class UserDesaService {
  // Get all users
  static async getAllUsers() {
    return prisma.users.findMany({
      select: {
        id: true,
        desa_id: true,
        nik: true,
        username: true,
        email: true,
        role: true,
        profile_desa: {
          select: {
            id: true,
            nama_desa: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });
  }

  // get user by id
  static async getUserById(id: number) {
    return prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        desa_id: true,
        nik: true,
        username: true,
        email: true,
        role: true,
        profile_desa: {
          select: {
            id: true,
            nama_desa: true,
          },
        },
      },
    });
  }

  // Create a new user
  static async createUser(data: UserCreate) {
    try {
      const createData: any = {
        desa_id: data.desa_id ?? null,
        nik: data.nik,
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      const user = await prisma.users.create({ data: createData });
      return user;
    } catch (error) {
      console.error("❌ Prisma createUser error:", error);
      throw error;
    }
  }

  // Update an existing user
  static async updateUser(id: number, data: UserUpdate) {
    try {
      const updateData: any = {
        desa_id: data.desa_id ?? null,
        nik: data.nik,
        username: data.username,
        email: data.email,
        role: data.role,
      };
      if (
        data.password !== undefined &&
        data.password !== null &&
        data.password.trim() !== ""
      ) {
        updateData.password = data.password;
      }
      const user = await prisma.users.update({
        where: { id },
        data: updateData,
      });
      return user;
    } catch (error) {
      console.error("❌ Prisma updateUser error:", error);
      throw error;
    }
  }
  // Delete a user
  static async deleteUser(id: number) {
    try {
      return await prisma.users.delete({
        where: { id },
      });
    } catch (error) {
      console.error("❌ Prisma deleteUser error:", error);
      throw error;
    }
  }
  // Get users by role

  static async getUsersByRole(role: Roles) {
    return prisma.users.findMany({
      where: { role: role as any }, // Cast to any or $Enums.Role if imported
      select: {
        id: true,
        desa_id: true,
        nik: true,
        username: true,
        email: true,
        role: true,
        profile_desa: {
          select: {
            id: true,
            nama_desa: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });
  }
  // get user by desa id
  static async getUsersByDesaId(desa_id: number) {
    return prisma.users.findMany({
      where: { desa_id },
      select: {
        id: true,
        desa_id: true,
        nik: true,
        username: true,
        email: true,
        role: true,
        profile_desa: {
          select: {
            id: true,
            nama_desa: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });
  }
}
