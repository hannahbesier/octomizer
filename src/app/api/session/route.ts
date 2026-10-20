import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId");

  if (!sessionId)
    return NextResponse.json(
      { error: "sessionId is required" },
      { status: 400 },
    );
  const isAuth = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  if (isAuth) {
    return NextResponse.json({ isAuth: true }, { status: 200 });
  }
  return NextResponse.json({ isAuth: false });
}
