import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const states = await prisma.state.findMany();
  return NextResponse.json(states);
}
