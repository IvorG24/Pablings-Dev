"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  stepServiceSchema,
  stepExtraServicesSchema,
  stepStaffSchema,
  stepDateTimeSchema,
  stepPersonalInfoSchema,
  confirmationSchema,
} from "@/lib/form-schemas";

import { useSelection } from "@/hooks/useSelection";
import { AppointmentAction } from "@/app/action/actions";
import { Appointment } from "@prisma/client";
const useScheduleForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Appointment>>({});
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
  return {
    currentStep,
    methods,
    onSubmit,
    steps,
    setCurrentStep,
  };
};

export default useScheduleForm;
