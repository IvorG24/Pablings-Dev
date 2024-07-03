"use server";
import { SignInValues, SignUpValues, signUpSchema } from "./form-schemas";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthError } from "next-auth";
import { hashSync } from "bcryptjs";
import { signIn } from "@/auth";
import prisma from "./prisma";
import { redirect } from "next/navigation";

export const signInAction = async (signInValues: SignInValues) => {
  try {
    await signIn("credentials", signInValues);
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid Credentials");
        default:
          throw new Error("something went wrong");
      }
    }
    throw error;
  }
};

export const signUpAction = async (signUpValues: SignUpValues) => {
  const { data } = await signUpSchema.safeParseAsync(signUpValues);
  if (!data) return { error: "Invalid data" };
  try {
    await prisma.user.create({
      data: {
        ...data,
        password: hashSync(data.password, 10),
      },
    });
  } catch (error) {
    console.log("ERROR OCCURED SIGNUP ACTION", error);
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          throw new Error("Email already exist");
        default:
          throw new Error("An error occured");
      }
    }
    return { error: "An error occurred" };
  }
  redirect("/sign-in");
};
