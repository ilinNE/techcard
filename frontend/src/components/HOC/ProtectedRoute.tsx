import { FC } from "react";
import { Navigate } from "react-router-dom";
import { IProtectedRouteProps } from "./IProtectedRoute";

const ProtectedRoute: FC<IProtectedRouteProps> = ({ loggedIn, children }) => {
  if (!loggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};
export { ProtectedRoute };
