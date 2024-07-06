import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { addDays, format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "You are not authenticated" },
      { status: 401 } // Changed status code to 401 for unauthorized access
    );
  }

  try {
    const currentFormatted = format(new Date(), "yyyy-MM-dd");
    const tomorrowFormatted = format(addDays(new Date(), 1), "yyyy-MM-dd");
    const [
      todaysales,
      todaycustomer,
      totalsales,
      totalcustomer,
      todaycustomerlist,
      tomorrowcustomerlist,
    ] = await Promise.all([
      prisma.sales.aggregate({
        _sum: {
          totalsales: true,
        },
        where: {
          trasactiondate: currentFormatted,
        },
      }),
      prisma.sales.count({
        where: {
          trasactiondate: currentFormatted,
        },
      }),
      prisma.sales.aggregate({
        _sum: {
          totalsales: true,
        },
      }),
      prisma.sales.count({}),
      prisma.sales.findMany({
        select: {
          customer_name: true,
          staff: true,
          service: true,
          extraservices: true,
          time_slot: true,
        },
        where: {
          trasactiondate: currentFormatted,
        },
        orderBy: {
          trasactiondate: "asc",
        },
      }),
      prisma.sales.findMany({
        select: {
          customer_name: true,
          staff: true,
          service: true,
          extraservices: true,
          time_slot: true,
        },
        where: {
          trasactiondate: tomorrowFormatted,
        },
        orderBy: {
          trasactiondate: "asc",
        },
      }),
    ]);

    // Format results
    const totalsalesAmount = totalsales._sum.totalsales || 0;
    const todaysalesAmount = todaysales._sum.totalsales || 0;

    return NextResponse.json({
      todaysalesAmount,
      todaycustomer,
      totalsalesAmount,
      totalcustomer,
      todaycustomerlist,
      tomorrowcustomerlist,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}
