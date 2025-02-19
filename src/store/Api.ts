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
  tagTypes: ["Followers", "Following", "Profile"],
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
      providesTags: (result, error, id) =>
        id ? [{ type: "Profile", id }] : ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: "/users",
        method: "PATCH",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
    }),
    updateAvatar: builder.mutation({
      query: (avatarFile) => ({
        url: "/users/avatar",
        method: "PATCH",
        body: avatarFile,
      }),
      invalidatesTags: ["Profile"],
    }),
    updateBanner: builder.mutation({
      query: (bannerFile) => ({
        url: "/users/banner",
        method: "PATCH",
        body: bannerFile,
      }),
      invalidatesTags: ["Profile"],
    }),
    follow: builder.mutation({
      query: (id) => ({
        url: `/follows/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Followers", id },
        { type: "Following", id },
        { type: "Profile", id },
        { type: "Following", id: "LIST" },
        { type: "Profile", id: "LIST" },
      ],
    }),
    getFollowers: builder.query({
      query: (id) => ({
        url: `/follows/followers/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Followers", id }],
    }),
    getFollowed: builder.query({
      query: (id) => ({
        url: `/follows/followed/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Following", id }],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useProfileQuery,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
  useFollowMutation,
  useGetFollowersQuery,
  useGetFollowedQuery,
  useUpdateBannerMutation,
} = api;
