import SalesOverview from "./modules/overview/overview";
import { TabsContent } from "@/components/ui/tabs";
import AppointmentList from "./modules/appointment/appointmentList";
import RecordList from "./modules/record/recordlist";
import BarberList from "./modules/barbers/barbertlist";
import Header from "@/components/dashboard/header";
import AdditionalList from "./modules/additionals/additionallist";
import { auth } from "@/auth";
import { role } from "@prisma/client";
import { ADMIN_ROLE, COUNTER_ROLE } from "@/lib/type";
const DashboardPage = async () => {
  const session = await auth();
  const userRole = session?.user.role || COUNTER_ROLE;
  const tabContents = [
    {
      value: "overview",
      component: <SalesOverview />,
      role: [ADMIN_ROLE, COUNTER_ROLE],
    },
    {
      value: "appointment",
      component: <AppointmentList />,
      role: [ADMIN_ROLE, COUNTER_ROLE],
    },
    {
      value: "records",
      component: <RecordList />,
      role: [ADMIN_ROLE, COUNTER_ROLE],
    },
    {
      value: "barber",
      component: <BarberList />,
      role: [ADMIN_ROLE, COUNTER_ROLE],
    },
    {
      value: "walkin",
      component: <AdditionalList />,
      role: [COUNTER_ROLE],
    },
  ];

  const filteredTabContents = tabContents.filter((tab) =>
    tab.role.includes(userRole)
  );

  return (
    <>
      <Header userRole={session?.user.role} />
      {filteredTabContents.map((tab) => (
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
