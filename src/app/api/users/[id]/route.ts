import { UserDesaService } from "@/lib/prisma-services/userDesaService";
import { NextResponse, NextRequest } from "next/server";
import { Roles, Status } from "@/types/user";

// api by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  try {
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }
    const user = await UserDesaService.getUserById(id);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("GET /api/users/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }
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
  };
  try {
    const updatedUser = await UserDesaService.updateUser(id, data);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("PUT /api/users/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }
  try {
    await UserDesaService.deleteUser(id);
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/users/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
