import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await params;
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
  }
  const session = await prisma.session.delete({
    where: { id: sessionId },
  });
  if (!session) {
    return NextResponse.json({
      error: "Session not found"
    }, { status: 404 });
  }
  return NextResponse.json(true, { status: 200 });
}
