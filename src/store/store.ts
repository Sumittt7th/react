import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import { apiAuth } from "../services/auth.api";
import { apiUser } from "../services/user.api";
import videoReducer from "./reducers/videoReducer";
import {apiVideo} from "../services/video.api"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiAuth.reducerPath]: apiAuth.reducer,
    video: videoReducer,
    [apiVideo.reducerPath]: apiVideo.reducer,
    [apiUser.reducerPath]: apiUser.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiAuth.middleware, apiVideo.middleware,apiUser.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
