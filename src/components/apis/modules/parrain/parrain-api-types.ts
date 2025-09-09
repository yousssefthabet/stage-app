import { type User } from "@/apis/types/user-types";

export type UsersparrainGetResponse = {
  data: {
    data: User[];
  };
};
