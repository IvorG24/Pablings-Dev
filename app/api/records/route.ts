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
      { status: 401 } // Changed to 401 for unauthorized access
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const searchFilter: string = searchParams.get("search") || "";
    const take: number = parseInt(searchParams.get("take") || "15");
    const skip: number = parseInt(searchParams.get("skip") || "0");

    if (isNaN(take) || isNaN(skip) || take <= 0 || skip < 0) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 } // Changed to 400 for bad request
      );
    }

    // Fetch records and count in parallel
    const [record, totalAppointments] = await Promise.all([
      fetchRecords(searchFilter, take, skip),
      countRecords(searchFilter),
    ]);

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

async function fetchRecords(
  searchFilter: string,
  take: number,
  skip: number
): Promise<Sales[]> {
  return prisma.sales.findMany({
    where: searchFilter
      ? {
          OR: [
            { staff: { contains: searchFilter, mode: "insensitive" } },
            { service: { contains: searchFilter, mode: "insensitive" } },
            { trasactiondate: { contains: searchFilter } },
          ],
        }
      : undefined,
    orderBy: { trasactiondate: "desc" },
    take,
    skip,
  });
}

async function countRecords(searchFilter: string): Promise<number> {
  return prisma.sales.count({
    where: searchFilter
      ? {
          OR: [
            { staff: { contains: searchFilter, mode: "insensitive" } },
            { service: { contains: searchFilter, mode: "insensitive" } },
            { trasactiondate: { contains: searchFilter } },
          ],
        }
      : undefined,
  });
}
