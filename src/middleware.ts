import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isAuthPage =
        req.nextUrl.pathname.startsWith("/login") ||
        req.nextUrl.pathname.startsWith("/register");

    if (isAuthPage) {
        if (token) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
    }

    if (!token) {
        console.log("No token found, redirecting to /login");
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next|static|.*\\..*).*)"],
};