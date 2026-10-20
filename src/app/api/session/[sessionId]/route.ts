import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await params;
  const session = await prisma.session.delete({
    where: { id: sessionId },
  });
  if (session) return NextResponse.json(true);
  return NextResponse.json({
    error: "Session failed to be deleted",
  });
}
