import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
});

export const { logout, login } = authSlice.actions;

export default authSlice.reducer;
