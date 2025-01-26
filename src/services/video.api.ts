import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

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
  baseQuery: baseQueryWithReauth,
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
