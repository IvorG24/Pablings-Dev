"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { Button } from "./ui/button";
import LoadingSpinner from "./ui/spinner";

type Props = ComponentProps<"button"> & {
  pendingText: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" disabled={pending}>
      {pending ? (
        <p className="flex items-center gap-2">
          <LoadingSpinner />
          {pendingText}
        </p>
      ) : (
        children
      )}
    </Button>
  );
}
