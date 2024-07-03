import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
const NewService = () => {
  return (
    <section className=" p-6 rounded-lg py-10 flex justify-center items-center">
      <form className="w-full max-w-lg flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Add New Service</h1>

        <div className="flex flex-col gap-2">
          <Label htmlFor="servicename">Service Name</Label>
          <Input
            id="servicename"
            type="text"
            placeholder="Enter service name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Service Price</Label>
          <Input id="price" type="text" placeholder="Enter service price" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Service description</Label>
          <Textarea placeholder="Type service description here." />
        </div>
        <SubmitButton
          className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
          pendingText="Submitting..."
        >
          Create New Service
        </SubmitButton>
      </form>
    </section>
  );
};

export default NewService;
