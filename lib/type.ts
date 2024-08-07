import { Appointment, Sales } from "@prisma/client";
export type FormState = {
  selectedService: string;
  selectedPrice: number;
  selectedExtra: string[];
  selectedExtraPrice: number;
  selectedStaff: string;
  selectedDate: string;
  selectedTime: string;
  name: string;
  email: string;
  phone: string;
  totalPrice: number;
};
export type Service = {
  name: string;
  description: string;
  price: number;
};
export type Extra = {
  label: string;
  value: string;
  description: string;
  price: number;
};
export type SalesOverviewData = {
  todaysalesAmount: number;
  todaycustomer: number;
  totalsalesAmount: number;
  totalcustomer: number;
  yearlySales: number[];
  todaycustomerlist: {
    customer_name: string | null;
    staff: string;
    time_slot: string;
    service: string;
    extraservices: string[];
  }[];
  tomorrowcustomerlist: {
    customer_name: string | null;
    staff: string;
    time_slot: string;
    service: string;
    extraservices: string[];
  }[];
};

type weekly = {
  weeklyLabel: string;
  totalSales: number;
};
type dougnut = {
  _count: {
    staff: number;
  };
  staff: string;
};
export type ChartSalesData = {
  monthlySales: number[];
  weeklySalesData: weekly[];
  dailySalesData: number[];
  doughnutData: dougnut[];
};

export type TimeSlot = {
  barber_name: string;
  time_slot: string;
  day_of_week: string;
};

export type TimeSlotData = {
  barberslots: TimeSlot[];
};

export type BarBerListData = {
  barberlist: {
    barber_name: string;
  }[];
};
export type AppointmentState = {
  data: Appointment[];
};

export type AppointmentTime = {
  date: string;
  time: string;
};

export interface FormCardProps {
  Avatarsrc?: string;
  Avatarfallback?: string;
  name: string;
  time?: string;
  price?: number;
  description?: string;
}

export type AppointmentResponse = {
  pendingAppointments: Appointment[];
  confirmedAppointments: Appointment[];
  declinedAppointments: Appointment[];
  total: number;
};

export type RecordResponse = {
  total: number;
  records: Sales[];
};

export type AddScheduleProps = {
  barberImage: string | null;
  barberName: string;
  barberEmail: string | null;
  barberPhone: string | null;
};

export const ADMIN_ROLE = "admin";
export const COUNTER_ROLE = "counter";
