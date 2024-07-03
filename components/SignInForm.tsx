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
import { toast } from "./ui/use-toast";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/form-schemas";
import { useForm } from "react-hook-form";
import FormButton from "./FormButton";
import { signInAction } from "@/lib/actions";
import { SignInValues } from "@/lib/form-schemas";
const SignInForm = () => {
  const SignInForm = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInValues) {
    try {
      const user = values.email;
      await signInAction(values);
      toast({
        title: `Welcome to dashboard ${user} `,
        description: `Feel free to use the dashboard`,
      });
    } catch (error) {
      toast({
        title: `Something went wrong `,
        description: `${error}`,
      });
    }
  }
  return (
    <section className="w-full max-w-md">
      <Form {...SignInForm}>
        <form
          onSubmit={SignInForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={SignInForm.control}
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
            control={SignInForm.control}
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
          <FormButton variant="login" />
        </form>
      </Form>
    </section>
  );
};

export default SignInForm;
