import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => "/movies",
    }),
  }),
});

export const { useGetMoviesQuery } = api;
