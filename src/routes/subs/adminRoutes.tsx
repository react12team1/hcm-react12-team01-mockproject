import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { AdminLayout } from "../../layout";
const Dashboard = lazy(() => import("../../pages/Admin/Dashboard"));
const AllCourses = lazy (
    () => import("../../pages/Admin/allcourses")
)
const CoursesLog = lazy (
    () => import("../../pages/Admin/courselog")
)
const PendingCourses = lazy (
    () => import("../../pages/Admin/PendingCourses")
)
const PurchaseLog = lazy (
    () => import("../../pages/Admin/purchaselog")
)
const CategoryManagement = lazy (
    () => import("../../pages/Admin/CategoryManagement")
)
const RequestManagement = lazy (
    () => import("../../pages/Admin/RequestManagement")
)
const UserManagement = lazy (
    () => import("../../pages/Admin/UserManagement")
)
const PayoutManagement = lazy (
    () => import ("../../pages/Admin/PayoutManagement")
)

const AdminRoutes: RouteObject[] = [
{
    path: "/Admin",
    element: <AdminLayout/>,
    children: [
        { index: true , element:<Dashboard/>},
        { path: "all-courses", element:<AllCourses/>},
        { path: "courses-log", element: <CoursesLog/>},
        { path: "pending-courses", element: <PendingCourses/>},
        { path: "purchase-log", element: <PurchaseLog/>},
        { path: "category-management", element: <CategoryManagement/>},
        { path: "request-management", element: <RequestManagement/>},
        { path: "user-management", element: <UserManagement/>},
        { path: "payout-management", element: <PayoutManagement/>}
    ],
},
]
export default AdminRoutes;
