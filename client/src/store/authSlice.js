import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loggedIn: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      toast.error("Session expired", { toastId: "login" });
      state.loggedIn = false;
    },
  },
});

export const { logout, login } = authSlice.actions;

export default authSlice.reducer;
