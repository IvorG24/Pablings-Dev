import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentTable from "./appointmentTable";

const AppointmentList = async () => {
  const tabContents = [
    {
      value: "pending",
      label: "Pending",
      component: <AppointmentTable variant="pending" />,
    },
    {
      value: "confirmed",
      label: "Confirmed",
      component: <AppointmentTable variant="confirmed" />,
    },
    {
      value: "declined",
      label: "Declined",
      component: <AppointmentTable variant="declined" />,
    },
  ];

  return (
    <Tabs defaultValue="pending">
      <TabsList>
        {tabContents.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabContents.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="w-full ">
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AppointmentList;
