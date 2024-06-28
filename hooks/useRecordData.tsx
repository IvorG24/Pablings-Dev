"use client";
import { useQuery } from "@tanstack/react-query";
import { Sales } from "@prisma/client";
import { fetchRecordsList } from "@/services/records";
import { RecordResponse } from "@/lib/type";
import React, { useState } from "react";

const useRecordData = () => {
  const [take, setTake] = useState(15);
  const [skip, setSkip] = useState(0);
  const [recordData, setRecordData] = useState<Sales[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchFilter, setSearchFilter] = useState<string>("");

  const { data, error, isLoading, isError } = useQuery<RecordResponse>({
    queryKey: ["Sales", take, skip, searchFilter],
    queryFn: async () => {
      const response = await fetchRecordsList(take, skip, searchFilter);
      setRecordData(response.records);
      setTotalItems(response.total);
      return response;
    },
  });
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
