import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { InstructorLayout } from "../../layout/InstructorLayout";


const InstructorDashboard = lazy(() => import("../../pages/InstructorPage/InstructorDashboard"));
const ManageCourse = lazy(() => import("../../pages/InstructorPage/ManageCourse"));
const ViewDetailCourse = lazy(
    () => import("../../components/InstructorComponents/ManageCourse/Course/ViewDetailCourse")
);
const ViewDetailSession = lazy(
    () => import("../../components/InstructorComponents/ManageCourse/Session/ViewDetailSession")
);
const ViewDetailLesson = lazy(
    () => import("../../components/InstructorComponents/ManageCourse/Lesson/ViewDetailLesson")
);
const SalesHistory = lazy(
    () => import("../../components/InstructorComponents/SalesHistory")
);
const InstructorCourseLog = lazy(
    () => import("../../pages/InstructorPage/InstructorCourseLog")
);
const Review = lazy(
    () => import("../../components/InstructorComponents/Review")
);
const InstructorSub = lazy(
    () => import("../../pages/InstructorPage/InstructorSub")
);
const PayoutInstructorPage = lazy(() => import("../../pages/InstructorPage/PayoutInstructorPage"));
const PurchaseLog = lazy(() => import("../../pages/Admin/purchaselog"));
const SettingPage = lazy(() => import("../../pages/Student/setting"));
const instructorRoute: RouteObject[] = [
    {
        path: "/instructor",
        element: <InstructorLayout/>,
        children: [
            { index: true , element:<InstructorDashboard/>},
            { path: "manage-course", element:<ManageCourse/>},
            { path: "manage-course/view-detail-course", element: <ViewDetailCourse/>},
            { path: "manage-course/view-detail-session", element: <ViewDetailSession/>},
            { path: "manage-course/view-detail-lesson", element: <ViewDetailLesson/>},
            { path: "sales-history", element: <SalesHistory/>},
            { path: "course-log", element: <InstructorCourseLog/>},
            { path: "review", element: <Review/>},
            { path: "subscriptions", element: <InstructorSub/>},
            { path: "payouts", element: <PayoutInstructorPage/>},
            { path: "purchase-log", element: <PurchaseLog/>},
            { path: "setting", element:<SettingPage/>},
            { path:":courseId", element:<ViewDetailCourse /> },
            { path:":sessionId", element:<ViewDetailSession /> },
            { path:":lessonId", element:<ViewDetailLesson /> }
        ],
    },
    ]
    export default instructorRoute;