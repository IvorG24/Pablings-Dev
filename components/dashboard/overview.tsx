import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardLineChart from "./modules/chart";
import ChartComponent from "./modules/chart";
const SalesOverview = () => {
  return (
    <section className="grid grid-cols-7 gap-5 min-h-screen">
      <div className="col-span-5 flex flex-col gap-5">
        <div className="flex gap-5">
          <Card className="w-full max-w-xs">
            <CardHeader>
              <CardTitle>Today Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p>P100000</p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-xs">
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p>P100000</p>
            </CardContent>
          </Card>
          <Card className="w-full max-w-xs">
            <CardHeader>
              <CardTitle>Today Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>P100000</p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-xs">
            <CardHeader>
              <CardTitle>Total Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>P100000</p>
            </CardContent>
          </Card>
        </div>

        <div className="border-2 border-yellow-500 h-full max-h-[450px] rounded-lg">
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
            <CardTitle>Barber Count</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartComponent variant="doughnut" />
          </CardContent>
        </Card>

        <Card className="w-full h-full ">
          <CardHeader>
            <CardTitle>Today Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p>P100000</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SalesOverview;
