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
  const states = await prisma.state.findMany();
  if (!states) {
    return NextResponse.json({ error: "states not found" }, { status: 404 });
  }
  return NextResponse.json(states, { status: 200 });
}
