"use client";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { selectDateTime } from "@/store/formSlice";
import { RootState } from "@/store/store";
import { useTimeSlotData } from "@/hooks/useChartData";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import useStaffData from "@/hooks/useStaffData";

const StepDateTime = () => {
  const {
    handleDateSelect,
    selectedDate,
    barberslots,
    selectedStaff,
    register,
    isLoading,
    filteredSlots,
    handleTimeSelect,
  } = useStaffData();
  return (
    <section className="flex flex-col gap-2">
      {/* {errors.date && <span>{errors.date.message}</span>}
      {errors.time && <span>{errors.time.message}</span>} */}
      <Calendar
        mode="single"
        selected={new Date(selectedDate)}
        onSelect={handleDateSelect}
        disabled={(date) =>
          date < new Date() ||
          date < new Date("1900-01-01") ||
          !barberslots.some(
            (slot) =>
              parseInt(slot.day_of_week, 10) === date.getDay() &&
              slot.barber_name === selectedStaff
          )
        }
        {...register("date")}
      />
      <h1>Available Slots</h1>
      <div className="flex flex-wrap items-center gap-4 border-2 h-auto p-4 rounded-lg">
        {isLoading ? (
          <Skeleton className="w-full max-w-[150px] h-12" />
        ) : (
          filteredSlots.map((slot, index) => (
            <Button
              className="w-full max-w-[150px]"
              key={index}
              onClick={() => handleTimeSelect(slot.time_slot)}
            >
              {slot.time_slot}
            </Button>
          ))
        )}
      </div>
    </section>
  );
};

export default StepDateTime;
