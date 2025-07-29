import { NextRequest, NextResponse } from "next/server";
import { register } from "@/lib/prisma-services/authService";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    // Validasi input
    if (!body.username) {
      return NextResponse.json({
        status: 500,
        message: "Username tidak boleh kosong",
      });
    }

    if (!body.email) {
      return NextResponse.json({
        status: 500,
        message: "Email tidak boleh kosong",
      });
    }

    if (!body.password) {
      return NextResponse.json({
        status: 500,
        message: "Password tidak boleh kosong",
      });
    }

    // Register user
    const res = await register(body);

    // Response sukses
    return NextResponse.json({
      status: 201,
      message: "User berhasil didaftarkan",
      data: res,
    });
  } catch (error) {
    // Response error internal
    return NextResponse.json({
      status: 500,
      message: "Terjadi kesalahan saat mendaftarkan pengguna",
    });
  }
};
