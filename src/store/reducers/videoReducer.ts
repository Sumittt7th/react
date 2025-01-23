import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

// Define a type for the slice state
interface VideoState {
  videos: Video[];
  loading: boolean;
}

// Define the initial state using that type
const initialState: VideoState = {
  videos: [],
  loading: true,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
    setVideos: (state, action: PayloadAction<{ videos: Video[] }>) => {
      state.videos = action.payload.videos;
      state.loading = false;
    },
    addVideo: (state, action: PayloadAction<{ video: Video }>) => {
      state.videos.push(action.payload.video);
    },
    updateVideo: (state, action: PayloadAction<{ _id: string; video: Partial<Video> }>) => {
      const index = state.videos.findIndex(video => video._id === action.payload._id);
      if (index !== -1) {
        state.videos[index] = { ...state.videos[index], ...action.payload.video };
      }
    },
    deleteVideo: (state, action: PayloadAction<{ _id: string }>) => {
      state.videos = state.videos.filter(video => video._id !== action.payload._id);
    },
  },
});

export const { setLoading, setVideos, addVideo, updateVideo, deleteVideo } = videoSlice.actions;

export default videoSlice.reducer;
