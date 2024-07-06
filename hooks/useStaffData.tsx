import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { selectDateTime, selectStaff } from "@/store/formSlice";
import { RootState } from "@/store/store";
import { useTimeSlotData } from "@/hooks/useChartData";

const useStaffData = () => {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { selectedStaff, selectedDate, selectedTime } = useSelector(
    (state: RootState) => state.formSlice
  );

  const { data, isLoading, isError, error } = useTimeSlotData(
    selectedStaff || ""
  );

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const formattedDate = format(new Date(selectedDate), "MM/dd/yyyy");
      dispatch(selectDateTime({ date: formattedDate, time: selectedTime }));
    }
  }, [dispatch, selectedDate, selectedTime]);

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setValue("date", formattedDate);
      dispatch(selectDateTime({ date: formattedDate, time: selectedTime }));
    }
  };

  const handleTimeSelect = (time: string) => {
    setValue("time", time);
    if (selectedDate) {
      dispatch(selectDateTime({ date: selectedDate, time }));
    }
  };

  const barberslots = useMemo(() => data?.barberslots ?? [], [data]);
  const dayOfWeekNumber = selectedDate
    ? new Date(selectedDate).getDay()
    : undefined;

  const filteredSlots = useMemo(
    () =>
      barberslots.filter(
        (slot) =>
          slot.barber_name === selectedStaff &&
          parseInt(slot.day_of_week, 10) === dayOfWeekNumber
      ),
    [barberslots, selectedStaff, dayOfWeekNumber]
  );

  return {
    register,
    isLoading,
    selectStaff,
    handleDateSelect,
    handleTimeSelect,
    selectedStaff,
    filteredSlots,
    barberslots,
    selectedDate,
    selectedTime,
    error,
    errors,
  };
};

export default useStaffData;
