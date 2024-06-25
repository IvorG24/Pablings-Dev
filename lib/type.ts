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
  data: AppointmentTable[];
};

export type Appointment = {
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
type Status = "Pending" | "Confirmed" | "Cancelled";

export type AppointmentTable = {
  appointment_id: string;
  BookingNumber: number;
  service: string;
  date: string;
  time: string;
  barber: string;
  extraservices: string[];
  name: string;
  phone: string;
  email: string;
  totalprice: number;
  status: Status;
};
export type AppointmentResponse = {
  appointments: AppointmentTable[];
  total: number;
};
