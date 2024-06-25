import prisma from "@/lib/prisma";
import { AppointmentResponse } from "@/lib/type";

export async function fetchAppointmentsList(
  take = 20,
  skip = 0
): Promise<AppointmentResponse> {
  try {
    const response = await fetch(`/api/appointments?take=${take}&skip=${skip}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch appointments");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
}
