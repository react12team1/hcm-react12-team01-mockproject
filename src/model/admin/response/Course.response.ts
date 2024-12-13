import { CourseStatusEnum } from "../../Course";

//==================INSTRUCTOR=======================
export interface GetCourseResponse {
  pageData: GetCourseResponsePageData[];
  pageInfo: GetCourseResponsePageInfo;
}

export interface DisplayCourseResponse {
  pageData: GetCourseResponsePageData;
  pageInfo: GetCourseResponsePageInfo;
}

export type GetCourseResponsePageData = {
  _id: string;
  name: string;
  category_id: string;
  user_id: string;
  description: string;
  content: string;
  status: CourseStatusEnum;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  session_count: number;
  lesson_count: number;
};

export type GetCourseResponsePageInfo = {
  pageNum: number;
  pageSize: number;
};

export interface GetCourseByIdResponse {
  _id: string;
  name: string;
  category_id: string;
  user_id: string;
  description: string;
  content: string;
  status: CourseStatusEnum;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

export interface GetPublicCourseDetailResponse {
  _id: string;
  name: string;
  category_id: string;
  description: string;
  status: string;
  video_url: string;
  price: number;
  discount: number;
  created_at: Date;
  updated_at: Date;
  image_url: string;
  instructor_id: string;
  instructor_name: string;
  category_name: string;
  price_paid: number;
  average_rating: number;
  review_count: number;
  full_time: number;
  session_list: [
    {
      _id: string;
      name: string;
      position_order: number;
      lesson_list: [
        {
          _id: string;
          name: string;
          lesson_type: string;
          full_time: number;
          position_order: number;
        }
      ];
      full_time: number;
    }
  ];
  is_in_cart: boolean;
  is_purchased: boolean;
}

export interface CreateCourseResponse {
  name: string;
  category_id: string;
  user_id: string;
  description: string;
  content: string;
  status: CourseStatusEnum;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  is_deleted: boolean;
  _id: string;
  created_at: Date;
  updated_at: Date;
  __v: number;
}

export interface UpdateCourseResponse {
  _id: string;
  name: string;
  category_id: string;
  user_id: string;
  description: string;
  content: string;
  status: CourseStatusEnum;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

//==================CLIENT PUBLIC=======================
export interface GetPublicCourseResponse {
  pageData: GetCourseResponsePublic[];
  pageInfo: GetPublicCoursePageInfo;
}

export interface GetCourseResponsePublic {
  _id: string;
  name: string;
  category_id: string;
  category_name: string;
  status: string;
  description: string;
  video_url: string;
  image_url: string;
  price_paid: number;
  price: number;
  discount: number;
  full_time: number;
  average_rating: number;
  review_count: number;
  instructor_id: string;
  instructor_name: string;
  is_in_cart: boolean;
  is_purchased: boolean;
  session_count: number;
  lesson_count: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

export interface GetPublicCoursePageInfo {
  pageNum: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}


//=====================COURSE LOG======================
export interface CourseLogResponse {
  pageData: CourseLogResponseData[];
  pageInfo: GetCourseResponsePageInfo;
}

export type CourseLogResponseData = {
  _id: string;
  course_id: string;
  user_id: string;
  old_status: CourseStatusEnum | undefined;
  new_status: CourseStatusEnum | undefined;
  comment: string;
  created_at: Date;
  is_deleted: boolean;
  user_name: string;
  course_name: string;
};


