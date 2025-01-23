import { Route, Routes } from "react-router-dom";
import AuthPage from './pages/auth';
import HomePage from './pages/homepage'; 
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import VideoUploadForm from './pages/uploadVideo';
import AllUsers from './pages/allusers';
import AllVideos from './pages/allvideo';
import Profile from './pages/profile';
import Analytics from './pages/analytics';

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login"  element={<AuthPage/>}/>
        <Route path="/signup"  element={<AuthPage/>}/>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="users" element={<AllUsers />}  />
          <Route path="/admin/upload" element={<VideoUploadForm/>}/>
          <Route path="/admin/videos" element={<AllVideos />}  />
          <Route path="/admin/profile" element={<Profile/>}/>
          <Route path="/admin/analytics" element={<Analytics />}  />        
        </Route>
        <Route path="/user" element={<UserDashboard />} >
        <Route path="/user/videos" element={<AllVideos />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/analytics" element={<Analytics />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
