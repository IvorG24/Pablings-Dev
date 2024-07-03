"use client";
import React, { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSalesOverview } from "@/hooks/useSalesOverview";
import { useChartData } from "@/hooks/useChartData";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Yearly data

// Monthly data

// Weekly data (changed from Daily)
const weeklyData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Weekly Sales",
      data: [12, 19, 3, 5, 2, 3, 9],
      fill: true,
      borderColor: "rgb(255, 99, 132)",
      tension: 0.1,
    },
  ],
};

interface CharComponentProps {
  variant: "doughnut" | "line";
}
const ChartComponent = ({ variant }: CharComponentProps) => {
  const [position, setPosition] = useState("Yearly");
  const { data, error, isLoading, isError } = useChartData();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const { monthlySales, doughnutData, weeklySalesData } = data!;

  const doughnutlabels = doughnutData.map((group) => group.staff);
  const doughnutdata = doughnutData.map((group) => group._count.staff);
  const weeklydatalabels = weeklySalesData.map((group) => group.weeklyLabel);
  const weeklydatasales = weeklySalesData.map((group) => group.totalSales);

  const dougnutdata = {
    labels: doughnutlabels,
    datasets: [
      {
        label: "# of Votes",
        data: doughnutdata,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const yearlyData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Yearly Sales",
        data: monthlySales,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const monthlyData = {
    labels: weeklydatalabels, // Days of the month
    datasets: [
      {
        label: "Weekly Sales",
        data: weeklydatasales,
        fill: true,
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      {variant === "line" ? (
        <>
          {" "}
          <div className="m-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{position}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Time Frame</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="Yearly">
                    Yearly
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Monthly">
                    Monthly
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Weekly">
                    Weekly
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-8 p-4 ">
            <div className="h-full w-full flex items-center justify-center">
              {position === "Yearly" && (
                <Line
                  className="h-full w-full max-h-[450px] max-w-[75rem] "
                  data={yearlyData}
                />
              )}
              {position === "Monthly" && (
                <Line
                  className="h-full w-full max-h-[450px] max-w-[75rem] "
                  data={monthlyData}
                />
              )}
              {position === "Weekly" && (
                <Line
                  className="h-full w-full max-h-[450px] max-w-[75rem] "
                  data={weeklyData}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="h-full min-h-[200px]">
          <Doughnut data={dougnutdata} />
        </div>
      )}
    </>
  );
};

export default ChartComponent;
