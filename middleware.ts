// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import {
  actionPrefix,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

export default auth((req) => {
  const headers = new Headers(req.headers); // Properly handle headers
  headers.set("x-current-path", req.nextUrl.pathname);
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isActionRoute = nextUrl.pathname.startsWith(actionPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // if it is an API Next Auth route, we don't want to redirect
  if (isApiAuthRoute && isActionRoute)
    return NextResponse.json("You are not authorized");
  if (isAuthRoute) {
    if (isLoggedIn) {
      // if the user is already logged in and is in sign-in or sign-up page
      // redirect to the default logged-in page (which is dashboard in this case)
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    // if the user is not logged in and is in sign-in or sign-up page, let them be
    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }
  return NextResponse.next({ headers });
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/appointment",
    "/(api|action|trpc)(.*)",
  ],
};
