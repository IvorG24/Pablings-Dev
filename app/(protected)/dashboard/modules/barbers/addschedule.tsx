"use client";
import React, { useRef, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import AddBarber from "./addbarber";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiCalendarDate } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const AddSchedule = () => {
  const ref = useRef<HTMLFormElement>(null);
  const { barberlist, timeSlots, isLoading, isError, error } = useBarberData();
  const [selectedDate, setSelectedDate] = useState<Date>();
  async function onSubmit(formdata: FormData) {
    try {
      const barber = formdata.get("barberName") as string;
      const slot = formdata.get("slot");
      await addBarberSchedule(formdata);
      toast({
        title: `You have created a schedule for ${barber} `,
        description: `Slot: ${slot}`,
      });
      ref.current?.reset;
    } catch (e) {
      ref.current?.reset;
      toast({
        title: `Something is wrong`,
        description: `${e}`,
      });
    }
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <div className="flex flex-wrap gap-4 justify-start w-full">
      {isLoading ? (
        <div className="flex w-full flex-wrap gap-4 ">
          <AddBarber />
          <Skeleton className="h-40 w-full max-w-sm rounded-lg" />
          <Skeleton className="h-40 w-full max-w-sm rounded-lg" />
        </div>
      ) : (
        <>
          <AddBarber />
          {barberlist.map((barber: Barber) => (
            <Dialog key={barber.barber_id}>
              <DialogTrigger className="w-full max-w-sm border-2 bg-stone-900 border-yellow-600 h-40 rounded-lg p-4 hover:border-yellow-500 transition-colors">
                <div className="flex gap-4 text-start h-full">
                  <Avatar className="border-2 w-16 h-16">
                    <AvatarImage
                      src={barber.image?.toString()}
                      alt={barber.name}
                    />
                    <AvatarFallback>BB</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-bold text-lg">Barber: {barber.name}</h1>
                    <h1 className="text-sm text-gray-400">
                      Email: {barber.email}
                    </h1>
                    <h1 className="text-sm text-gray-400">
                      No: {barber.phone}
                    </h1>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Barber Slot</DialogTitle>
                </DialogHeader>
                <form
                  ref={ref}
                  action={onSubmit}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <Label
                      htmlFor="barberName"
                      className="block text-sm font-medium "
                    >
                      Barber Name
                    </Label>
                    <Input
                      type="text"
                      name="barberName"
                      id="barberName"
                      value={barber.name}
                      readOnly
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Date of Birth</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline2"}>
                          {selectedDate ? (
                            format(selectedDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CiCalendarDate className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="day" className="block text-sm font-medium">
                      Day
                    </Label>
                    <Select name="day">
                      <SelectTrigger className="w-full mt-1">
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
                  </div>

                  <div className="flex flex-col gap-6 mt-4">
                    <SubmitButton
                      type="submit"
                      pendingText="Creating..."
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Create Schedule
                    </SubmitButton>
                    <Separator />
                    <Link href={`/dashboard/${barber.name}`}>
                      <Button
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        variant="default"
                      >
                        View Schedule
                      </Button>
                    </Link>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          ))}
        </>
      )}
    </div>
  );
};

export default AddSchedule;
