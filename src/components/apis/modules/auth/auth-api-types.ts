import { type User } from "@/apis/types/user-types";

export interface loginRequest {
  email: string;
  password: string;
}

export interface loginResponse {
  data: {
    access_token: string;
  };
}
export interface whoAmIResponse {
  statusCode: number;
  message: string;
  data: {
    message: string;
    user: User;
  };
}
