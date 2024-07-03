// Import statements
import { NextRequest, NextResponse } from "next/server";
import { Barber, PrismaClient, Sales } from "@prisma/client";
import { auth } from "@/auth";
const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "You are not authenticated" },
      { status: 500 },
    );
  }
  try {
    const result = await findBarber();

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

async function findBarber() {
  return prisma.barber.findMany({});
}
