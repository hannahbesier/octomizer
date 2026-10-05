import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      name,
      assignedToId,
      stateId,
      projectId,
      storypoints,
      tags,
      markdown,
    } = body;
    const issue = await prisma.issue.update({
      where: { id: Number(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(markdown !== undefined && { markdown }),
        ...(assignedToId !== undefined && {
          assignedTo: {
            connect: {
              id: Number(assignedToId),
            },
          },
        }),
        ...(stateId !== undefined && {
          state: {
            connect: {
              id: Number(stateId),
            },
          },
        }),
        ...(projectId !== undefined && {
          project: {
            connect: {
              id: Number(projectId),
            },
          },
        }),
        ...(storypoints !== undefined && { storypoints }),
        ...(tags !== undefined && {
          tags: {
            set: tags.map((id: number) => ({ id })),
          },
        }),
      },
    });
    return NextResponse.json(issue);
  } catch {
    return NextResponse.json(
      { error: "Failed to update issue" },
      { status: 500 },
    );
  }
}
