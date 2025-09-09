import { type Role } from "@/apis/types/role-types";

export type RoleGetResponse = {
  data: {
    data: Role[];
  };
};
