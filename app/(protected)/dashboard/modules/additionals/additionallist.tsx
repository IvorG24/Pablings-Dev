import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddWalkin from "./walkin";
import NewService from "./newservice";
import prisma from "@/lib/prisma";

const AdditionalList = async () => {
  const barber = await prisma.barber.findMany({
    select: {
      name: true,
    },
  });
  const tabContents = [
    {
      value: "walkin",
      label: "Add Walk in",
      component: <AddWalkin data={barber} />,
    },
    // future changes or adds
    // {
    //   value: "services",
    //   label: "Add Services",
    //   component: <NewService />,
    // },
    // {
    //   value: "add",
    //   label: "Declined",
    //   component: <AppointmentTable variant="declined" />,
    // },
  ];

  return (
    <Tabs defaultValue="walkin">
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

export default AdditionalList;
