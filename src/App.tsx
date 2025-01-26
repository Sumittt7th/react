import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./store/store";
import { setTokens } from "./store/reducers/authReducer";
import AuthPage from "./pages/auth";
import HomePage from "./pages/homepage";
import Layout from "../src/layouts/layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import VideoUploadForm from "./pages/uploadVideo";
import AllUsers from "./pages/allusers";
import AllVideos from "./pages/allvideo";
import Profile from "./pages/profile";
import Analytics from "./pages/analytics";
import EditUser from "./pages/editUser";
import NotFoundPage from "./pages/errorPage";

function App() {
  const dispatch = useDispatch();
  const { role } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (accessToken && refreshToken && role) {
      dispatch(setTokens({ accessToken, refreshToken, role, user }));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "USER"]}>
            <Layout role={role} />
          </ProtectedRoute>
        }
      >
        {/* Default Admin and User Dashboards */}
        <Route
          index
          element={
            <Navigate to={role === "ADMIN" ? "/admin" : "/user"} replace />
          }
        />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="user" element={<UserDashboard />} />

        {/* Shared Routes */}
        <Route path="profile" element={<Profile />} />
        <Route path="videos" element={<AllVideos />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="editUser" element={<EditUser />} />

        {/* Admin-Specific Route */}
        <Route path="users" element={<AllUsers />} />
        <Route path="upload" element={<VideoUploadForm />} />
      </Route>
    </Routes>
  );
}

export default App;
