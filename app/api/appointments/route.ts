// Import statements
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, status as Status } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Request parsing and validation
    const { searchParams } = new URL(req.url);
    const take: number = parseInt(searchParams.get("take") || "15"); // Default take value
    const skip: number = parseInt(searchParams.get("skip") || "0"); // Default skip value
    const statusString: string | null = searchParams.get("status");
    if (isNaN(take) || isNaN(skip) || take <= 0 || skip < 0) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 },
      );
    }

    // Validate and convert statusString to Status type
    let status: Status | undefined;
    if (
      statusString &&
      Object.values(Status).includes(statusString as Status)
    ) {
      status = statusString as Status;
    }

    // Fetch appointments based on different statuses
    const pendingAppointments = await fetchAppointments(
      Status.Pending,
      take,
      skip,
    );
    const declinedAppointments = await fetchAppointments(
      Status.Declined,
      take,
      skip,
    );
    const confirmedAppointments = await fetchAppointments(
      Status.Confirm,
      take,
      skip,
    );

    const totalAppointments = await countAppointments(status || Status.Pending);

    const result = {
      total: totalAppointments,
      pendingAppointments: [...pendingAppointments],
      declinedAppointments: [...declinedAppointments],
      confirmedAppointments: [...confirmedAppointments],
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 },
    );
  } finally {
    // Prisma disconnection
    await prisma.$disconnect();
  }
}

// Helper function to fetch appointments based on status
async function fetchAppointments(
  status: Status,
  take: number,
  skip: number,
): Promise<any[]> {
  return prisma.appointment.findMany({
    where: { status: status },
    orderBy: { date: "desc" },
    take,
    skip,
  });
}

async function countAppointments(status: Status): Promise<number> {
  return prisma.appointment.count({
    where: { status: status },
  });
}
