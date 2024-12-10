import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token?.exp && Math.floor(Date.now() / 1000) > token?.exp) {
    return new Response("Session Expired", { status: 401 });
  }

  const path = request.nextUrl.pathname;
  const publicPaths = new Set(["/auth/signin", "/auth/newuser"]); // Add other public paths as needed
  const isPublicPath = publicPaths.has(path);

  // If there is no token and the path is not public, redirect to sign-in
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // If there is a token and the path is public, redirect to home
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Adjust the matcher to protect all routes except the public paths
export const config = {
  matcher: ["/", "/auth/signin", "/auth/newuser"],
};
