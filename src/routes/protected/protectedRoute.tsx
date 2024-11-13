import React from "react";
import { Route, Navigate } from "react-router-dom";
import { UserRole } from "../../model/User";
import { ROUTER_URL } from "../../const/router.const";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  userRole: UserRole;
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, userRole, allowedRoles, ...rest }) => {
  return <Route {...rest} element={allowedRoles.includes(userRole) ? <Component {...rest} /> : <Navigate to={ROUTER_URL.LOGIN} />} />;
};

export default ProtectedRoute;
