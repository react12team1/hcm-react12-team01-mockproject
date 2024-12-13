
export const ROUTER_URL = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL: "/verify-email/:token",
  RESEND_TOKEN: "/resend-verification",
  VIEW_DETAIL_INSTRUCTOR: "/view-detail/:id",
  ADMIN: {
    DASHBOARD: "/admin",
    ALL_COURSES: "/admin/all-courses",
    PENDING_COURSES: "/admin/pending-courses",
    PURCHASE_LOG: "/admin/purchase-log",
    //category
    CATEGORY: "/admin/category-management",
    EDIT_CATEGORY: "/admin/category-management/:id",

    REQUEST_MANAGEMENT: "/admin/request-management",
    USER_MANAGEMENT: "/admin/user-management",
    PAYOUT_MANAGEMENT: "/admin/payout-management",
    COURSES_LOG: "/admin/courses-log",
  },
  INSTRUCTOR: {
    INSTRUCTOR_DASHBOARD: "/instructor",
    MANAGE_COURSE: "/instructor/manage-course",
    VIEW_DETAIL_COURSE: "/instructor/manage-course/view-detail-course/:id",
    VIEW_DETAIL_SESSION: "/instructor/manage-course/view-detail-session/:id",
    VIEW_DETAIL_LESSON: "/instructor/manage-course/view-detail-lesson/:id",
    SALES_HISTORY: "/instructor/sales-history",
    INSTRUCTOR_COURSE_LOG: "/instructor/course-log",
    REVIEW: "/instructor/review",
    INSTRUCTOR_SUB: "/instructor/subscriptions",
    PAYOUT_INSTRUCTOR_PAGE: "/instructor/payouts",
    PURCHASE_LOG: "/instructor/purchase-log",
    MY_LEARNING: "/instructor/my-learning",
    SETTING: "/instructor/setting",
  },
  STUDENT: {
    STUDENT_DASHBOARD: "/student",
    ORDER_PAGE: "/student/order",
    SETTING_PAGE: "/student/setting",
    SUBSCRIPTION_PAGE: "/student/subscription",
    CHECKOUT_PAGE: "/student/order/checkout",
    MY_LEARNING: "/student/my-learning"
  },
  COMMON: {
    HOME: "/",
    COURSE_DETAIL: "/course/:id",
    ALL_COURSES: "/all",
    CART: "/cart",
    VIEW_DETAIL_INSTRUCTOR:"/view-detail/:id",
    COURSE_LESSON_DETAIL_PAGE:"/course/:courseId/lesson/:lessonId",
    COURSE_SESSION_DETAIL_PAGE: "/course/:courseId/session/:sessionId",
    COURSE_SESSION_LESSON_DETAIL_PAGE: "/course/:courseId/session/:sessionId/lesson/:lessonId",
    SESSION_DETAILS: "/session-details",
    LESSON_DETAILS: "/lesson-details",
  },
  UNAUTHORIZED: "/unauthorize"
};
