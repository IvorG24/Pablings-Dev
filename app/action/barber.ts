"use server";
import fs from "fs";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { queryClient } from "@/lib/query";
import { revalidatePath } from "next/cache";
import { error } from "console";

export async function addBarber(formdata: FormData) {
  try {
    // Ensure user is authenticated
    const session = await auth();
    if (!session) {
      throw new Error("You are not authenticated");
    }

    // Extract form data values
    const name = formdata.get("name");
    const email = formdata.get("email");
    const phone = formdata.get("phonenumber");
    const imageFile = formdata.get("image") as string;

    const response = await prisma.barber.create({
      data: {
        userId: session.user.id,
        name: name as string,
        email: email as string,
        phone: phone as string,
        image: imageFile, // Store the image as a Buffer (byte array)
      },
    });
    await queryClient.invalidateQueries({
      queryKey: ["Barber"],
    });
    console.log("Barber with name", name, "has been created");
    return response; // Return the created barber record
  } catch (error) {
    console.error("Error adding barber:", error);
    throw error; // Throw the error to handle it elsewhere
  }
}

export async function addBarberSchedule(formdata: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("You are not authenticated");
  }

  const barber = formdata.get("barberName") as string;
  const slot = formdata.get("slot") as string;
  const day = formdata.get("day") as unknown as string;

  const sameslot = await prisma.slot.findMany({
    where: {
      barber_name: barber,
      time_slot: slot,
      day_of_week: day,
    },
  });

  if (sameslot.length > 0) {
    throw new Error("Slot occupied.");
  }
  const response = await prisma.slot.create({
    data: {
      date: "",
      barber_name: barber,
      day_of_week: day,
      time_slot: slot,
    },
  });

  if (!response) {
    throw new Error(`${error}`);
  }
  console.log("Slot added with to", barber);
  return response;
}
