import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { selectExtra, clearForm } from "@/store/formSlice";
import { Input } from "../ui/input";
import { extras } from "@/lib/data";
import { Extra } from "@/lib/type"; // Assuming Extra type/interface is defined
import { ScrollArea } from "@/components/ui/scroll-area";
import FormCard from "../ui/formcard";

const StepExtraServices = () => {
  const dispatch = useDispatch();
  const { selectedExtra, selectedStaff, selectedExtraPrice } = useSelector(
    (state: RootState) => state.formSlice
  );
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (selectedExtra.length > 0) {
      setValue("extraservices", selectedExtra);
      setValue("price2", selectedExtraPrice);
    } else {
      setValue("extraservices", [""]);
      setValue("price2", 0);
    }
  }, [selectedExtra, selectedExtraPrice, setValue]);

  const handleExtraSelect = (extraName: string, price: number) => {
    dispatch(selectExtra({ extraName, price }));
  };

  return (
    <ScrollArea className="h-[600px] rounded-md border p-4">
      {errors.extraServices && <span>{`${errors.extraServices.message}`}</span>}
      <section className="flex flex-col gap-y-4">
        {extras.map((extra: Extra, index: number) => (
          <div
            key={index}
            className={`w-full border rounded-lg h-28 p-4 ${
              selectedExtra.includes(extra.label)
                ? "border-yellow-500 bg-stone-800"
                : ""
            }`}
            onClick={() => handleExtraSelect(extra.label, extra.price)}
          >
            <FormCard
              name={extra.label}
              description={extra.description}
              price={extra.price}
              time="30mins"
              Avatarsrc="https://github.com/shadcn.png"
            />
          </div>
        ))}
      </section>
    </ScrollArea>
  );
};

export default StepExtraServices;
