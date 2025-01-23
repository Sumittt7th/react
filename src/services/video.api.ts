import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from '../utils/auth';

// Define a type for your video
interface Video {
  _id: string;
  title: string;
  description?: string;
  url: string;
  hlsUrl?: string;
  duration?: number;
  access: "free" | "paid";
  viewCount: number;
  public_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create a new API instance using RTK query
export const apiVideo = createApi({
  reducerPath: "videoApi",
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
    // Fetch all videos
    fetchVideos: builder.query<Video[], void>({
      query: () => "videos",
    }),

    // Fetch a single video by ID
    fetchVideoById: builder.query<Video, string>({
      query: (id) => `videos/${id}`,
    }),

    // Add a new video
    addVideo: builder.mutation<Video, Partial<Video>>({
      query: (video) => ({
        url: "videos",
        method: "POST",
        body: video,
      }),
    }),

    // Update an existing video
    updateVideo: builder.mutation<Video, { _id: string; video: Partial<Video> }>({
      query: ({ _id, video }) => ({
        url: `videos/${_id}`,
        method: "PUT",
        body: video,
      }),
    }),

    // Delete a video by ID
    deleteVideo: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `videos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useFetchVideosQuery, useFetchVideoByIdQuery, useAddVideoMutation, useUpdateVideoMutation, useDeleteVideoMutation } = apiVideo;
