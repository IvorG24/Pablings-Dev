import { AppointmentResponse } from "@/lib/type";
import { status as Status } from "@prisma/client";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";
export async function fetchAppointmentsList(
  take = 15,
  skip = 0,
  status: Status = Status.Pending, // Default status is Pending
): Promise<AppointmentResponse> {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("No session or access token found");
    }
    const response = await fetch(
      `/api/appointments?take=${take}&skip=${skip}&status=${status}`,
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch appointments");
    }
    const data: AppointmentResponse = await response.json();

    // Initialize count property to 0 for each appointment if not already set
    const initializeCount = (appointments: any[]) =>
      appointments.map((appointment) => ({
        ...appointment,
        count: appointment.count || 0,
      }));

    return {
      ...data,
      pendingAppointments: initializeCount(data.pendingAppointments),
      confirmedAppointments: initializeCount(data.confirmedAppointments),
      declinedAppointments: initializeCount(data.declinedAppointments),
    };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
}
