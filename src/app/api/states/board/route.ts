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
  const board = await prisma.state.findMany({
    select: {
      id: true,
      name: true,
      issues: {
        select: {
          id: true,
          name: true,

          assignedTo: {
            select: { name: true },
          },
        },
      },
    },
  });
  if (!board) {
    return NextResponse.json({ error: "board not found" }, { status: 404 });
  }
  return NextResponse.json(board, { status: 200 });
}
