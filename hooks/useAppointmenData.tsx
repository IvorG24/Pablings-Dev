"use client";
import React, { useState } from "react";
import { AppointmentResponse } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { fetchAppointmentsList } from "@/services/appointments";
import {
  ApproveAppointment,
  DeclineAppointment,
} from "@/app/action/appointment";

interface AppointmentTableProps {
  variant: "pending" | "confirmed" | "declined";
}

const useAppointmenData = ({ variant }: AppointmentTableProps) => {
  const [take, setTake] = useState(15);
  const [skip, setSkip] = useState(0);
  const [status, setStatus] = useState<"Pending" | "Confirm" | "Declined">(
    variant === "pending"
      ? "Pending"
      : variant === "confirmed"
        ? "Confirm"
        : "Declined",
  );
  const [totalItems, setTotalItems] = useState(0);
  const [appointmentsData, setAppointmentsData] = useState<AppointmentResponse>(
    {
      pendingAppointments: [],
      confirmedAppointments: [],
      declinedAppointments: [],
      total: 0,
    },
  );

  const { data, error, isLoading, isError } = useQuery<AppointmentResponse>({
    queryKey: ["Appointment", take, skip, status],
    queryFn: async () => {
      const response = await fetchAppointmentsList(take, skip, status);
      setAppointmentsData(response);
      setTotalItems(response.total);
      return response;
    },
  });
  const totalPages: number = Math.ceil(totalItems / take);
  const handlePrevious = () => setSkip((prev) => Math.max(prev - take, 0));
  const handleNext = () => setSkip((prev) => prev + take);
  const handlePageClick = (page: number) => setSkip(page * take);
  const appointmentAction = async (
    appointmentId: string,
    action: "approve" | "decline" | "confirm-decline",
  ) => {
    try {
      switch (action) {
        case "approve":
          await ApproveAppointment(
            appointmentId,
            appointmentsData.pendingAppointments,
          );
          console.log(appointmentsData.pendingAppointments);

          setAppointmentsData((prevData) => ({
            ...prevData,
            pendingAppointments: prevData.pendingAppointments.filter(
              (app) => app.appointment_id !== appointmentId,
            ),
          }));
          break;
        case "decline":
          await DeclineAppointment(appointmentId);
          // Update state after decline
          setAppointmentsData((prevData) => ({
            ...prevData,
            pendingAppointments: prevData.pendingAppointments.filter(
              (app) => app.appointment_id !== appointmentId,
            ),
          }));
          break;
        case "confirm-decline":
          await DeclineAppointment(appointmentId);
          // Update state after confirm-decline
          setAppointmentsData((prevData) => ({
            ...prevData,
            confirmedAppointments: prevData.confirmedAppointments.filter(
              (app) => app.appointment_id !== appointmentId,
            ),
          }));
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }
    } catch (error) {
      console.error(
        `Error ${action}ing appointment with ID ${appointmentId}:`,
        error,
      );
      // Handle error as needed (e.g., show error message to user)
    }
  };
  return {
    appointmentsData,
    totalItems,
    take,
    setTake,
    skip,
    setSkip,
    status,
    setStatus,
    isLoading,
    isError,
    error,
    appointmentAction,
    totalPages,
    handlePrevious,
    handlePageClick,
    handleNext,
  };
};

export default useAppointmenData;
