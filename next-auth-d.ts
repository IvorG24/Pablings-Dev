// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
    };
  }

  interface JWT {
    id?: string;
    email?: string;
    accessToken?: string;
  }
}
