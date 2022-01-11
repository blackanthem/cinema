import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => "/movies",
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "post",
        body: credentials,
      }),
    }),
  }),
});
 
export const { useGetMoviesQuery, useLoginMutation } = api;
