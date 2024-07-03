import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  addWeeks,
  addDays,
  startOfDay,
  endOfDay,
  isSameMonth,
} from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  // const session = await auth();
  // if (!session) {
  //   return NextResponse.json(
  //     { error: "You are not authenticated" },
  //     { status: 500 }
  //   );
  // }
  try {
    const currentYear = new Date().getFullYear();
    const currentFormatted = format(new Date(), "yyyy-MM-dd");
    const monthlySalesData: { totalSales: number }[] = [];
    const salesData = await prisma.sales.groupBy({
      by: ["trasactiondate"],
      _sum: {
        totalsales: true,
      },
      where: {
        trasactiondate: {
          gte: new Date(currentYear, 0, 1).toISOString().split("T")[0], // "YYYY-MM-DD" format
          lte: new Date(currentYear, 11, 31).toISOString().split("T")[0], // "YYYY-MM-DD" format
        },
      },
      orderBy: {
        trasactiondate: "desc",
      },
    });

    for (let month = 1; month <= 12; month++) {
      const monthlyData = salesData.find(
        (data) => new Date(data.trasactiondate).getMonth() + 1 === month,
      );
      monthlySalesData.push({
        totalSales: monthlyData?._sum.totalsales || 0,
      });
    }

    const now = new Date();
    const startOfMonthDate = startOfMonth(now);

    // Generate weeks of the current month
    const weeks = [];
    for (let i = 0; ; i++) {
      // Calculate the start and end dates for the current week
      const startOfWeekDate = addWeeks(startOfMonthDate, i);
      const endOfWeekDate = endOfWeek(startOfWeekDate, { weekStartsOn: 1 });

      // Break if the week extends beyond the current month
      if (!isSameMonth(startOfWeekDate, now)) break;

      // Add the week data to the weeks array
      weeks.push({
        weekNumber: i + 1,
        start: format(startOfWeekDate, "yyyy-MM-dd"),
        end: format(endOfWeekDate, "yyyy-MM-dd"),
      });
    }
    const startOfWeekDate = startOfWeek(now, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(startOfWeekDate, { weekStartsOn: 1 });

    const dailysalesdata = await Promise.all(
      Array.from({ length: 7 }, (_, i) => {
        const currentDate = addDays(startOfWeekDate, i);
        return prisma.sales
          .aggregate({
            _sum: {
              totalsales: true,
            },
            where: {
              trasactiondate: {
                gte: startOfDay(currentDate).toISOString(),
                lte: endOfDay(currentDate).toISOString(),
              },
            },
          })
          .then(({ _sum: { totalsales } }) => ({
            totalSales: totalsales || 0, // Only include total sales
          }));
      }),
    );

    const weeklySalesData = await Promise.all(
      weeks.map(async (week) => {
        const {
          _sum: { totalsales },
        } = await prisma.sales.aggregate({
          _sum: {
            totalsales: true,
          },
          where: {
            trasactiondate: {
              gte: week.start,
              lte: week.end,
            },
          },
        });

        return {
          weeklyLabel: `Week ${week.weekNumber}`, // Label for the week
          totalSales: totalsales || 0, // Total sales for the week
        };
      }),
    );
    const monthlySales = monthlySalesData.map(
      (monthData) => monthData.totalSales,
    );
    const doughnutData = await prisma.sales.groupBy({
      by: ["staff"],
      _count: {
        staff: true,
      },
      where: {
        trasactiondate: {
          gte: startOfWeek(currentFormatted, { weekStartsOn: 1 }).toISOString(),
          lte: endOfWeek(currentFormatted, { weekStartsOn: 1 }).toISOString(),
        },
      },
    });
    const dailySalesData = dailysalesdata.map(
      (dailyData) => dailyData.totalSales,
    );
    return NextResponse.json({
      monthlySales,
      weeklySalesData,
      doughnutData,
      dailySalesData,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 },
    );
  }
}
