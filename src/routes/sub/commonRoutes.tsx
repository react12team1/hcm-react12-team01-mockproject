import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { DefaultLayout} from "../../layout";

//import lazy
const Home = lazy(() => import("../../pages/Home"));
const AllCourses = lazy(() => import("../../pages/AllCourses"));

//------------------------------------------------------------
const commonRoutes: RouteObject[] = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
        { index: true, element: <Home /> },
        { path: "home-all-courses", element: <AllCourses /> },   
      
    ],
  },
];

export default commonRoutes;