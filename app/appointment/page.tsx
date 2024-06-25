"use client";
import React, { useState, useEffect } from "react";
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
import { useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import { stepLabels } from "@/lib/data";
import { useSelection } from "@/lib/handleEvent/stepForm";
import { AppointmentAction } from "../action/actions";
import { AppointmentState, AppointmentTable } from "@/lib/type";
import { RootState, AppDispatch } from "@/store/store";
import { fetchAppointments, addAppointment } from "@/store/appointmentSlice";
import { useSelector, useDispatch } from "react-redux";
import { log } from "console";
import FormButton from "@/components/FormButton";

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

  const onSubmit = async (data: any) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (currentStep === steps.length - 1) {
      await AppointmentAction(updatedData);
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

export default Page;
