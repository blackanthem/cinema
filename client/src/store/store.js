import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query/react";
import { api } from "../services/api";
import authReducer from "./authSlice";
import breakpointReducer from "./breakpointSlice";

import { loginMiddleware } from "./middleware.js/loginMiddleware";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    bp: breakpointReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(loginMiddleware),
});

// setupListeners(store.dispatch)
