"use client";
import { useRef, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
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
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { clearForm } from "@/store/formSlice";
import { useRouter } from "next/navigation";
const useScheduleForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const {
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const handleClearForm = () => {
    ref.current?.reset();
    dispatch(clearForm());
  };

  const ref = useRef<HTMLFormElement>(null);
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
      reset();
      // handleClearForm();
      router.push(`/appointment/${formData.appointment_id}`);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };
  return {
    currentStep,
    methods,
    onSubmit,
    steps,
    ref,
    setCurrentStep,
  };
};

export default useScheduleForm;
