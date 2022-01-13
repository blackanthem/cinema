import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/v1", credentials: "include" }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => "/movies",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Movies", id })),
              { type: "Movies", id: "LIST" },
            ]
          : [{ type: "Movies", id: "LIST" }],
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
      invalidatesTags: [{ type: "Movies", id: "LIST" }],
    }),
    updateMovie: builder.mutation({
      query: ({ movieId, queryString }) => ({
        url: `/auth/movies/${movieId}?${queryString}`,
        method: "put",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Movies", id }],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useLoginMutation,
  useSearchMoviesQuery,
  usePostMovieMutation,
  useUpdateMovieMutation,
} = api;
