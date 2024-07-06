// hooks/useSalesOverview.ts
import { useQuery } from "@tanstack/react-query";
import { fetchSalesOverview } from "@/services/salesoverview";
import { SalesOverviewData } from "@/lib/type";
import { addDays, format } from "date-fns";

export function useSalesOverview() {
  const tomorrow = addDays(new Date(), 1);
  const tomorrowFormatted = format(tomorrow, "yyyy-MM-dd");

  // Return the useQuery hook along with tomorrowFormatted
  const { data, isLoading, isError, error } = useQuery<SalesOverviewData>({
    queryKey: ["SalesOverview"], // Include tomorrowFormatted in the query key
    queryFn: () => fetchSalesOverview(), // Pass tomorrowFormatted to fetchSalesOverview
  });

  return {
    data,
    isLoading,
    isError,
    error,
    tomorrowFormatted,
  };
}
