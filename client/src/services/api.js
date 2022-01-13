import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => "/movies",
    }),
    searchMovies: builder.query({
      query: (movie) => `/search-movie?query=${movie}`,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "post",
        body: credentials,
      }),
    }),
    postMovie: builder.mutation({
      query: (body) => ({
        url: "/movie",
        method: "post",
        body,
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useLoginMutation,
  useSearchMoviesQuery,
  usePostMovieMutation,
} = api;
