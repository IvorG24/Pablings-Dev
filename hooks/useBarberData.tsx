"use client";
import { fetchBarberList } from "@/services/barber";
import { Barber } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const useBarberData = () => {
  const [barberlist, setbarberlist] = useState<Barber[]>([]);
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["Barber"],
    queryFn: async () => {
      const response = await fetchBarberList();
      setbarberlist(response);
      return response;
    },
  });

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      const start = hour <= 12 ? `${hour}:00` : `${hour - 12}:00`;
      const end =
        hour < 12 ? `${hour + 1}:00` : hour === 12 ? "1:00" : `${hour - 11}:00`;
      const ampmStart =
        hour < 12 ? "AM" : hour === 12 ? "PM" : hour < 24 ? "PM" : "AM";
      const ampmEnd = hour + 1 < 12 ? "AM" : hour + 1 === 12 ? "PM" : "PM";
      slots.push(`${start} - ${end} ${ampmStart}`);
    }
    return slots;
  };
  const timeSlots = generateTimeSlots();

  return {
    barberlist,
    timeSlots,
    isLoading,
    isError,
    error,
  };
};
export default useBarberData;
