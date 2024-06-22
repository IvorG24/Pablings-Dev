"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/form-schemas";
import { useForm } from "react-hook-form";
import FormButton from "./FormButton";
import { signUpAction } from "@/lib/actions";
import { SignUpValues } from "@/lib/form-schemas";
import { toast } from "react-toastify";
const SignUpForm = () => {
  const SignUpForm = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpValues) {
    try {
      await signUpAction(values);
      toast.success("Login successful");
    } catch (error) {
      toast.error(`${error}`);
    }
  }
  return (
    <section className="w-full max-w-lg">
      <Form {...SignUpForm}>
        <form
          onSubmit={SignUpForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex justify-between">
            <FormField
              control={SignUpForm.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your first name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={SignUpForm.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={SignUpForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={SignUpForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormButton />
        </form>
      </Form>
    </section>
  );
};

export default SignUpForm;
