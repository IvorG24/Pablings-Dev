import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "You are not authenticated" },
      { status: 500 },
    );
  }
  try {
    const currentFormatted = format(new Date(), "yyyy-MM-dd");
    const todaysales = await prisma.sales.aggregate({
      _sum: {
        totalsales: true,
      },
      where: {
        trasactiondate: currentFormatted,
      },
    });

    const todaycustomer = await prisma.sales.count({
      where: {
        trasactiondate: currentFormatted,
      },
    });

    const totalsales = await prisma.sales.aggregate({
      _sum: {
        totalsales: true,
      },
    });

    const totalcustomer = await prisma.sales.count({});

    const todaycustomerlist = await prisma.sales.findMany({
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
    });

    // Format results
    const totalsalesAmount = totalsales._sum.totalsales || 0;
    const todaysalesAmount = todaysales._sum.totalsales || 0;

    return NextResponse.json({
      todaysalesAmount,
      todaycustomer,
      totalsalesAmount,
      totalcustomer,
      todaycustomerlist,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 },
    );
  }
}
