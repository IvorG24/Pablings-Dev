"use server";
import { queryClient } from "@/lib/query";
import prisma from "@/lib/prisma";
import { Appointment } from "@prisma/client";

export async function ApproveAppointment(
  appointment_id: string,
  appointmentData: Appointment[],
) {
  try {
    // Update the appointment status
    await prisma.appointment.update({
      where: {
        appointment_id: appointment_id,
      },
      data: {
        status: "Confirm",
      },
    });

    const appointment = appointmentData.find(
      (app) => app.appointment_id === appointment_id,
    );
    if (appointment) {
      await prisma.sales.create({
        data: {
          staff: appointment.barber,
          service: appointment.service,
          staffsales: appointment.totalprice * 0.5,
          ownersales: appointment.totalprice * 0.5,
          totalsales: appointment.totalprice,
          trasactiondate: appointment.date,
        },
      });
    }
    await queryClient.invalidateQueries({
      queryKey: ["Appointment"],
    });

    console.log(
      `Appointment with ID ${appointment_id} has been confirmed and a sales entry created.`,
    );
  } catch (error) {
    console.error(
      `Error updating appointment with ID ${appointment_id}:`,
      error,
    );
  }
}
export async function DeclineAppointment(appointment_id: string) {
  try {
    await prisma.appointment.update({
      where: {
        appointment_id: appointment_id,
      },
      data: {
        status: "Declined",
      },
    });
    await queryClient.invalidateQueries({
      queryKey: ["Appointment"],
    });
    console.log(`Appointment with ID ${appointment_id} has been declined.`);
  } catch (error) {
    console.error(
      `Error updating appointment with ID ${appointment_id}:`,
      error,
    );
  }
}
