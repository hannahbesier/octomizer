import getSessionCookie from "@/lib/getSessionCookie";
import { prisma } from "@/lib/prisma";
import validateOrigin from "@/lib/validateOrigin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const originError = validateOrigin(request);

  if (originError) {
    return originError;
  }
  const { username } = await params;

  const body = await request.json();
  try {
    const { password } = body;
    let user = null;
    if (username) {
      user = await prisma.user.findUnique({
        where: { email: username },
        select: {
          id: true,
          name: true,
          password: true,
        },
      });
    }
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Failed to login: no user" },
        { status: 500 },
      );
    }

    const session = await prisma.session.create({
      data: {
        id: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        userId: user?.id,
      },
    });

    const cookieStore = await cookies();

    cookieStore.set("sessionId", session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({ id: session.id, expiresAt: session.expiresAt }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
