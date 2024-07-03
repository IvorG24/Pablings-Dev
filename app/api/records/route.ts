// Import statements
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Sales } from "@prisma/client";
import { auth } from "@/auth";
const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "You are not authenticated" },
      { status: 500 }
    );
  }
  try {
    const { searchParams } = new URL(req.url);
    const searchFilter: string = searchParams.get("search") || ""; // Search filter parameter

    let record: Sales[];
    let totalAppointments: number;

    if (searchFilter) {
      record = await fetchRecordsWithSearch(searchFilter);
      totalAppointments = record.length; // Total count based on filtered records
    } else {
      const take: number = parseInt(searchParams.get("take") || "15"); // Default take value
      const skip: number = parseInt(searchParams.get("skip") || "0"); // Default skip value

      if (isNaN(take) || isNaN(skip) || take <= 0 || skip < 0) {
        return NextResponse.json(
          { error: "Invalid pagination parameters" },
          { status: 400 }
        );
      }

      record = await fetchRecords(take, skip);
      totalAppointments = await countRecords();
    }

    const result = {
      total: totalAppointments,
      records: record,
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

async function fetchRecords(take: number, skip: number): Promise<Sales[]> {
  return prisma.sales.findMany({
    orderBy: { trasactiondate: "desc" },
    take,
    skip,
  });
}

async function countRecords(): Promise<number> {
  return prisma.sales.count({});
}

async function fetchRecordsWithSearch(searchFilter: string): Promise<Sales[]> {
  return prisma.sales.findMany({
    where: {
      OR: [
        { staff: { contains: searchFilter, mode: "insensitive" } },
        { service: { contains: searchFilter, mode: "insensitive" } },
        { trasactiondate: { contains: searchFilter } },
      ],
    },
    orderBy: { trasactiondate: "desc" },
  });
}
