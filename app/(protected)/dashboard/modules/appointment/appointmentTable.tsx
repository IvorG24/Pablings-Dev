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
  PaginationEllipsis,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useAppointmenData from "@/hooks/useAppointmenData";
import { Appointment } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

interface AppointmentTableProps {
  variant: "pending" | "confirmed" | "declined";
}

const AppointmentTable = ({ variant }: AppointmentTableProps) => {
  const {
    appointmentsData,
    totalItems,
    take,
    skip,
    appointmentAction,
    totalPages,
    handlePrevious,
    handlePageClick,
    handleNext,
    isLoading,
    isError,
    error,
  } = useAppointmenData({ variant });

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
      {variant === "pending" && (
        <>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Book</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Extra Service</TableHead>
                <TableHead>Barber</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Name </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone No.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointmentsData?.pendingAppointments.map(
                (table: Appointment) => (
                  <TableRow key={table.appointment_id}>
                    <TableCell className="font-medium">
                      BK{table.BookingNumber}
                    </TableCell>
                    <TableCell>{table.service}</TableCell>
                    <TableCell>
                      {" "}
                      {table.extraservices && table.extraservices.length > 0
                        ? table.extraservices.join(", ")
                        : "No extra services"}
                    </TableCell>
                    <TableCell>{table.barber}</TableCell>
                    <TableCell>{table.date}</TableCell>
                    <TableCell>{table.time}</TableCell>
                    <TableCell>{table.name}</TableCell>
                    <TableCell>{table.email}</TableCell>
                    <TableCell>{table.phone}</TableCell>
                    <TableCell>{table.status}</TableCell>
                    <TableCell>{table.totalprice}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>...</DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>My Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              appointmentAction(
                                table.appointment_id,
                                "approve"
                              );
                            }}
                          >
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              appointmentAction(
                                table.appointment_id,
                                "decline"
                              );
                            }}
                          >
                            Decline
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              )}
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
      )}

      {variant === "confirmed" && (
        <>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Book</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Extra Service</TableHead>
                <TableHead>Barber</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Name </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone No.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointmentsData?.confirmedAppointments.map(
                (table: Appointment) => (
                  <TableRow key={table.appointment_id}>
                    <TableCell className="font-medium">
                      BK{table.BookingNumber}
                    </TableCell>
                    <TableCell>{table.service}</TableCell>
                    <TableCell>
                      {" "}
                      {table.extraservices && table.extraservices.length > 0
                        ? table.extraservices.join(", ")
                        : "No extra services"}
                    </TableCell>
                    <TableCell>{table.barber}</TableCell>
                    <TableCell>{table.date}</TableCell>
                    <TableCell>{table.time}</TableCell>
                    <TableCell>{table.name}</TableCell>
                    <TableCell>{table.email}</TableCell>
                    <TableCell>{table.phone}</TableCell>
                    <TableCell>{table.status}</TableCell>
                    <TableCell>{table.totalprice}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>...</DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>My Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              appointmentAction(
                                table.appointment_id,
                                "confirm-decline"
                              );
                            }}
                          >
                            Decline
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              )}
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
              {totalItems < 5 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </>
      )}

      {variant === "declined" && (
        <>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Book</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Extra Service</TableHead>
                <TableHead>Barber</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Name </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone No.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointmentsData?.declinedAppointments.map(
                (table: Appointment) => (
                  <TableRow key={table.appointment_id}>
                    <TableCell className="font-medium">
                      BK{table.BookingNumber}
                    </TableCell>
                    <TableCell>{table.service}</TableCell>
                    <TableCell>{table.extraservices.join(", ")}</TableCell>
                    <TableCell>{table.barber}</TableCell>
                    <TableCell>{table.date}</TableCell>
                    <TableCell>{table.time}</TableCell>
                    <TableCell>{table.name}</TableCell>
                    <TableCell>{table.email}</TableCell>
                    <TableCell>{table.phone}</TableCell>
                    <TableCell>{table.status}</TableCell>
                    <TableCell>{table.totalprice}</TableCell>
                  </TableRow>
                )
              )}
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
      )}
    </>
  );
};

export default AppointmentTable;
