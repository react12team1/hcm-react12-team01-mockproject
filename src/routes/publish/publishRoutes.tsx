import { RouteObject } from "react-router-dom";
import commonRoutes from "../sub/commonRoutes";
import authRoutes from "../sub/authRoutes";
const publishRoutes: RouteObject[] = [...commonRoutes, ...authRoutes];

export default publishRoutes;