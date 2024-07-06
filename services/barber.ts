import { getSession } from "next-auth/react";

export async function fetchBarberList() {
  const session = await getSession();
  if (!session) {
    throw new Error("You are not authenticated");
  }

  try {
    const response = await fetch(`/api/barber`, {});
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

export async function fetchbarberlistData() {
  try {
    const response = await fetch(`/api/barberlist`);
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
