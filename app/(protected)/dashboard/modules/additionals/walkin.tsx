"use client";
import React, { useState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services, extras } from "@/lib/data";
import { AddWalkinClient } from "@/app/action/walkin";
import MultipleSelector from "@/components/ui/multiselect";
import { toast } from "@/components/ui/use-toast";

const AddWalkin = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [formdata, setFormdata] = useState(new FormData());

  const handleChange = (selectedOptions: any[]) => {
    const labels = selectedOptions.map((option) => option.label);
    setSelectedValues(labels);
    const newFormdata = new FormData();
    newFormdata.set("extraServices", labels.join(","));
    setFormdata(newFormdata);
  };

  return (
    <section className=" p-6 rounded-lg py-10 flex justify-center items-center">
      <form
        action={async (formdata: FormData) => {
          try {
            const name = formdata.get("fullname");
            await AddWalkinClient(formdata);
            toast({
              title: `You have submitted a transaction! `,
              description: `Walk in for ${name}`,
            });
          } catch (e) {
            toast({
              title: `Something went wrong `,
              description: ` ${e}`,
            });
          }
        }}
        className="w-full max-w-lg flex flex-col gap-6"
      >
        <h1 className="text-2xl font-bold">Add Walk-In Client</h1>
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullname"
            type="text"
            placeholder="Enter full name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="service">Service</Label>
          <Select name="service">
            <SelectTrigger>
              <SelectValue placeholder="Select Service" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(services).flatMap(([category, serviceList]) =>
                serviceList.map((service) => (
                  <SelectItem key={service.name} value={`${service.name} `}>
                    {service.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="extraServices">Extra Services (optional)</Label>
          <MultipleSelector
            defaultOptions={extras || undefined}
            placeholder="Select additional services"
            onChange={handleChange}
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                no results found.
              </p>
            }
          />
          <Input
            type="hidden"
            name="extraServices"
            value={selectedValues}
          ></Input>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="barber">Barber</Label>
          <Input
            id="barber"
            name="barber"
            type="text"
            placeholder="Barber name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="voucher">With Voucher (optional)</Label>
          <Input
            name="voucher"
            id="voucher"
            type="number"
            placeholder="Enter voucher code (optional)"
          />
        </div>

        <SubmitButton
          className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
          pendingText="Submitting..."
        >
          Create Walk-In Client
        </SubmitButton>
      </form>
    </section>
  );
};

export default AddWalkin;
