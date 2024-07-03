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
  const [recordData, setRecordData] = useState<Sales[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchFilter, setSearchFilter] = useState<string>("");

  // Define your search function
  const fetchRecords = async (filter: string) => {
    const response = await fetchRecordsList(take, skip, filter);
    setRecordData(response.records);
    setTotalItems(response.total);
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
    // Add `searchFilter` to the dependency array to refetch when it changes
    enabled: !!searchFilter,
  });

  // Perform the actual fetch call after debouncing
  useEffect(() => {
    debouncedFetchRecords(searchFilter);
    // Clean up the debounce on component unmount
    return () => {
      debouncedFetchRecords.cancel();
    };
  }, [searchFilter, debouncedFetchRecords]);

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
    skip,
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
  };
};

export default useRecordData;
