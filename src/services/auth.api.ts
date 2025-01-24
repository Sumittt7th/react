import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from '../utils/auth';

// Create a new API instance using RTK query
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/", // Your backend URL
    prepareHeaders: (headers) => {
      const token = getAccessToken(); // Get token from localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Add token to Authorization header
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation<
      { accessToken: string; refreshToken: string; role: "USER" | "ADMIN" },
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: "users/login",
        method: "POST",
        body: { email, password },
      }),
    }),

    // Signup endpoint
    signup: builder.mutation<
      { accessToken: string; refreshToken: string; role: "USER" | "ADMIN" },
      { name: string; email: string; password: string }
    >({
      query: ({ name, email, password }) => ({
        url: "users/",
        method: "POST",
        body: { name, email, password },
      }),
    }),

    // Logout endpoint
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
    }),

    getAllUsers: builder.query<
      { name: string; email: string; subscription: boolean }[],
      void
    >({
      query: () => "users/",
    }),

    // Fetch user by ID
    getUserById: builder.query<
      { name: string; email: string; subscription: boolean },
      string
    >({
      query: (id) => `users/${id}`,
    }),
    editUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useEditUserMutation,
} = api;
