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
  tagTypes: [
    "Followers",
    "Following",
    "Profile",
    "Posts",
    "Post",
    "LikedPosts",
  ],
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
        { type: "Posts", id: "LIST" },
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
    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),

      invalidatesTags: (result) => [{ type: "Posts", id: result?.userId }],
    }),
    getPostsByUserId: builder.query({
      query: (userId) => ({
        url: `/posts/user/${userId}`,
        method: "GET",
        refetchOnMountOrArgChange: true,
      }),
      providesTags: (result, error, userId) => [{ type: "Posts", id: userId }],
    }),
    getPostById: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "GET",
      }),
      providesTags: (result, error, postId) => [{ type: "Post", id: postId }],
    }),
    getLikedPosts: builder.query({
      query: (userId) => ({
        url: `/posts/liked/${userId}`,
        method: "GET",
      }),
      providesTags: [{ type: "LikedPosts", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `/posts/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Post", id },
        { type: "Posts", id: result?.userId },
        { type: "Posts", id: "LIST" },
        { type: "LikedPosts", id: "LIST" },
      ],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Post", id },
        { type: "Posts", id: result?.userId },
        { type: "Posts", id: "LIST" },
        { type: "LikedPosts", id: "LIST" },
      ],
    }),
    likePost: builder.mutation({
      query: (postId) => ({
        url: `/likes/post/${postId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Post", id },
        { type: "Posts", id: result?.userId },
        { type: "Posts", id: "LIST" },
        { type: "LikedPosts", id: "LIST" },
      ],
    }),
    likeComment: builder.mutation({
      query: (commentId) => ({
        url: `/likes/comment/${commentId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Post", id },
        { type: "Posts", id: result?.userId },
        { type: "Posts", id: "LIST" },
        { type: "LikedPosts", id: "LIST" },
      ],
    }),
    getRecentPosts: builder.query({
      query: () => ({
        url: "/posts/",
        method: "GET",
      }),
      providesTags: [{ type: "Posts", id: "LIST" }],
    }),
    getFollowingPosts: builder.query({
      query: () => ({
        url: "/posts/following",
        method: "GET",
      }),
      providesTags: [{ type: "Posts", id: "LIST" }],
    }),
    getByUsername: builder.query({
      query: (username) => ({
        url: `/users/?username=${username}`,
        method: "GET",
      }),
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: `/comments/${data.postId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: `/comments/${data.commentId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getMessages: builder.query({
      query: (data) => ({
        url: `/messages/${data.receiverId}`,
        method: "GET",
      }),
    }),
    createMessage: builder.mutation({
      query: (data) => ({
        url: `/messages/${data.receiverId}`,
        method: "POST",
        body: data,
      }),
    }),
    updateMessage: builder.mutation({
      query: (data) => ({
        url: `/messages/${data.messageId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteMessage: builder.mutation({
      query: (data) => ({
        url: `/messages/${data.id}`,
        method: "DELETE",
        body: data,
      }),
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
  useCreatePostMutation,
  useGetPostsByUserIdQuery,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetRecentPostsQuery,
  useGetFollowingPostsQuery,
  useLazyGetByUsernameQuery,
  useLikePostMutation,
  useGetLikedPostsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useGetUsersQuery,
  useGetMessagesQuery,
  useCreateMessageMutation,
  useLazyGetMessagesQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = api;
