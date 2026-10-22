import getSessionCookie from "@/lib/getSessionCookie";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
  const users = await prisma.user.findMany({
    select: { id: true, name: true },
  });
  if (!users) {
    return NextResponse.json({ error: "users not found" }, { status: 200 });
  }
  return NextResponse.json(users, { status: 200 });
}
