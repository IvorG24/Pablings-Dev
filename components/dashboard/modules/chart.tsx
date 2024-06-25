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

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

// Yearly data
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
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

// Monthly data
const monthlyData = {
  labels: Array.from({ length: 30 }, (_, i) => i + 1), // Days of the month
  datasets: [
    {
      label: "Monthly Sales",
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
      fill: true,
      borderColor: "rgb(54, 162, 235)",
      tension: 0.1,
    },
  ],
};

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

const options = (title: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: title,
    },
  },
});

const dougnutdata = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
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

const doughnutoptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Doughnut Chart Example",
    },
  },
};

interface CharComponentProps {
  variant: "doughnut" | "line";
}
const ChartComponent = ({ variant }: CharComponentProps) => {
  const [position, setPosition] = useState("Yearly");

  return (
    <>
      {variant === "line" ? (
        <div className="space-y-8 p-4">
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
          <div className="h-full min-h-[350px]">
            {position === "Yearly" && <Line data={yearlyData} />}
            {position === "Monthly" && <Line data={monthlyData} />}
            {position === "Weekly" && <Line data={weeklyData} />}
          </div>
        </div>
      ) : (
        <div className="h-full min-h-[200px]">
          <Doughnut data={dougnutdata} />
        </div>
      )}
    </>
  );
};

export default ChartComponent;
