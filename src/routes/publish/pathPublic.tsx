import { lazy } from "react";
import { ROUTER_URL } from "../../const/router.const"
import { RouteObject } from "react-router-dom";


const DefaultLayout = lazy(() => import("../../layout/DefaultLayout"));
const HomePage = lazy(() => import("../../pages/Home"));
const AllCourses = lazy(() => import("../../pages/AllCourses"));
const CoursesDetail = lazy(() => import("../../pages/CourseDetail/CourseDetail"));
const LoginPage = lazy(() => import("../../pages/Login/Login"));
const ForgotPasswordPage = lazy(() => import("../../pages/ForgotPassword"));
const Register = lazy(() => import("../../pages/Register/Register"));
const VerifyEmail = lazy(() => import("../../pages/Verifycaion"));

export const pathPublic: Record<string, RouteObject[]> = {
    [ROUTER_URL.COMMON.HOME]: [
    {
        element: <DefaultLayout/>,
        children: [
            {
                path:ROUTER_URL.COMMON.HOME,
                element: <HomePage/>,
            },
            {
                path:ROUTER_URL.COMMON.ALLCOURSES,
                element: <AllCourses/>,
            },
            {
                path:ROUTER_URL.COMMON.COURSEDETAIL,
                element: <CoursesDetail/>,
            }
        ]
    }
    ],
    [ROUTER_URL.LOGIN]: [
        {
          path: ROUTER_URL.LOGIN,
          element: <LoginPage />
        },
        {
          path: ROUTER_URL.REGISTER,
          element: <Register />
        },
        {
          path: ROUTER_URL.VERIFY_EMAIL,
          element: <VerifyEmail />
        },
        {
          path: ROUTER_URL.FORGOTPASSWORD,
          element: <ForgotPasswordPage />
        }
      ]
}