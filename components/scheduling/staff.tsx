// StepStaff.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import FormCard from "../ui/formcard";
import { RootState } from "@/store/store";
import { barbers } from "@/lib/data";
import { selectStaff } from "@/store/formSlice"; // Adjust path as needed

const StepStaff = () => {
  const dispatch = useDispatch();
  const selectedStaff = useSelector(
    (state: RootState) => state.formSlice.selectedStaff
  );

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (selectedStaff) {
      setValue("staff", selectedStaff);
    }
  }, [selectedStaff, setValue]);

  const handleStaffSelect = (barberName: string) => {
    dispatch(selectStaff(barberName)); // Dispatch action to select staff
  };

  return (
    <ScrollArea className="h-[600px] rounded-md border p-4">
      <h2 className="text-lg font-bold">Select Staff</h2>
      <section className="flex flex-col lg:flex-row gap-4">
        {barbers.map((staffName, index) => (
          <div
            key={index}
            className={`w-full lg:max-w-xs border rounded-lg h-36 p-4 ${
              selectedStaff === staffName.name
                ? "border-yellow-500 bg-stone-800"
                : ""
            }`}
            onClick={() => handleStaffSelect(staffName.name)}
          >
            <FormCard
              name={staffName.name}
              description="Expert barber"
              Avatarsrc="https://github.com/shadcn.png"
            />
            <Input
              type="hidden"
              defaultValue={selectedStaff}
              {...register("staff")}
            />
          </div>
        ))}

        {errors.staff && <span>{`${errors.staff.message}`}</span>}
      </section>
    </ScrollArea>
  );
};

export default StepStaff;
