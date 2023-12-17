import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { user } = useAuth();
  return <>{user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
};
