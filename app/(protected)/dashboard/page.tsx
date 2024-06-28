import { signOut } from "@/auth";
import SalesOverview from "@/components/dashboard/overview";
import {
  isRedirectError,
  redirect,
} from "next/dist/client/components/redirect";
import { TabsContent } from "@/components/ui/tabs";
import { SubmitButton } from "@/components/SubmitButton";
import AppointmentList from "./modules/appointment/appointmentList";
import RecordList from "./modules/record/recordlist";
import BarberList from "./modules/barbers/barbertlist";

const DashboardPage = async () => {
  const tabContents = [
    { value: "overview", component: <SalesOverview /> },
    { value: "appointment", component: <AppointmentList /> },
    { value: "records", component: <RecordList /> },
    { value: "barber", component: <BarberList /> },
    { value: "walkin", component: <AppointmentList /> },
  ];

  return (
    <>
      <form
        action={async () => {
          "use server";
          try {
            await signOut({ redirect: false });
          } catch (err) {
            if (isRedirectError(err)) {
              console.error(err);
              throw err;
            }
          } finally {
            redirect("/");
          }
        }}
      >
        <SubmitButton
          pendingText="Signing out..."
          className="p-2 px-4 mt-4 bg-[hsl(191,52%,30%)] hover:bg-[hsl(191,52%,35%)] rounded-sm"
        >
          Sign Out
        </SubmitButton>
      </form>
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
