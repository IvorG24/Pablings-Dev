import Container from "@/components/scheduling/container";
import Header from "@/components/scheduling/header";
import { ReactNode } from "react";

export const metadata = {
  title: "Booking",
  description: "Generated by create next app",
};

type AppointmentLayoutProps = {
  children: ReactNode;
};

export default function AppointmentLayout({
  children,
}: AppointmentLayoutProps) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}
