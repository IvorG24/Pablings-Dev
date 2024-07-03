// hooks/useSalesOverview.ts
import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "@/services/salesoverview";
import { ChartSalesData } from "@/lib/type";
export function useChartData() {
  return useQuery<ChartSalesData>({
    queryKey: ["ChartData"], // Use a unique key for the query
    queryFn: fetchChartData, // Function to fetch data
  });
}
