// hooks/useSalesOverview.ts
import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "@/services/salesoverview";
import { BarBerListData, ChartSalesData, TimeSlotData } from "@/lib/type";
import { fetchTimeSlot } from "@/services/timeslot";
import { fetchbarberlistData } from "@/services/barber";
export function useChartData() {
  return useQuery<ChartSalesData>({
    queryKey: ["ChartData"], // Use a unique key for the query
    queryFn: fetchChartData, // Function to fetch data
    staleTime: 60000, // Data is fresh for 1 minute
    gcTime: 300000, // Cache data for 5 minutes
  });
}
export function useTimeSlotData(name: string) {
  return useQuery<TimeSlotData>({
    queryKey: ["Timeslot", name],
    queryFn: () => fetchTimeSlot(name), // Pass the `name` parameter to the `fetchTimeSlot` function
  });
}

export function useBarberListData() {
  return useQuery<BarBerListData>({
    queryKey: ["Barberlist"], // Provide an empty string or a unique key for the query
    queryFn: fetchbarberlistData, // Pass the `name` parameter to the `fetchTimeSlot` function
  });
}
