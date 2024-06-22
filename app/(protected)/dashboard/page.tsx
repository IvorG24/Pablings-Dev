import { auth, signOut } from "@/auth";
import AppointmentList from "@/components/dashboard/appointmentlist";
import SalesOverview from "@/components/dashboard/overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const DashboardPage = async () => {
  const tabContents = [
    { value: "overview", component: <SalesOverview /> },
    { value: "appointment", component: <AppointmentList /> },
    { value: "records", component: <AppointmentList /> },
    { value: "barber", component: <AppointmentList /> },
    { value: "walkin", component: <AppointmentList /> },
  ];
  return (
    <>
      {tabContents.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="w-full min-h-screen p-5"
        >
          {tab.component}
        </TabsContent>
      ))}
    </>
  );
};

export default DashboardPage;
