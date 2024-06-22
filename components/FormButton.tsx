import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
const FormButton = () => {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;
  return (
    <Button className="w-full" disabled={isSubmitting} type="submit">
      {isSubmitting ? "Submitting..." : "Submit"}
    </Button>
  );
};

export default FormButton;
