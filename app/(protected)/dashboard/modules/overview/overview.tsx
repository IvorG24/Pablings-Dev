"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChartComponent from "@/components/dashboard/modules/chart";
import { useSalesOverview } from "@/hooks/useSalesOverview";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import DataCard from "@/components/dashboard/modules/datacard";
import { MdPerson } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import { IoIosCut } from "react-icons/io";
import { TbCurrencyPeso } from "react-icons/tb";
import { addDays, format } from "date-fns";
const SalesOverview = () => {
  const { data, error, isLoading, isError, tomorrowFormatted } =
    useSalesOverview();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {`${error}`}</div>;
  }

  const {
    todaysalesAmount,
    todaycustomer,
    totalsalesAmount,
    totalcustomer,
    todaycustomerlist,
    tomorrowcustomerlist,
  } = data!;

  return (
    <section className="grid grid-cols-7 gap-5 min-h-screen">
      <div className="col-span-5 flex flex-col gap-5">
        <div className="flex gap-5">
          <DataCard
            label="Today Sales"
            value={todaysalesAmount}
            icon={<TbCurrencyPeso className="font-bold text-4xl" />}
            secondaryicon={
              <FaCoins className="font-bold text-3xl text-yellow-500" />
            }
          />

          <DataCard
            label="Overall Sales"
            value={totalsalesAmount}
            icon={<TbCurrencyPeso className="font-bold text-4xl" />}
            secondaryicon={
              <FaCoins className="font-bold text-3xl text-yellow-500" />
            }
          />
          <DataCard
            label="Today Customers"
            value={todaycustomer}
            icon={<MdPerson className="font-bold text-4xl" />}
            secondaryicon={
              <IoIosCut className="font-bold text-3xl text-yellow-500" />
            }
          />
          <DataCard
            label="Total Customers"
            value={totalcustomer}
            icon={<MdPerson className="font-bold text-4xl" />}
            secondaryicon={
              <IoIosCut className="font-bold text-3xl text-yellow-500" />
            }
          />
        </div>

        <div className="border-2 border-yellow-500 h-full min-h-[550px] rounded-lg">
          {" "}
          <ChartComponent variant="line" />
        </div>

        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Tomorrow Clients for {tomorrowFormatted}</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[350px] w-full ">
            {tomorrowcustomerlist.map((customer, index) => (
              <div
                className="mx-8 flex justify-between items-start p-2 border-b"
                key={index}
              >
                <div className="flex flex-col gap-1">
                  {customer.time_slot === "" || null ? (
                    <p className="text-sm">Time: {customer.time_slot}</p>
                  ) : (
                    <p className="text-sm">Walk In</p>
                  )}

                  <p className="text-sm">Client: {customer.customer_name}</p>
                  <p className="text-sm">Barber: {customer.staff}</p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge>{customer.service}</Badge>
                  {customer.extraservices.length > 0 ? (
                    <Badge>{customer.extraservices.join(", ")}</Badge>
                  ) : (
                    "No extras"
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </Card>
      </div>

      <div className="col-span-2 flex flex-col gap-5">
        <Card className="w-full h-full min-h-[550px]">
          <CardHeader>
            <CardTitle>Weekly Client Count</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartComponent variant="doughnut" />
          </CardContent>
        </Card>

        <Card className="w-full h-full ">
          <CardHeader>
            <CardTitle>Today Customer</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[400px] w-full ">
            {todaycustomerlist.map((customer, index) => (
              <div
                className="mx-8 flex justify-between items-start p-2 border-b"
                key={index}
              >
                <div className="flex flex-col gap-1">
                  {customer.time_slot === "" || null ? (
                    <p className="text-sm">Time: {customer.time_slot}</p>
                  ) : (
                    <p className="text-sm">Walk In</p>
                  )}

                  <p className="text-sm">Client: {customer.customer_name}</p>
                  <p className="text-sm">Barber: {customer.staff}</p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge>{customer.service}</Badge>
                  {customer.extraservices.length > 0 ? (
                    <Badge>{customer.extraservices.join(", ")}</Badge>
                  ) : (
                    "No extras"
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </Card>
      </div>
    </section>
  );
};

export default SalesOverview;
