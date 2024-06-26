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
import { Button } from "@/components/ui/button";
import useRecordData from "@/hooks/useRecordData";

const RecordTable = () => {
  const {
    take,
    searchFilter,
    setSearchFilter,
    filteredData,
    skip,
    handlePageClick,
    handlePrevious,
    handleNext,
    totalPages,
    totalItems,
  } = useRecordData();
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
        <Button>Add Walk in</Button>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sales ID</TableHead>
            <TableHead>Barber</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Extra Service</TableHead>
            <TableHead>Barber Sales</TableHead>
            <TableHead>Owner Sales</TableHead>
            <TableHead>Total Sales </TableHead>
            <TableHead>Transaction Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((table) => (
            <TableRow key={table.sales_id}>
              <TableCell className="font-medium">
                SLS {table.sales_id.substring(table.sales_id.length - 3)}
              </TableCell>
              <TableCell>{table.staff}</TableCell>
              <TableCell>{table.service}</TableCell>
              <TableCell>
                {table.extraservices && table.extraservices.length > 0
                  ? table.extraservices.join(", ")
                  : "No extra services"}
              </TableCell>
              <TableCell>{table.staffsales}</TableCell>
              <TableCell>{table.ownersales}</TableCell>
              <TableCell>{table.totalsales}</TableCell>
              <TableCell>{table.trasactiondate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>...</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {}}>
                      Approve
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
