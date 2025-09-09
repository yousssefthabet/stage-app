import { type User } from "@/apis/types/user-types";

export type UsersGetResponse = {
  data: {
    data: User[];
    lastPage: number;
    total: number;
  };
};
export interface CreateCommissionRequest {
  id?: string;
  value?: string;
  percentage?: string;
  userId: string;
  typeCommission?: "general" | "biens";
}
