import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET() {
  const states = await prisma.state.findMany();
  if (!states) {
    return NextResponse.json({ error: "states not found" }, { status: 404 });
  }
  return NextResponse.json(states, { status: 200 });
}
