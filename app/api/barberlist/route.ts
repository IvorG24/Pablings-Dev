import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const barberlist = await barberList();
    const result = {
      barberlist,
    };

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

async function barberList() {
  return prisma.slot.findMany({
    select: {
      barber_name: true,
    },
    distinct: ["barber_name"], // Ensure unique barber names
  });
}
