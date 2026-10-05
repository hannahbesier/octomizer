import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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
  return NextResponse.json(board);
}
