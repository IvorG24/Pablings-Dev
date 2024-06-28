"use client";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { stepLabels } from "@/lib/data";
import FormButton from "@/components/FormButton";
import useScheduleForm from "@/hooks/useScheduleForm";

const page = () => {
  const { currentStep, methods, onSubmit, steps, setCurrentStep } =
    useScheduleForm();
  return (
    <main className="p-10 min-h-[800px] h-full w-full flex gap-x-10">
      <section className="step-indicator mb-5 pr-4 border-r-2 space-y-6">
        {stepLabels.map((label, index) => (
          <div
            key={index}
            className={`step ${
              currentStep === index ? "text-yellow-500 text-lg" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              {<label.icon className="text-xl" />}
              {label.label}
            </div>
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
            <FormButton
              variant="appointment"
              counter={currentStep}
              steps={steps}
            />
          </div>
        </form>
      </FormProvider>
    </main>
  );
};

export default page;
