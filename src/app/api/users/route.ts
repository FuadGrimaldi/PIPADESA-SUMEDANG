import { UserDesaService } from "@/lib/prisma-services/userDesaService";
import { NextResponse, NextRequest } from "next/server";
import { Roles, Status } from "@/types/user";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const user = await UserDesaService.getUserById(Number(id));
  } else {
    const users = await UserDesaService.getAllUsers();
    return NextResponse.json(users, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const data = {
    desa_id: formData.get("desa_id") ? Number(formData.get("desa_id")) : null,
    nik: String(formData.get("nik")),
    full_name: String(formData.get("full_name")),
    username: String(formData.get("username")),
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    role: String(formData.get("role")) as Roles,
    status: String(formData.get("status")) as Status,
    created_at: new Date(),
    updated_at: new Date(),
  };
  try {
    const newUser = await UserDesaService.createUser(data);
    const { password, ...userWithoutPassword } = newUser;
    return NextResponse.json("create successfull", { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
