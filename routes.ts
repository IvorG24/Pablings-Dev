/**
 * Public routes
 * @type {string[]}
 */
export const publicRoutes = [
  "/appointment",
  "/appointment/:path*",
  "/sign-in",
  "/sign-up",
  "/todo",
  "/api/slot",
  "/api/slot?name=",
  "/api/barberlist",
];

export const authRoutes = ["/sign-in", "/sign-up"];

export const apiAuthPrefix = "/api/auth";
export const actionPrefix = "/action";
