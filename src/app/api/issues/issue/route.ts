import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const issueId = request.nextUrl.searchParams.get("issueId");

  if (!issueId) {
    return NextResponse.json({ error: "issueId is required" }, { status: 400 });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: Number(issueId) },
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

  return NextResponse.json(issue);
}
