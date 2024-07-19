import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { selectService, clearForm } from "@/store/formSlice";
import { RootState } from "@/store/store";
import { services } from "@/lib/data";
import { Service } from "@/lib/type";
import { ScrollArea } from "@/components/ui/scroll-area";
import FormCard from "../ui/formcard";
import { toast } from "../ui/use-toast";

const StepService = () => {
  const dispatch = useDispatch();
  const selectedService = useSelector(
    (state: RootState) => state.formSlice.selectedService
  );
  const selectedPrice = useSelector(
    (state: RootState) => state.formSlice.selectedPrice
  );
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (selectedService) {
      setValue("service", selectedService);
      setValue("price", selectedPrice);
    } else {
      setValue("service", "");
      setValue("price", 0);
    }
  }, [selectedService, selectedPrice, setValue]);
  useEffect(() => {
    if (errors.service) {
      toast({
        title: "Something went wrong",
        description: `${errors.service.message}`,
        variant: "destructive",
      });
    }
  }, [errors.service]);

  const handleServiceSelect = (serviceName: string, price: number) => {
    dispatch(selectService({ serviceName, price }));
  };

  return (
    <ScrollArea className="h-[600px] rounded-md border p-4">
      <section className="flex flex-col gap-y-4">
        <h2 className="text-lg font-bold">Regular Services</h2>
        {services["Regular"].map((service: Service, index: number) => (
          <div
            key={index}
            className={`w-full border rounded-lg h-auto p-4 ${
              selectedService === service.name
                ? "border-yellow-500 bg-stone-800"
                : ""
            }`}
            onClick={() => handleServiceSelect(service.name, service.price)}
          >
            <FormCard
              name={service.name}
              description={service.description}
              price={service.price}
              time="30mins"
              Avatarsrc="https://github.com/shadcn.png"
            />
          </div>
        ))}

        <h2 className="text-lg font-bold">General Pablo Services</h2>
        {services["General Pablo Services"].map(
          (service: Service, index: number) => (
            <div
              key={index}
              className={`w-full border rounded-lg h-auto p-4 ${
                selectedService === service.name
                  ? "border-yellow-500 bg-stone-800"
                  : ""
              }`}
              onClick={() => handleServiceSelect(service.name, service.price)}
            >
              <FormCard
                name={service.name}
                description={service.description}
                price={service.price}
                time="30mins"
                Avatarsrc="https://github.com/shadcn.png"
              />
            </div>
          )
        )}
      </section>
    </ScrollArea>
  );
};

export default StepService;
