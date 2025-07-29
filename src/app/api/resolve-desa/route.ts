import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const host = req.headers.get("host") || "";
  const subdomain = host.split(".")[0];

  // Redirect to the landing page route that matches the file structure
  const redirectUrl = new URL(`/${subdomain}`, `${url.protocol}//${host}`);
  return NextResponse.redirect(redirectUrl.toString());
}
