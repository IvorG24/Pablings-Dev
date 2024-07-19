// hooks/useSalesOverview.ts
import { useQuery } from "@tanstack/react-query";
import { fetchSalesOverview } from "@/services/salesoverview";
import { SalesOverviewData } from "@/lib/type";
import { addDays, format } from "date-fns";

export function useSalesOverview() {
  const tomorrow = addDays(new Date(), 1);
  const tomorrowFormatted = format(tomorrow, "yyyy-MM-dd");

  // Fetch data function
  const fetchOverview = async (): Promise<SalesOverviewData> => {
    return fetchSalesOverview(); // Call the API function
  };

  // Return the useQuery hook along with tomorrowFormatted
  const { data, isLoading, isError, error } = useQuery<SalesOverviewData>({
    queryKey: ["SalesOverview"], // Include tomorrowFormatted if needed
    queryFn: fetchOverview, // Pass fetchOverview as the query function
    staleTime: 60000, // Data is fresh for 1 minute
    gcTime: 300000, // Cache data for 5 minutes
  });

  return {
    data,
    isLoading,
    isError,
    error,
    tomorrowFormatted,
  };
}
