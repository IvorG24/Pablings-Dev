// currentStepSlice.js
import { createSlice } from "@reduxjs/toolkit";

const currentStepSlice = createSlice({
  name: "currentStep",
  initialState: {
    value: 0, // Initial state for currentStep
  },
  reducers: {
    incrementStep: (state) => {
      state.value += 1;
    },
    decrementStep: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    },
    setCurrentStep: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { incrementStep, decrementStep, setCurrentStep } =
  currentStepSlice.actions;

export default currentStepSlice.reducer;
