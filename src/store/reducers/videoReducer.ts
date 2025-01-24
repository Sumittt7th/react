import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVideo } from "../../services/video.api";

export interface VideoState {
  videos: IVideo[];
  loading: boolean;
  error: string | null;
}

const initialState: VideoState = {
  videos: [],
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    addVideo: (state, action: PayloadAction<IVideo>) => {
      state.videos.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addVideo, setLoading, setError } = videoSlice.actions;
export default videoSlice.reducer;
