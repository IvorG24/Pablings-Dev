// appointmentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ScheduleForm = {
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
  status: string;
};

interface AppointmentState {
  appointments: ScheduleForm[];
}

const initialState: AppointmentState = {
  appointments: [],
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    addAppointments: (state, action: PayloadAction<ScheduleForm[]>) => {
      state.appointments.push(...action.payload); // Ensure state mutation is avoided
    },
    // Other reducers like updateAppointment, removeAppointment, etc.
  },
});
export const { addAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;
