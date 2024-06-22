import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const generateBarberSchedule = (staffName: string): string[] => {
  // Example: Generate time slots for Monday to Friday
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [];

  for (let i = 7; i <= 17; i++) {
    // Assuming working hours from 7 am to 5 pm
    for (let j = 0; j < 2; j++) {
      // 30-minute intervals
      timeSlots.push(
        `${i.toString().padStart(2, "0")}:${(j * 30)
          .toString()
          .padStart(2, "0")}`
      );
    }
  }

  return timeSlots;
};
