import { configureStore } from "@reduxjs/toolkit";
import formReducaer from "./formSlice";
import currentStepReducer from "./currentStepSlice";
import appointmentReducer from "./appointmentSlice";
export const store = configureStore({
  reducer: {
    formSlice: formReducaer,
    currentStep: currentStepReducer,
    appointment: appointmentReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
