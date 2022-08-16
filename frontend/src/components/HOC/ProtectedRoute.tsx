import { FC } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  loggedIn: boolean;
  children: any;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ loggedIn, children }) => {
  if (!loggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};
export { ProtectedRoute };
