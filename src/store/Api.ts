import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API = import.meta.env.VITE_API_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    profile: builder.query({
      query: (id) => ({
        url: id ? `/users?id=${id}` : "/users",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: "/users",
        method: "PATCH",
        body: credentials,
      }),
    }),
    follow: builder.mutation({
      query: (id) => ({
        url: `/follows/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  useFollowMutation,
} = api;
