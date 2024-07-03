import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "./ui/button";

interface FormButtonProps {
  variant?: "login" | "signup" | "appointment";
  counter?: number;
  steps?: React.ReactNode;
}

const FormButton = ({ variant, counter, steps }: FormButtonProps) => {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  let buttonText = "Submit"; // Default button text
  if (variant === "appointment") {
    buttonText =
      counter === React.Children.count(steps) - 1 ? "Booking" : "Next";
  }

  return (
    <>
      {variant === "login" || "signup" ? (
        <Button className="w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : buttonText}
        </Button>
      ) : variant === "appointment" ? (
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : buttonText}
        </Button>
      ) : (
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : buttonText}
        </Button>
      )}
    </>
  );
};

export default FormButton;
