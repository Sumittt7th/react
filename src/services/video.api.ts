import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "../utils/auth";

export interface IVideo {
  _id: string;
  title: string;
  access: "free" | "paid";
  description?: string;
  duration?: number | null;
  url?: string;
  public_id?:string;
  hlsUrl?: string;
  viewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}


export const apiVideo = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // Update with your backend URL
    prepareHeaders: (headers) => {
      const token = getAccessToken(); // Retrieve token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadVideo: builder.mutation<any, { data: IVideo; file: File }>({
      query: ({ data, file }) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description || "");
        formData.append("access", data.access);
        formData.append(
          "duration",
          data.duration ? data.duration.toString() : ""
        );
        formData.append("video", file);

        return {
          url: "/videos",
          method: "POST",
          body: formData,
        };
      },
    }),
    getAllVideos: builder.query<IVideo[], void>({
      query: () => ({
        url: "/videos",
        method: "GET",
      }),
    }),
  }),
});

export const { useUploadVideoMutation,useGetAllVideosQuery } = apiVideo;
