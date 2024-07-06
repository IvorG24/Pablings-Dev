"use client";
import React from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { stepLabels } from "@/lib/data";
import FormButton from "@/components/FormButton";
import useScheduleForm from "@/hooks/useScheduleForm";
import Image from "next/image";

const page = () => {
  const { currentStep, ref, methods, onSubmit, steps, setCurrentStep } =
    useScheduleForm();

  return (
    <>
      {" "}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="https://mytourguide.ph/wp-content/uploads/2023/10/philippine-businesses-to-emulate-Pablings-Barber-Shop.jpg"
          alt="Pabling's Barber Shop"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <main className="p-10 min-h-[800px] h-full w-full flex gap-x-10 z-50">
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
            ref={ref}
            className=" w-full flex flex-col justify-between"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {steps[currentStep]}

            <div className="flex justify-between">
              {currentStep > 0 && (
                <Button
                  type="button"
                  className=""
                  variant={"ghost"}
                  onClick={() => setCurrentStep((prev: number) => prev - 1)}
                >
                  Back
                </Button>
              )}
              <div>
                <FormButton
                  variant="appointment"
                  counter={currentStep}
                  steps={steps}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </main>
    </>
  );
};

export default page;
