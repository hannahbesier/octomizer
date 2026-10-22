import getSessionCookie from "@/lib/getSessionCookie";
import { prisma } from "@/lib/prisma";
import validateOrigin from "@/lib/validateOrigin";
import { NextResponse } from "next/server";
export async function DELETE(
  request: Request,
) {
  const originError = validateOrigin(request);

  if (originError) {
    return originError;
  }
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
  const response = NextResponse.json(
    { success: true },
    { status: 200 }
  );

  response.cookies.set("sessionId", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  await prisma.session.deleteMany({
    where: { id: sessionId },
  });

  return response;
}
