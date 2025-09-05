import { prisma } from "./prisma";
import { UserCreate, UserUpdate, Roles } from "@/types/user";
import bcrypt from "bcrypt";

export class UserDesaService {
  // Get all users
  static async getAllUsers() {
    return prisma.users.findMany({
      select: {
        id: true,
        desa_id: true,
        nik: true,
        username: true,
        full_name: true,
        email: true,
        role: true,
        status: true,
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
        full_name: true,
        username: true,
        email: true,
        role: true,
        status: true,
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
      const existingUser = await prisma.users.findUnique({
        where: { email: data.email },
      });
      if (existingUser) {
        throw new Error("Email sudah terdaftar");
      }
      const existingNik = await prisma.users.findFirst({
        where: {
          nik: data.nik,
        },
      });
      if (existingNik) {
        throw new Error("NIK sudah terdaftar");
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      const createData: any = {
        desa_id: data.desa_id ?? null,
        nik: data.nik,
        username: data.username,
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        role: data.role,
        status: data.status,
        created_at: new Date(),
        updated_at: new Date(),
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
      // Check for existing email or nik (excluding current user)
      const existingEmail = await prisma.users.findFirst({
        where: {
          email: data.email,
          NOT: { id },
        },
      });
      if (existingEmail) {
        throw new Error("Email sudah terdaftar");
      }
      const existingNik = await prisma.users.findFirst({
        where: {
          nik: data.nik,
          NOT: { id },
        },
      });
      if (existingNik) {
        throw new Error("NIK sudah terdaftar");
      }

      const updateData: any = {
        desa_id: data.desa_id ?? null,
        nik: data.nik,
        username: data.username,
        full_name: data.full_name,
        email: data.email,
        role: data.role,
        status: data.status,
        updated_at: new Date(),
      };
      if (
        data.password !== undefined &&
        data.password !== null &&
        data.password.trim() !== ""
      ) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        updateData.password = hashedPassword;
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
        full_name: true,
        role: true,
        status: true,
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
        full_name: true,
        nik: true,
        username: true,
        email: true,
        role: true,
        status: true,
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
