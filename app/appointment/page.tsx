"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  stepServiceSchema,
  stepExtraServicesSchema,
  stepStaffSchema,
  stepDateTimeSchema,
  stepPersonalInfoSchema,
  confirmationSchema,
} from "@/lib/form-schemas";

import { Button } from "@/components/ui/button";
import { stepLabels } from "@/lib/data";
import { useSelection } from "@/lib/handleEvent/stepForm";
const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { steps } = useSelection();
  const methods = useForm({
    resolver: zodResolver(
      [
        stepServiceSchema,
        stepExtraServicesSchema,
        stepStaffSchema,
        stepDateTimeSchema,
        stepPersonalInfoSchema,
        confirmationSchema,
      ][currentStep]
    ),
    mode: "all",
  });

  const onSubmit = (data: any) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (currentStep === steps.length - 1) {
      console.log(updatedData);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <main className="p-10 min-h-[800px] h-full w-full flex gap-x-10">
      <section className="step-indicator mb-5 pr-4 border-r-2 space-y-6">
        {stepLabels.map((label, index) => (
          <div
            key={index}
            className={`step ${currentStep === index ? "text-yellow-500" : ""}`}
          >
            {label}
          </div>
        ))}
      </section>

      <FormProvider {...methods}>
        <form
          className=" w-full flex flex-col justify-between"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {steps[currentStep]}

          <div className="flex justify-between">
            {currentStep > 0 && (
              <Button
                type="button"
                variant={"ghost"}
                onClick={() => setCurrentStep((prev) => prev - 1)}
              >
                Back
              </Button>
            )}
            <Button type="submit">
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </main>
  );
};

export default Page;
