"use client";

import { useQuery } from "@tanstack/react-query";
import { Sales } from "@prisma/client";
import { fetchRecordsList } from "@/services/records";
import { RecordResponse } from "@/lib/type";
import React, { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";

const useRecordData = () => {
  const [take, setTake] = useState(15);
  const [skip, setSkip] = useState(0);
  const [searchFilter, setSearchFilter] = useState<string>("");

  // Define your search function
  const fetchRecords = async (filter: string) => {
    const response = await fetchRecordsList(take, skip, filter);
    return response;
  };

  // Debounce the fetchRecords function
  const debouncedFetchRecords = useCallback(
    debounce((filter: string) => fetchRecords(filter), 300), // Adjust 300ms delay as needed
    [take, skip]
  );

  // Fetch records based on the search filter
  const { data, error, isLoading, isError } = useQuery<RecordResponse>({
    queryKey: ["Sales", take, skip, searchFilter],
    queryFn: () => fetchRecords(searchFilter),
    staleTime: 60000, // Data is fresh for 1 minute
    gcTime: 300000, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Do not refetch when the window is focused
    refetchOnReconnect: false, // Do not refetch on reconnect
    refetchOnMount: false, // Do not refetch on mount
    enabled: true, // Always enabled to fetch data when query parameters change
    select: (response) => {
      // Update recordData and totalItems based on response
      return {
        records: response.records,
        total: response.total,
      };
    },
  });

  // Perform the actual fetch call after debouncing
  useEffect(() => {
    debouncedFetchRecords(searchFilter);
    // Clean up the debounce on component unmount
    return () => {
      debouncedFetchRecords.cancel();
    };
  }, [searchFilter, debouncedFetchRecords]);

  // Update recordData and totalItems based on the query result
  const recordData = data?.records || [];
  const totalItems = data?.total || 0;

  const totalPages: number = Math.ceil(totalItems / take);
  const handlePrevious = () => setSkip((prev) => Math.max(prev - take, 0));
  const handleNext = () => setSkip((prev) => prev + take);
  const handlePageClick = (page: number) => setSkip(page * take);

  const filteredData = recordData.filter((table) => {
    const staffMatches = table.staff
      .toLowerCase()
      .includes(searchFilter.toLowerCase());
    const serviceMatches = table.service
      .toLowerCase()
      .includes(searchFilter.toLowerCase());
    const dateMatches = table.trasactiondate.includes(searchFilter);

    return staffMatches || serviceMatches || dateMatches;
  });

  return {
    take,
    setTake,
    skip,
    setSkip,
    totalPages,
    handlePrevious,
    handleNext,
    handlePageClick,
    filteredData,
    totalItems,
    isLoading,
    searchFilter,
    setSearchFilter,
    isError,
    error,
  };
};

export default useRecordData;
