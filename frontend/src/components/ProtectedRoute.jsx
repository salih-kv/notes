import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { authState } = useAuth();
  return <>{authState.isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
};
