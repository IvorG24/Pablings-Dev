import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState } from "@/lib/type";

const initialState: FormState = {
  selectedService: "",
  selectedPrice: 0,
  selectedExtra: [],
  selectedExtraPrice: 0,
  selectedStaff: "",
  selectedDate: "",
  selectedTime: "",
  name: "",
  email: "",
  phone: "",
  totalPrice: 0,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    selectService(
      state,
      action: PayloadAction<{ serviceName: string; price: number }>
    ) {
      state.selectedService = action.payload.serviceName;
      state.selectedPrice = action.payload.price;
    },
    selectExtra(
      state,
      action: PayloadAction<{ extraName: string; price: number }>
    ) {
      const { extraName, price } = action.payload;
      if (state.selectedExtra.includes(extraName)) {
        state.selectedExtra = state.selectedExtra.filter(
          (extra) => extra !== extraName
        );
        state.selectedExtraPrice -= price;
      } else {
        state.selectedExtra.push(extraName);
        state.selectedExtraPrice += price;
      }
    },

    selectDateTime(
      state,
      action: PayloadAction<{ date: string; time: string }>
    ) {
      const { date, time } = action.payload;
      state.selectedDate = date;
      state.selectedTime = time;
    },
    selectStaff(state, action: PayloadAction<string>) {
      state.selectedStaff = action.payload;
    },
    selectPersonalInfo(
      state,
      action: PayloadAction<{ name: string; email: string; phone: string }>
    ) {
      const { name, email, phone } = action.payload;
      state.name = name;
      state.email = email;
      state.phone = phone;
    },
    calculateTotalPrice(state) {
      state.totalPrice = state.selectedPrice + state.selectedExtraPrice;
    },
    clearForm(state) {
      state.selectedService = "";
      state.selectedPrice = 0;
      state.selectedExtra = [];
      state.selectedStaff = "";
      state.selectedExtraPrice = 0;
      state.selectedDate = "";
      state.selectedTime = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.totalPrice = 0;
    },
  },
});

export const {
  selectService,
  selectExtra,
  selectStaff,
  selectDateTime,
  selectPersonalInfo,
  calculateTotalPrice,
  clearForm,
} = formSlice.actions;

export default formSlice.reducer;
