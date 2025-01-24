import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";

interface ProtectedRouteProps {
  allowedRoles: string[]; // Specify allowed roles for this route
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated, preserving the intended route
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirect based on role if not allowed to access this route
    return <Navigate to={`/${role.toLowerCase()}`} replace />;
  }

  // Render the children if authentication and role checks pass
  return children;
};

export default ProtectedRoute;
