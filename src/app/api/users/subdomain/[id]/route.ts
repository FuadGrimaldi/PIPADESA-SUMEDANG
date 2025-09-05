import { UserDesaService } from "@/lib/prisma-services/userDesaService";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }
  try {
    const user = await UserDesaService.getUsersByDesaId(id);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("GET /api/users/subdomain/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
