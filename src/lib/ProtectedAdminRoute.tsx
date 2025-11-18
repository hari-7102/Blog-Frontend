import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedRouteProps) => {
  const user = localStorage.getItem("Role");
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/home" />;
  }
  

  if (!user || (user !== "ADMIN" && user !== "admin")) {
    return <Navigate to="/404" />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
