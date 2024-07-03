import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { ChartSalesData, SalesOverviewData } from "@/lib/type";

export async function fetchSalesOverview(): Promise<SalesOverviewData> {
  const session = await getSession();
  if (!session) {
    throw new Error("No session or access token found");
  }
  try {
    const response = await fetch(`/api/salesoverview`, {
      method: "GET", // Specify the GET method
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch records");
    }

    const data: SalesOverviewData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
}

export async function fetchChartData(): Promise<ChartSalesData> {
  const session = await getSession();
  if (!session) {
    throw new Error("No session or access token found");
  }
  try {
    const response = await fetch(`/api/chartdata`, {
      method: "GET", // Specify the GET method
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch records");
    }

    const data: ChartSalesData = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
}
