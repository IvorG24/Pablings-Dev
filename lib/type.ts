export type FormState = {
  selectedService: string;
  selectedPrice: number;
  selectedExtra: string[];
  selectedExtraPrice: number;
  selectedStaff: string;
  selectedDate: Date | undefined;
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
