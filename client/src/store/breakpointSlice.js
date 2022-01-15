import { createSlice } from "@reduxjs/toolkit";

export const breakpointSlice = createSlice({
  name: "bp",
  initialState: { size: null },
  reducers: {
    getWindowSize() {
      const width = window.innerWidth;

      if (width <= 568) return { size: "small" };
      if (width <= 768) return { size: "medium" };
      if (width <= 1100) return { size: "lg" };
      return { size: null };
    },
  },
});

export const { getWindowSize } = breakpointSlice.actions;

export default breakpointSlice.reducer;
