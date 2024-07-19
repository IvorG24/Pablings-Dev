// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    email?: string | null;
    role: string;
  }
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  }

  interface JWT {
    id?: string;
    email?: string;
    role?: string;
    accessToken?: string;
  }
}
