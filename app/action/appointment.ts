"use server";
import { queryClient } from "@/lib/query";
import prisma from "@/lib/prisma";

export async function ApproveAppointment(appointment_id?: string) {
  try {
    await queryClient.invalidateQueries({
      queryKey: ["Appointment"],
    });
    await prisma.appointment.update({
      where: {
        appointment_id: appointment_id,
      },
      data: {
        status: "Confirm",
      },
    });

    console.log(`Appointment with ID ${appointment_id} has been confirmed.`);
  } catch (error) {
    console.error(
      `Error updating appointment with ID ${appointment_id}:`,
      error
    );
  }
}

export async function DeclineAppointment(appointment_id?: string) {
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
      queryKey: ["Appointment", { type: "declined" }],
    });
    console.log(`Appointment with ID ${appointment_id} has been declined.`);
  } catch (error) {
    console.error(
      `Error updating appointment with ID ${appointment_id}:`,
      error
    );
  }
}
