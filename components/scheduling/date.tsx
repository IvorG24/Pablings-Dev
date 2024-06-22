import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { availabilitySlots } from "@/lib/data";
import { selectDateTime } from "@/store/formSlice";
import { RootState } from "@/store/store";
import { Button } from "../ui/button";

const StepDateTime: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const selectedDate = useSelector(
    (state: RootState) => state.formSlice.selectedDate
  );
  const selectedTime = useSelector(
    (state: RootState) => state.formSlice.selectedTime
  );
  const selectedBarber = getValues("staff") as string;

  const formattedDayOfWeek = selectedDate ? format(selectedDate, "i") : "";
  const dayOfWeekNumber = formattedDayOfWeek
    ? parseInt(formattedDayOfWeek, 10)
    : undefined;

  const filteredSlots = availabilitySlots.filter(
    (slot) =>
      slot.barber_name === selectedBarber &&
      slot.day_of_week === dayOfWeekNumber
  );

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      dispatch(selectDateTime({ date: selectedDate, time: selectedTime }));
    }
  }, [dispatch, selectedDate, selectedTime]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setValue("date", formattedDate); // Update form state

      dispatch(selectDateTime({ date: date, time: selectedTime }));
    }
  };

  const handleTimeSelect = (selectedTime: string) => {
    setValue("time", selectedTime);
    if (selectedDate) {
      dispatch(selectDateTime({ date: selectedDate, time: selectedTime }));
    }
  };

  return (
    <section className="flex flex-col gap-2">
      {errors.date && <span>{`${errors.date.message}`}</span>}
      {errors.time && <span>{`${errors.time.message}`}</span>}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        disabled={(date) =>
          date < new Date() ||
          date < new Date("1900-01-01") ||
          !availabilitySlots.some(
            (slot) =>
              slot.day_of_week === date.getDay() &&
              slot.barber_name === selectedBarber
          )
        }
        {...register("date")}
      />
      <h1>Available Slots</h1>
      <div className="flex gap-4 border-2 h-full min-h-[250px] p-4 rounded-lg">
        {filteredSlots.map((slot) => (
          <Button
            className="w-full max-w-[150px]"
            key={slot.slot_id}
            onClick={() =>
              handleTimeSelect(`${slot.start_time} - ${slot.end_time}`)
            }
          >
            {slot.start_time} - {slot.end_time}
            <Input
              type="hidden"
              defaultValue={`${slot.start_time} - ${slot.end_time}`}
              {...register("time")}
            />
          </Button>
        ))}
      </div>
    </section>
  );
};

export default StepDateTime;
