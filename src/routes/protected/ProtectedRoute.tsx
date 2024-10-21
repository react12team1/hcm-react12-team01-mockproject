/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { RoleEnum } from "../../model/RouteConfig";
// interface ProtectedRouteProps {
//   component: React.ComponentType<unknown>;
//   userRole: RoleEnum;
//   allowedRoles: RoleEnum[];
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   component: Component,
//   userRole,
//   allowedRoles,
//   ...rest
// }) => {
//   return (
//     <Route
//       {...rest}
//       element={
//         allowedRoles.includes(userRole) ? (
//           <Component {...rest} />
//         ) : (
//           <Navigate to="/unauthorized" />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;

import React from "react";
import { Route, Navigate } from "react-router-dom";
import { RoleEnum } from "../../model/RouteConfig";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  userRole: RoleEnum;
  allowedRoles: RoleEnum[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  userRole,
  allowedRoles,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      element={
        allowedRoles.includes(userRole) ? (
          <Component {...rest} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;