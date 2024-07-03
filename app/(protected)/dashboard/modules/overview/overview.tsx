"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChartComponent from "@/components/dashboard/modules/chart";
import { useSalesOverview } from "@/hooks/useSalesOverview";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
const SalesOverview = () => {
  const { data, error, isLoading, isError } = useSalesOverview();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Destructure the data
  const {
    todaysalesAmount,
    todaycustomer,
    totalsalesAmount,
    totalcustomer,
    todaycustomerlist,
  } = data!;

  return (
    <section className="grid grid-cols-7 gap-5 min-h-screen">
      <div className="col-span-5 flex flex-col gap-5">
        <div className="flex gap-5">
          <Card className="w-full max-w-xs">
            <CardHeader>
              <CardTitle>Today Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{todaysalesAmount}</p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-xs">
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{totalsalesAmount}</p>
            </CardContent>
          </Card>
          <Card className="w-full max-w-xs">
            <CardHeader>
              <CardTitle>Today Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{todaycustomer}</p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-xs">
            <CardHeader>
              <CardTitle>Total Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{totalcustomer}</p>
            </CardContent>
          </Card>
        </div>

        <div className="border-2 border-yellow-500 h-full min-h-[550px] rounded-lg">
          {" "}
          <ChartComponent variant="line" />
        </div>

        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
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
