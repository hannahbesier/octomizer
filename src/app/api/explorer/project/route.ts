import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const projectId = request.nextUrl.searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json(
      { error: "projectId is required" },
      { status: 400 },
    );
  }
  const project = await prisma.project.findUnique({
    where: { id: Number(projectId) },
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
          state: { select: { name: true } },
        },
      },
      features: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json(project);
}
