import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    } else if (role === 'ADMIN') {
      navigate('/admin'); // Redirect Admin to admin dashboard
    } else if (role === 'USER') {
      navigate('/user'); // Redirect User to user dashboard
    }
  }, [isAuthenticated, role, navigate]);

  // Render children only when authenticated
  if (!isAuthenticated || !role) {
    return null; // Prevent rendering until redirection is complete
  }

  return children;
};

export default ProtectedRoute;
