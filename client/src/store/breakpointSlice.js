import { createSlice } from "@reduxjs/toolkit";

export const breakpointSlice = createSlice({
  name: "bp",
  initialState: { size: 4 },
  reducers: {
    getWindowSize() {
      const width = window.innerWidth;

      if (width <= 568) return { size: 1 };
      if (width <= 768) return { size: 2 };
      if (width <= 1100) return { size: 3 };
      return { size: 4 };
    },
  },
});

export const { getWindowSize } = breakpointSlice.actions;

export default breakpointSlice.reducer;
