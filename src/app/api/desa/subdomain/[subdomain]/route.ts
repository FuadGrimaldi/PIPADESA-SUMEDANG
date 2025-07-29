import { NextResponse } from "next/server";
import { getDesaBySubdomain } from "@/lib/prisma-services/profileDesaService";

export async function GET(
  req: Request,
  { params }: { params: { subdomain: string } }
) {
  const subdomain = params.subdomain;

  try {
    const desa = await getDesaBySubdomain(subdomain);
    if (!desa) {
      return NextResponse.json(
        { success: false, message: "desa not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: desa }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch desa", error },
      { status: 500 }
    );
  }
}
