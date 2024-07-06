import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Page = async () => {
  const headerList = headers();
  const pathname = headerList.get("x-current-path") || "";
  const barberName = decodeURIComponent(pathname).split("/").pop();

  const schedule = await prisma.slot.findMany({
    where: {
      barber_name: barberName,
    },
  });

  // Group schedule by day of the week
  const scheduleByDay: { [key: number]: typeof schedule } = {
    1: [], // Monday
    2: [], // Tuesday
    3: [], // Wednesday
    4: [], // Thursday
    5: [], // Friday
    6: [], // Saturday
    7: [], // Sunday
  };
  schedule.forEach((slot) => {
    const day = parseInt(slot.day_of_week);
    // Ensure day is a valid number and within 1-7 range
    if (day >= 1 && day <= 7) {
      scheduleByDay[day].push(slot);
    }
  });

  return (
    <ScrollArea className="h-full pb-10">
      <Table className=" w-[1800px]">
        <TableCaption>Barber's Weekly Schedule</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Monday</TableHead>
            <TableHead className="text-center">Tuesday</TableHead>
            <TableHead className="text-center">Wednesday</TableHead>
            <TableHead className="text-center">Thursday</TableHead>
            <TableHead className="text-center">Friday</TableHead>
            <TableHead className="text-center">Saturday</TableHead>
            <TableHead className="text-center">Sunday</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-t border-b border-gray-200">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <TableCell
                key={day}
                className="p-4 text-center border border-gray-300"
              >
                {scheduleByDay[day].length > 0 ? (
                  scheduleByDay[day].map((slot) => (
                    <div
                      className="flex flex-col gap-1 p-2 border-b border-gray-200"
                      key={slot.slot_id}
                    >
                      <h1 className="text-sm font-semibold">
                        {slot.time_slot}
                      </h1>
                      <p
                        className={`text-xs ${slot.isAvailable ? "text-yellow-600" : "text-red-600"}`}
                      >
                        {slot.isAvailable ? "Available" : "Not Available"}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">Day Off</div>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Page;
