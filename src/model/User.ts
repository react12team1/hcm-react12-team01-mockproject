export enum UserRole {
    admin = "admin",
    student = "student",
    instructor = "instructor",
    all="all",
  }
  
  export interface User {
    _id: string;
    email: string;
    password: string;
    name: string;
    google_id: string | null;
    role: string;
    status: boolean;
    description: string;
    phone_number: string;
    avatar_url: string | null;
    video_url: string | null;
    dob: Date;
    is_verified: boolean;
    verification_token: string | null;
    verification_token_expires: string | null;
    token_version: number;
    balance: number;
    balance_total: number;
    withdrawn_amount: number;
    bank_name: string | null;
    bank_account_no: string | null;
    bank_account_name: string | null;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
  }
  

  export interface UpdateUser {
    email?: string;
    name?: string;
    description?: string;
    phone_number?: string;
    avatar_url?: string | null;
    video_url?: string | null;
    bank_name?: string | null;
    bank_account_no?: string | null;
    bank_account_name?: string | null;
    dob?: Date;
  }
  export interface ChangePasswordUser {
    user_id: string; // ID của người dùng
    old_password: string; // Mật khẩu cũ
    new_password: string; // Mật khẩu mới
  }
  