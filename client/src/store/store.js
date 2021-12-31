import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { api } from "../services/api";
import movieReducer from "./movieSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    movie: movieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// setupListeners(store.dispatch)