import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTokens } from "../src/store/reducers/authReducer"; // Adjust the import path
import AuthPage from "./pages/auth";
import HomePage from "./pages/homepage";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import VideoUploadForm from "./pages/uploadVideo";
import AllUsers from "./pages/allusers";
import AllVideos from "./pages/allvideo";
import Profile from "./pages/profile";
import Analytics from "./pages/analytics";
import EditUser from "./pages/editUser";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check localStorage for tokens and user data
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (accessToken && refreshToken && role) {
      // Dispatch the setTokens action to store the data in Redux
      dispatch(setTokens({ accessToken, refreshToken, role, user }));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="users" element={<AllUsers />} />
          <Route path="upload" element={<VideoUploadForm />} />
          <Route path="videos" element={<AllVideos />} />
          <Route path="profile" element={<Profile />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="editUser" element={<EditUser />} />
        </Route>
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="videos" element={<AllVideos />} />
          <Route path="profile" element={<Profile />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="editUser" element={<EditUser />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
