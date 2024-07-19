"use client";
import React, { useState, useEffect } from "react";
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
  const [appointmentsData, setAppointmentsData] = useState<AppointmentResponse>(
    {
      pendingAppointments: [],
      confirmedAppointments: [],
      declinedAppointments: [],
      total: 0,
    }
  );
  const [status, setStatus] = useState<"Pending" | "Confirm" | "Declined">(
    variant === "pending"
      ? "Pending"
      : variant === "confirmed"
        ? "Confirm"
        : "Declined"
  );
  const [totalItems, setTotalItems] = useState(0);

  // Ensure that status changes when `variant` prop changes
  useEffect(() => {
    setStatus(
      variant === "pending"
        ? "Pending"
        : variant === "confirmed"
          ? "Confirm"
          : "Declined"
    );
  }, [variant]);

  // Fetch appointments list data
  const { data, error, isLoading, isError } = useQuery<AppointmentResponse>({
    queryKey: ["Appointment", take, skip, status],
    queryFn: async () => {
      const response = await fetchAppointmentsList(take, skip, status);
      return response;
    },
    gcTime: 300000, // Cache data for 5 minutes
  });

  // Update totalItems if data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data.total);
      setAppointmentsData(data);
    }
  }, [data]);

  const totalPages: number = Math.ceil(totalItems / take);

  // Define the actions for handling appointments
  const appointmentAction = async (
    appointmentId: string,
    action: "approve" | "decline" | "confirm-decline"
  ) => {
    try {
      switch (action) {
        case "approve":
          await ApproveAppointment(
            appointmentId,
            appointmentsData.pendingAppointments
          );
          setAppointmentsData((prevData) => ({
            ...prevData,
            pendingAppointments: prevData.pendingAppointments.filter(
              (app) => app.appointment_id !== appointmentId
            ),
          }));
          break;
        case "decline":
          await DeclineAppointment(appointmentId);
          setAppointmentsData((prevData) => ({
            ...prevData,
            pendingAppointments: prevData.pendingAppointments.filter(
              (app) => app.appointment_id !== appointmentId
            ),
          }));
          break;
        case "confirm-decline":
          await DeclineAppointment(appointmentId);
          setAppointmentsData((prevData) => ({
            ...prevData,
            confirmedAppointments: prevData.confirmedAppointments.filter(
              (app) => app.appointment_id !== appointmentId
            ),
          }));
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }

      // Refetch the data after an action
      await fetchAppointmentsList(take, skip, status);
    } catch (error) {
      console.error(
        `Error ${action}ing appointment with ID ${appointmentId}:`,
        error
      );
    }
  };

  // Pagination controls
  const handlePrevious = () => setSkip((prev) => Math.max(prev - take, 0));
  const handleNext = () => setSkip((prev) => prev + take);
  const handlePageClick = (page: number) => setSkip(page * take);

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
