"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { daysOfWeek } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import { addBarberSchedule } from "@/app/action/barber";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SubmitButton } from "@/components/SubmitButton";
import useBarberData from "@/hooks/useBarberData";
import { Barber } from "@prisma/client";

const AddSchedule = () => {
  const { barberlist, timeSlots } = useBarberData();
  async function onSubmit(formdata: FormData) {
    try {
      const barber = formdata.get("barberName") as string;
      const slot = formdata.get("slot");
      await addBarberSchedule(formdata);
      toast({
        title: `You have created a schedule for ${barber} `,
        description: `Slot: ${slot}`,
      });
    } catch (e) {
      toast({
        title: `Something is wrong`,
        description: `${e}`,
      });
    }
  }

  return (
    <>
      {barberlist.map((barber: Barber) => (
        <Dialog key={barber.barber_id}>
          <DialogTrigger className="w-full md:max-w-[410px] border-2 bg-stone-900 border-yellow-600 h-40 rounded-lg p-4">
            <div className="flex justify-between items-center text-start h-full">
              <div className="w-20 h-20 rounded-full border-2">
                <Image
                  src={barber.image || "/default-profile-image.jpg"} // Provide a default image URL
                  alt="Profile"
                  className="rounded-full w-full h-full object-fill"
                  height={0}
                  width={0}
                />
              </div>
              <div>
                <h1>Barber: {barber.name}</h1>
                <h1>Email: {barber.email}</h1>
                <h1>No: {barber.phone}</h1>
              </div>
            </div>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Barber Slot</DialogTitle>
              <form action={onSubmit} className="flex flex-col gap-6">
                {" "}
                <Label>Barber Name</Label>
                <Input
                  type="text"
                  name="barberName"
                  value={barber.name}
                  readOnly
                />
                {/* Time slot of schedule */}
                <Label>Time Slot</Label>
                <Select name="slot">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot, index) => (
                      <SelectItem key={index} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Day of the week */}
                <Label>Day</Label>
                <Select name="day">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select day of the week" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map((day) => (
                      <SelectItem key={day.value} value={`${day.value}`}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-col gap-6">
                  <SubmitButton
                    type="submit"
                    pendingText="Creating..."
                    className="w-full"
                  >
                    Create Schedule
                  </SubmitButton>
                  <Separator />
                  <Link href={`/dashboard/${barber.name}`}>
                    <Button className="w-full" variant="default">
                      View Schedule
                    </Button>
                  </Link>
                </div>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
};

export default AddSchedule;
