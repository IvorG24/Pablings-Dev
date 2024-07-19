"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import useRecordData from "@/hooks/useRecordData";
import AddVoucher from "./addVoucher";
import { Skeleton } from "@/components/ui/skeleton";

const RecordTable = () => {
  const {
    take,
    searchFilter,
    setSearchFilter,
    filteredData,
    skip,
    isError,
    error,
    isLoading,
    handlePageClick,
    handlePrevious,
    handleNext,
    totalPages,
    totalItems,
  } = useRecordData();
  if (isLoading) {
    return (
      <div className="flex flex-col gap-5">
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            className={`h-[50px] w-full ${
              index === 0
                ? ""
                : index === 1
                  ? "lg:max-w-6xl"
                  : index === 2
                    ? "lg:max-w-5xl"
                    : "lg:max-w-4xl"
            }`}
          />
        ))}
      </div>
    );
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Input
          className="w-full max-w-lg"
          type="text"
          placeholder="Search filter..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sales ID</TableHead>
            <TableHead>Barber</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Customer Email</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Extra Service</TableHead>
            <TableHead>Barber Sales</TableHead>
            <TableHead>Owner Sales</TableHead>
            <TableHead>Total Sales </TableHead>
            <TableHead>Time Slot</TableHead>
            <TableHead>Transaction Date</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((table) => (
            <TableRow key={table.sales_id}>
              <TableCell className="font-medium">
                SLS{" "}
                {table.sales_id
                  .substring(table.sales_id.length - 3)
                  .toUpperCase()}
              </TableCell>
              <TableCell>{table.staff}</TableCell>
              <TableCell>{table.customer_name}</TableCell>
              <TableCell>{table.customer_email}</TableCell>
              <TableCell>{table.service}</TableCell>
              <TableCell>
                {table.extraservices && table.extraservices.length > 0
                  ? table.extraservices.join(", ")
                  : "No extra services"}
              </TableCell>
              <TableCell>{table.staffsales}</TableCell>
              <TableCell>{table.ownersales}</TableCell>
              <TableCell>{table.totalsales}</TableCell>
              {!table.time_slot ? (
                <TableCell>Walk In</TableCell>
              ) : (
                <TableCell>{table.time_slot}</TableCell>
              )}
              <TableCell>{table.trasactiondate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>...</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <AddVoucher />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, page) => (
            <PaginationItem key={page}>
              <PaginationLink onClick={() => handlePageClick(page)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {skip + take < totalItems && (
            <PaginationItem>
              <PaginationNext onClick={handleNext} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default RecordTable;
