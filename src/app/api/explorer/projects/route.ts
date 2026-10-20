import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = await prisma.project.findMany();
  if (!projects) {
    return NextResponse.json({ error: "projects not found" }, { status: 404 });
  }
  return NextResponse.json(projects, { status: 200 });
}
