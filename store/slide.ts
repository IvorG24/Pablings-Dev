import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    drawerOpen: false,
  },
  reducers: {
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
  },
});

export const { toggleDrawer } = drawerSlice.actions;
export const selectDrawerOpen = (state: any) => state.drawer.drawerOpen;

export default drawerSlice.reducer;
