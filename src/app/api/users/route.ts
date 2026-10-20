import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true },
  });
  if (!users) {
    return NextResponse.json({ error: "users not found" }, { status: 200 });
  }
  return NextResponse.json(users, { status: 200 });
}
