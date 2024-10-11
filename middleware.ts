import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = request.nextUrl.pathname;
  const publicPaths = new Set(["/u/login", "/u/signup"]);
  const isPubliPath = publicPaths.has(path);

  if (!token && !isPubliPath) {
    return NextResponse.redirect(new URL("/u/login", request.url));
  }

  if (token && isPubliPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/u/login", "/u/signup"],
};
