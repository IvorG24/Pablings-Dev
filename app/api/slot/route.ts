import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get("name") || undefined;

    const barberslots = await findBarber(name);

    const result = {
      barberslots,
    };

    if (barberslots.length === 0) {
      return NextResponse.json(
        { message: "No slots found for the specified barber name" },
        { status: 404 } // 404 Not Found if no slots are found
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch slots" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Ensure Prisma Client is disconnected
  }
}

async function findBarber(name?: string) {
  return prisma.slot.findMany({
    select: {
      barber_name: true,
      time_slot: true,
      day_of_week: true,
    },
    where: {
      barber_name: name,
      isAvailable: true,
    },
  });
}
