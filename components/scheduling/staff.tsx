import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import FormCard from "../ui/formcard";
import { RootState } from "@/store/store";
import { selectStaff } from "@/store/formSlice"; // Adjust path as needed
import { useBarberListData } from "@/hooks/useChartData";
import { Skeleton } from "@/components/ui/skeleton";

const StepStaff: React.FC = () => {
  const dispatch = useDispatch();
  const selectedStaff = useSelector(
    (state: RootState) => state.formSlice.selectedStaff
  );

  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (selectedStaff) {
      setValue("barber", selectedStaff);
    }
  }, [selectedStaff, setValue]);

  const handleStaffSelect = (barberName: string) => {
    dispatch(selectStaff(barberName));
  };

  const { data, isLoading, isError, error } = useBarberListData();

  const barberlist = useMemo(() => data?.barberlist ?? [], [data]);

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <ScrollArea className="h-[600px] rounded-md border p-4">
      <h2 className="text-lg font-bold">Select Staff</h2>
      <section className="flex flex-wrap gap-4">
        {isLoading ? (
          <div className="flex w-full gap-4 flex-wrap">
            <Skeleton className="h-36 w-full max-w-xs rounded-lg" />
            <Skeleton className="h-36 w-full max-w-xs rounded-lg" />
          </div>
        ) : (
          barberlist.map((staff, index) => (
            <div
              key={index}
              className={`w-full lg:max-w-xs border rounded-lg h-36 p-4 ${selectedStaff === staff.barber_name ? "border-yellow-500 bg-stone-800" : ""}`}
              onClick={() => handleStaffSelect(staff.barber_name)}
            >
              <FormCard
                name={staff.barber_name}
                description="Expert barber"
                Avatarsrc="https://github.com/shadcn.png"
              />
            </div>
          ))
        )}
        {errors.staff && <span>{`${errors.staff.message}`}</span>}
      </section>
    </ScrollArea>
  );
};

export default StepStaff;
