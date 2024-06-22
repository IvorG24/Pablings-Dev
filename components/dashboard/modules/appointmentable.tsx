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
interface AppointmentTableProps {
  variant: "pending" | "confirmed" | "declined";
}

const AppointmentTable = ({ variant }: AppointmentTableProps) => {
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
              <TableRow>
                <TableCell className="font-medium">BK001</TableCell>
                <TableCell>Pablings Gwap</TableCell>
                <TableCell>Perm, Color</TableCell>
                <TableCell>Barber 1</TableCell>
                <TableCell>01/24/2002</TableCell>
                <TableCell>8:30 - 10:00</TableCell>
                <TableCell>Mark Ivor Glorioso</TableCell>
                <TableCell>lhanivor@gmail.com</TableCell>
                <TableCell>09453726040</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>$250</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>...</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Approve</DropdownMenuItem>
                      <DropdownMenuItem>Decline</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}

      {variant === "confirmed" && (
        <>
          {" "}
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
              <TableRow>
                <TableCell className="font-medium">BK001</TableCell>
                <TableCell>Pablings Gwap</TableCell>
                <TableCell>Perm, Color</TableCell>
                <TableCell>Barber 1</TableCell>
                <TableCell>01/24/2002</TableCell>
                <TableCell>8:30 - 10:00</TableCell>
                <TableCell>Mark Ivor Glorioso</TableCell>
                <TableCell>lhanivor@gmail.com</TableCell>
                <TableCell>09453726040</TableCell>
                <TableCell>Confirmed</TableCell>
                <TableCell>$250</TableCell>
                <TableCell className="text-right">...</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}

      {variant === "declined" && (
        <>
          {" "}
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
              <TableRow>
                <TableCell className="font-medium">BK001</TableCell>
                <TableCell>Pablings Gwap</TableCell>
                <TableCell>Perm, Color</TableCell>
                <TableCell>Barber 1</TableCell>
                <TableCell>01/24/2002</TableCell>
                <TableCell>8:30 - 10:00</TableCell>
                <TableCell>Mark Ivor Glorioso</TableCell>
                <TableCell>lhanivor@gmail.com</TableCell>
                <TableCell>09453726040</TableCell>
                <TableCell>Declined</TableCell>
                <TableCell>$250</TableCell>
                <TableCell className="text-right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};

export default AppointmentTable;
