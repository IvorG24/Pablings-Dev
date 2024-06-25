"use server";
import { AppointmentValues, combinedSchema } from "@/lib/form-schemas";
import prisma from "@/lib/prisma";
import { queryClient } from "@/lib/query";
import { revalidateTag } from "next/cache";

export async function AppointmentAction(appointmentValues: AppointmentValues) {
  const { success, data } =
    await combinedSchema.safeParseAsync(appointmentValues);

  if (!success) {
    return { error: "Invalid data" };
  }

  try {
    // Fetch the latest BookingNumber
    const latestAppointment = await prisma.appointment.findFirst({
      orderBy: { BookingNumber: "desc" },
    });

    const nextBookingNumber = latestAppointment
      ? latestAppointment.BookingNumber + 1
      : 1;

    const newAppointment = await prisma.appointment.create({
      data: {
        BookingNumber: nextBookingNumber,
        service: data.service,
        date: data.date,
        barber: data.barber,
        time: data.time,
        extraservices: data.extraservices,
        phone: data.phone,
        name: data.name,
        email: data.email,
        totalprice: data.totalprice,
      },
    });
    revalidateTag("Appointment");
    return newAppointment;
  } catch (error) {
    console.error("ERROR OCCURRED IN APPOINTMENT ACTION", error);
    throw new Error("An error occurred while creating the appointment");
  }
}
