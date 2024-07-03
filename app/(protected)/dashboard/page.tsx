import SalesOverview from "./modules/overview/overview";
import { TabsContent } from "@/components/ui/tabs";
import AppointmentList from "./modules/appointment/appointmentList";
import RecordList from "./modules/record/recordlist";
import BarberList from "./modules/barbers/barbertlist";
import Header from "@/components/dashboard/header";
import AdditionalList from "./modules/additionals/additionallist";
const DashboardPage = async () => {
  const tabContents = [
    { value: "overview", component: <SalesOverview /> },
    { value: "appointment", component: <AppointmentList /> },
    { value: "records", component: <RecordList /> },
    { value: "barber", component: <BarberList /> },
    { value: "walkin", component: <AdditionalList /> },
  ];

  return (
    <>
      <Header />
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
