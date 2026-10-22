import getSessionCookie from "@/lib/getSessionCookie";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }
  const issues = await prisma.issue.findMany({
    where: { assignedToId: Number(userId) },
    select: {
      id: true,
      name: true,
      storypoints: true,
      markdown: true,

      assignedTo: {
        select: { id: true, name: true },
      },
      state: { select: { id: true, name: true } },
      project: { select: { id: true, name: true } },
      feature: { select: { id: true, name: true } },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  if (!issues) {
    return NextResponse.json({ error: "issues not found" }, { status: 404 });
  }
  return NextResponse.json(issues, { status: 200 });
}
