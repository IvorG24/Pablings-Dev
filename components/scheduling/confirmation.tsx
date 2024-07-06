import React from "react";
import { useSelector } from "react-redux";
import { TbCurrencyPeso } from "react-icons/tb";
import { RootState } from "@/store/store"; // Adjust path as needed
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const StepConfirmation = () => {
  const {
    selectedService,
    selectedPrice,
    selectedExtra,
    selectedStaff,
    selectedExtraPrice,
    selectedDate,
    selectedTime,
    name,
    email,
    phone,
  } = useSelector((state: RootState) => state.formSlice);
  const { setValue } = useFormContext();
  const totalPrice = selectedPrice + selectedExtraPrice;
  setValue("totalprice", totalPrice);
  return (
    <div className="flex gap-5">
      <div className="w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Appointment Summary</h1>
          <div className="flex justify-between text-yellow-500 items-center">
            <h3 className="text-lg font-semibold">Chosen Date</h3>
            <p className=" font-bold">{format(selectedDate, "EEEE dd MMMM")}</p>
          </div>
          <div className="flex justify-end">
            <p>{selectedTime}</p>
          </div>
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Chosen Barber</h3>
            <p>{selectedStaff}</p>
          </div>
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">{selectedService}</h3>
            <p className="flex gap-2 items-center">
              <TbCurrencyPeso />
              {selectedPrice}
            </p>
          </div>

          {/* Render selected extra services and their prices */}
          {selectedExtra.length > 0 && (
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">
                {selectedExtra.join(", ")}
              </h3>
              <p className="flex gap-2 items-center">
                <TbCurrencyPeso />
                {selectedExtraPrice}
              </p>
            </div>
          )}

          <Accordion className="pb-2" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {" "}
                <h1 className="text-lg font-semibold">Personal Information</h1>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col text-white/60 text-lg font-semibold">
                  <h3>Name: {name}</h3>
                  <h3>Email: {email}</h3>
                  <h3>Phone: {phone}</h3>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="text-end">
          <h3 className="text-lg font-semibold">Total Price</h3>
          <p className="flex gap-2 justify-end items-center">
            <TbCurrencyPeso />
            {totalPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepConfirmation;
