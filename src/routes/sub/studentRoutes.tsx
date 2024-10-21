import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { StudentLayout } from "../../layout";

const StudentDashboard = lazy(
  () => import("../../pages/Student/dashboard"),
);
const OrderPage = lazy(
  () => import("../../pages/Student/order"),
);
const SettingPage = lazy(
  () => import("../../pages/Student/setting"),
);
const SubscriptionPage = lazy(
  () => import("../../pages/Admin/PendingCourses"),
);
const CheckoutPage = lazy(
  () => import("../../pages/Student/order/checkout"),
);
//------------------------------------------------------------
const studentRoutes: RouteObject[] = [
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
        { index: true, element: <StudentDashboard /> },
        { path: "admin-all-courses", element: <OrderPage /> },
        { path: "course-log", element: <SettingPage /> },
        { path: "pending-course", element: <SubscriptionPage /> },
        { path: "purchase-log", element: <CheckoutPage /> }, 
      
    ],
  },
];

export default studentRoutes;