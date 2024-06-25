import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { PrismaClient } from "@prisma/client";
import { AppointmentTable } from "@/lib/type";
const prisma = new PrismaClient();

type Status = "Pending" | "Confirmed" | "Cancelled";

interface AppointmentsState {
  appointments: AppointmentTable[];
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentsState = {
  appointments: [],
  loading: false,
  error: null,
};

export const fetchAppointments = createAsyncThunk<AppointmentTable[]>(
  "appointments/fetchAppointments",
  async () => {
    const response = await fetch("/api/appointments");
    if (!response.ok) {
      throw new Error("Failed to fetch appointments");
    }
    const data: AppointmentTable[] = await response.json();
    return data;
  },
);
const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment(state, action: PayloadAction<AppointmentTable>) {
      state.appointments.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAppointments.fulfilled,
        (state, action: PayloadAction<AppointmentTable[]>) => {
          state.loading = false;
          state.appointments = action.payload;
        },
      )
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch appointments";
      });
  },
});

export const { addAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;
