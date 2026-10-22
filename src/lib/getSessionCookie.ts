import "server-only";
import { cookies } from "next/headers";

export default async function getSessionCookie() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;
    return sessionId ?? null;
}