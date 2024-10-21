/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteObject } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import adminRoutes from "../sub/adminRoutes";
import instructorRoutes from "../sub/instructorRoutes";
import studentRoutes from "../sub/studentRoutes";
// import DashBoardAdmin from "../../pages/admin/overview/DashBoardAdmin";
import { RoleEnum } from "../../model/RouteConfig";

const useProtectedRoutes = (): RouteObject[] => {
      const userRole = localStorage.getItem('userRole') as RoleEnum | null; // Type assertion for clarity

      console.log("........", userRole)
  let roleBasedRoutes: RouteObject[] = [];

  switch (userRole) {
    case RoleEnum.Admin:
      roleBasedRoutes = adminRoutes.map((route) => ({
        ...route,
        element: (
          <ProtectedRoute
            component={route.element as unknown as React.ComponentType<any>}
            userRole={userRole}
            allowedRoles={[RoleEnum.Admin]}
          />
        ),
      }));
      break;
    case RoleEnum.Instructor:
      roleBasedRoutes = instructorRoutes.map((route) => ({
        ...route,
        element: (
          <ProtectedRoute
            component={route.element as unknown as React.ComponentType<any>}
            userRole={userRole}
            allowedRoles={[RoleEnum.Instructor]}
          />
        ),
      }));
      break;
    case RoleEnum.Student:
      roleBasedRoutes = studentRoutes.map((route) => ({
        ...route,
        element: (
          <ProtectedRoute
            component={route.element as unknown as React.ComponentType<any>}
            userRole={userRole}
            allowedRoles={[RoleEnum.Student]}
          />
        ),
      }));
      break;
    default:
      roleBasedRoutes = [];
  }

  return [...roleBasedRoutes];
};

export default useProtectedRoutes;