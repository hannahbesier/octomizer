import getSessionCookie from "@/lib/getSessionCookie";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
  const featureId = request.nextUrl.searchParams.get("featureId");
  if (!featureId) {
    return NextResponse.json(
      { error: "featureId is required" },
      { status: 400 },
    );
  }
  const feature = await prisma.feature.findUnique({
    where: { id: Number(featureId) },
    select: {
      id: true,
      name: true,
      children: { select: { id: true, name: true } },
      parent: {
        select: { id: true },
      },
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
    },
  });
  return NextResponse.json(feature, { status: 200 });
}
