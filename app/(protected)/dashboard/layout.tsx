// DashboardLayout.tsx
import React, { ReactNode } from "react";
import Header from "@/components/dashboard/header";
import { Tabs, TabsContent } from "@/components/ui/tabs";
export const metadata = {
  title: "Dashboard | To Do App",
  description: "Generated by create next app",
};

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Tabs defaultValue="overview" className="min-h-screen mx-10 my-5 ">
        <Header />
        {children}
      </Tabs>
    </>
  );
};

export default DashboardLayout;
