import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId");
  if (!sessionId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }
  const userId = await prisma.session.findUnique({
    where: { id: sessionId },
    select: { userId: true },
  });
  if (!userId) {
    return NextResponse.json(
      { message: "No session like this" },
      { status: 401 },
    );
  }
  const user = await prisma.user.findUnique({
    where: { id: Number(userId.userId) },
    select: { id: true, name: true },
  });

  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}
