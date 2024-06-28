import { RecordResponse } from "@/lib/type";

export async function fetchRecordsList(
  take: number = 15,
  skip: number = 0,
  searchFilter: string = "",
): Promise<RecordResponse> {
  try {
    let url = `/api/records?take=${take}&skip=${skip}`;
    if (searchFilter) {
      url += `&search=${encodeURIComponent(searchFilter)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch records");
    }

    const data: RecordResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
}
