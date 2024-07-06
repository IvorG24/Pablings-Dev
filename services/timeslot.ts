import { TimeSlotData } from "@/lib/type";
import { getSession } from "next-auth/react";

export async function fetchTimeSlot(name?: string): Promise<TimeSlotData> {
  try {
    const url = name ? `/api/slot?name=${name}` : `/api/slot`;
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch records");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
}
