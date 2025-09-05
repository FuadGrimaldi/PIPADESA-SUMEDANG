import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { email, password } = body;

    // Cari pengguna berdasarkan email
    const user = await prisma.users.findUnique({
      where: { email },
    });

    // Jika pengguna tidak ditemukan
    if (!user) {
      return NextResponse.json(
        { message: "Email tidak ditemukan." },
        { status: 401 }
      );
    }

    // Verifikasi password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Kata sandi salah." },
        { status: 401 }
      );
    }

    // Login berhasil
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(
      { message: "Login berhasil.", user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat proses login." },
      { status: 500 }
    );
  }
};
