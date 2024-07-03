// hooks/useSalesOverview.ts
import { useQuery } from "@tanstack/react-query";
import { fetchSalesOverview } from "@/services/salesoverview";
import { SalesOverviewData } from "@/lib/type";
export function useSalesOverview() {
  return useQuery<SalesOverviewData>({
    queryKey: ["SalesOverview"], // Use a unique key for the query
    queryFn: fetchSalesOverview, // Function to fetch data
  });
}
