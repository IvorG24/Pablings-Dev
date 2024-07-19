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
      <main className="p-10 min-h-[800px] h-full w-full flex flex-col lg:flex-row gap-x-10 z-50">
        <section className="step-indicator flex items-center justify-between lg:block lg:space-y-6 mb-5 pr-4 lg:border-r-2 ">
          {stepLabels.map((label, index) => (
            <div
              key={index}
              className={`step ${
                currentStep === index ? "text-yellow-500 text-lg" : ""
              }`}
            >
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <h1
                  className={`text-sm w-full lg:hidden mb-2 ${currentStep === index ? "text-yellow-500" : ""}`}
                >
                  {currentStep === index ? label.label : ""}
                </h1>
                {<label.icon className="text-4xl lg:text-xl" />}
                <p className="hidden lg:block">{label.label}</p>
              </div>
            </div>
          ))}
        </section>

        <FormProvider {...methods}>
          <form
            ref={ref}
            className=" w-full flex flex-col gap-y-4 justify-between"
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
