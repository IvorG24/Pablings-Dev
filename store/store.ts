import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./slide";
import formReducaer from "./formSlice";
export const store = configureStore({
  reducer: {
    formSlice: formReducaer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
