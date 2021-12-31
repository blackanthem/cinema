import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
  },
});

export const { increment } = movieSlice.actions;

export default movieSlice.reducer;
