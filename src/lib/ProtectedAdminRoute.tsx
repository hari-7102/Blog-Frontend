import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = localStorage.getItem("Role");

  if (!user || (user !== "ADMIN" && user !== "admin")) {
    return <Navigate to="/404" />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
