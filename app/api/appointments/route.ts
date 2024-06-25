import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const dynamic = "force dynamic";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get("take") || "20"); // Default take value
    const skip = parseInt(searchParams.get("skip") || "0"); // Default skip value

    // Validate if take and skip are within reasonable limits
    if (isNaN(take) || isNaN(skip) || take <= 0 || skip < 0) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: { status: "Pending" },
      orderBy: { date: "desc" },
      take: take,
      skip: skip,
    });
    const totalPendingAppointments = await prisma.appointment.count({
      where: { status: "Pending" },
    });

    const result = {
      total: totalPendingAppointments,
      appointments: appointments,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
