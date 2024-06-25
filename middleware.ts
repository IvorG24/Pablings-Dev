import { NextResponse } from "next/server";
import { auth } from "./auth";
import {
  actionPrefix,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isActionRoute = nextUrl.pathname.startsWith(actionPrefix);
  const isPublicRotue = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // if it is an API Next Auth route, we don't want to redirect
  if (isApiAuthRoute && isActionRoute)
    return NextResponse.json("You are not authorized");
  if (isAuthRoute) {
    if (isLoggedIn) {
      // if the user is already logged in and is in sign-in or sign-up page
      // redirect to the default logged in page (which is dashboard in this case)
      console.log("redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    // if the user is not logged in and is in sign-in or sign-up page, let them be
    return;
  }
  if (!isLoggedIn && !isPublicRotue) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }
  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|action|trpc)(.*)"],
};
