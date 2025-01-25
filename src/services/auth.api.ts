import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RootState } from "../store/store";
import { logout, resetTokens, setTokens } from "../store/reducers/authReducer";

// Base query setup with authorization headers
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/users",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken; // Get accessToken from Redux state
    
    // List of public endpoints that do not require an access token
    const publicEndpoints = ['/', '/login', 'forgotPassword', 'reset-password']; // Add other public endpoints here
    if (!publicEndpoints.includes(endpoint) && token) {
      // Attach the token only for private endpoints
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Base query with reauthentication logic
const baseQueryWithReauth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Access token expired, attempt to refresh
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (refreshToken) {
      // Attempt token refresh
      const refreshResult = await baseQuery(
        {
          url: "/reftoken",  // Endpoint for refreshing tokens
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`, 
          },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        console.log(refreshResult.data);
        // Save new tokens in Redux state
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResult.data as {
          accessToken: string;
          refreshToken: string;
        };
        console.log(newAccessToken);
        console.log(newRefreshToken);
        api.dispatch(
          setTokens({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            role: state.auth.role, // Preserve the current role and user
            user: state.auth.user,
          })
        );

        // Retry the original request with the new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh token failed, log the user out
        api.dispatch(resetTokens());
        api.dispatch(logout());
      }
    } else {
      // No refresh token available, log the user out
      api.dispatch(resetTokens());
      api.dispatch(logout());
    }
  }

  return result;
};

// Define the API service with the modified base query
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth, // Use the base query with reauth logic
  endpoints: (builder) => ({
    // Signup endpoint
    signUp: builder.mutation({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),

    // Login endpoint
    login: builder.mutation({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
      }),
    }),

    // Logout endpoint
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),

    // Get all users endpoint
    getAllUsers: builder.query({
      query: () => '/',
    }),

    // Get user by ID endpoint
    getUserById: builder.query({
      query: (id) => `/${id}`,
    }),

    // Edit user endpoint
    editUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    // Other endpoints can be added similarly
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useEditUserMutation,
} = api;
