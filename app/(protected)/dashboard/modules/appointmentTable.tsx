"use client";
import React, { startTransition, useOptimistic, useState } from "react";
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
import { fetchAppointmentsList } from "@/services/appointments";
import { useQuery } from "@tanstack/react-query";
import { AppointmentTable } from "@/lib/type";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AppointmentResponse } from "@/lib/type";
import { ApproveAppointment } from "@/app/action/appointment";
import LoadingSpinner from "@/components/ui/spinner";
interface AppointmentTableProps {
  variant: "pending" | "confirmed" | "declined";
}

const AppointmentTableInfo = ({ variant }: AppointmentTableProps) => {
  const [take, setTake] = useState(15);
  const [isLoading, setIsloading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [appointment, setappointment] = useState<AppointmentTable[]>([]);

  const { data, error, isPending, isError } = useQuery<AppointmentResponse>({
    queryKey: ["Appointment", take, skip],
    queryFn: async () => {
      const response = await fetchAppointmentsList(take, skip);
      setTotalItems(response.total);
      setappointment(response.appointments);
      return response;
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const totalPages: number = Math.ceil(totalItems / take);
  const handlePrevious = () => setSkip((prev) => Math.max(prev - take, 0));
  const handleNext = () => setSkip((prev) => prev + take);
  const handlePageClick = (page: number) => setSkip(page * take);
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
              {appointment.map((table: AppointmentTable) => (
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
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>...</DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={async (e) => {
                            setIsloading(true);
                            e.preventDefault();
                            try {
                              await ApproveAppointment(table.appointment_id);
                              setIsloading(false);
                            } catch (e) {
                              setIsloading(false);
                              // Handle rollback or error state if needed
                            }
                          }}
                        >
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={async () => {
                            await ApproveAppointment(table.appointment_id);
                          }}
                        >
                          Decline
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
      )}

      {variant === "confirmed" && <> </>}

      {variant === "declined" && <> </>}
    </>
  );
};

export default AppointmentTableInfo;
