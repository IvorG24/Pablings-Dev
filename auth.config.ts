import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "./lib/prisma";
import { signInSchema } from "./lib/form-schemas";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "test" },
      },
      async authorize(credentials) {
        const validatedFields = signInSchema.safeParse(credentials);
        if (!validatedFields.success) {
          throw new Error(`${validatedFields.error}`);
        }

        const { email, password } = validatedFields.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) {
          console.error("Password mismatch for user:", email);
          return null;
        }

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string; // Ensure accessToken is available
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
