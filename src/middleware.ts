import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/supabaseClient";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const protectedRoutes = ["/todo"];
  const currentPath = request.nextUrl.pathname;

  const requiresAuth = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (requiresAuth) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Set user id in a cookie so it can be accessed in API routes
    const response = NextResponse.next();
    response.cookies.set("x-user-id", user.id, { path: "/" });
    // console.log(`response.cookies.get("x-user-id") : `, response.cookies);

    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/todo/:path*"],
};
