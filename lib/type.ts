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
  name: string;
  description: string;
  price: number;
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
