import getSessionCookie from "@/lib/getSessionCookie";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
  const isAuth = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  if (isAuth) {
    return NextResponse.json({ isAuth: true }, { status: 200 });
  }
  return NextResponse.json({ isAuth: false });
}
