import "server-only";
import { NextResponse } from "next/server";

const APP_ORIGIN = process.env.APP_ORIGIN;

export default function validateOrigin(request: Request) {
    const origin = request.headers.get("origin");

    if (!APP_ORIGIN || APP_ORIGIN !== origin) {
        return NextResponse.json(
            {message: "Unauthorized origin"},
            {status: 403}
        );
    }
    return null;

}