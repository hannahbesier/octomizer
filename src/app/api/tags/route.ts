import getSessionCookie from "@/lib/getSessionCookie";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
  const tags = await prisma.tag.findMany();
  if (!tags) {
    return NextResponse.json({ error: "tags not found" }, { status: 404 });
  }
  return NextResponse.json(tags, { status: 200 });
}
