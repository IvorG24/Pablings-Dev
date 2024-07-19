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
import { Skeleton } from "@/components/ui/skeleton";
import { TfiFaceSad } from "react-icons/tfi";
const SalesOverview = () => {
  const { data, error, isLoading, isError, tomorrowFormatted } =
    useSalesOverview();

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 lg:grid-cols-7 gap-5 min-h-screen">
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row gap-5">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-[120px] w-full lg:max-w-sm" />
            ))}
          </div>
          <div className="  h-full lg:max-h-[550px] rounded-lg">
            <Skeleton className="border-2 border-yellow-500 h-full lg:min-h-[50px] rounded-lg" />
          </div>

          <Skeleton className="h-[300px] lg:h-[350px] w-full " />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-5">
          <Skeleton className="w-full h-full lg:min-h-[550px]" />
          <Skeleton className="h-[350px] lg:h-[400px] w-full " />
        </div>
      </section>
    );
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
    <section className="grid grid-cols-1 lg:grid-cols-7 gap-5 min-h-screen">
      <div className="lg:col-span-5 flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row gap-5">
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

        <div className="border-2 border-yellow-500 h-full lg:min-h-[550px] rounded-lg">
          {" "}
          <ChartComponent variant="line" />
        </div>

        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Tomorrow Clients for {tomorrowFormatted}</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[300px] lg:h-[350px] w-full ">
            {tomorrowcustomerlist.length > 0 ? (
              <>
                {" "}
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

                      <p className="text-sm">
                        Client: {customer.customer_name}
                      </p>
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
              </>
            ) : (
              <div className=" h-full min-h-[350px] flex flex-col gap-y-6 items-center justify-center  text-stone-600">
                <h1 className="text-md lg:text-xl font-bold">
                  No clients for tomorrow
                </h1>
                <TfiFaceSad className="text-[200px] " />
              </div>
            )}
          </ScrollArea>
        </Card>
      </div>

      <div className="lg:col-span-2 flex flex-col gap-5">
        <Card className="w-full h-full lg:min-h-[600px]">
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
          <ScrollArea className="h-[350px] lg:h-[400px] w-full ">
            {todaycustomerlist.length > 0 ? (
              <>
                {" "}
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

                      <p className="text-sm">
                        Client: {customer.customer_name}
                      </p>
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
              </>
            ) : (
              <div className=" h-full min-h-[350px] flex flex-col gap-y-6 items-center justify-center  text-stone-600">
                <h1 className="text-md lg:text-xl font-bold">
                  No clients for today
                </h1>
                <TfiFaceSad className="text-[200px] " />
              </div>
            )}
          </ScrollArea>
        </Card>
      </div>
    </section>
  );
};

export default SalesOverview;
