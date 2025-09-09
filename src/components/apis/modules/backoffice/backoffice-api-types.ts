import { type User } from "@/apis/types/user-types";

export type UsersbackofficeGetResponse = {
  data: {
    data: User[];
  };
};
