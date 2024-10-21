import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { InstructorLayout } from "../../layout";

const InstructorDashboard = lazy(
  () => import("../../pages/InstructorPage/InstructorDashboard"),
);
const ManageCourse = lazy(
  () => import("../../pages/InstructorPage/ManageCourse"),
);
const ViewDetailCourse = lazy(
  () => import("../../components/InstructorComponents/ManageCourse/Course/ViewDetailCourse"),
);
const ViewDetailSession = lazy(
  () => import("../../components/InstructorComponents/ManageCourse/Session/ViewDetailSession"),
);
const ViewDetailLesson = lazy(
  () => import("../../components/InstructorComponents/ManageCourse/Lesson/ViewDetailLesson"),
);
const SalesHistory = lazy(
  () => import("../../components/InstructorComponents/SalesHistory"),
);
const InstructorCourseLog = lazy(
  () => import("../../pages/InstructorPage/InstructorCourseLog"),
);
const Review = lazy(
  () => import("../../components/InstructorComponents/Review"),
);
const InstructorSub = lazy(
  () => import("../../pages/InstructorPage/InstructorSub"),
);
const PayoutInstructorPage = lazy(
  () => import("../../pages/InstructorPage/PayoutInstructorPage"),
);

//------------------------------------------------------------
const instructorRoutes: RouteObject[] = [
  {
    path: "/instructor",
    element: <InstructorLayout />,
    children: [
        { index: true, element: <InstructorDashboard /> },
        { path: "instructor-all-courses", element: <ManageCourse /> },
        { path: "course-log", element: <ViewDetailCourse /> },
        { path: "pending-course", element: <ViewDetailSession /> },
        { path: "purchase-log", element: <ViewDetailLesson /> },
        { path: "category-management", element: <SalesHistory /> },
        { path: "request-management", element: <InstructorCourseLog /> },
        { path: "review", element: <Review /> },
        { path: "payout-management", element: <InstructorSub /> },
        { path: "payout-management", element: <PayoutInstructorPage /> },

        
      
    ],
  },
];

export default instructorRoutes;