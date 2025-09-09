"use client";

import { useQuery } from "@tanstack/react-query";
import { rolesKey } from "./role-constants";
import { type RoleGetResponse } from "./role-api-types";
import { customInstance } from "@/server/axios";

export async function getRoles() {
  const result = await customInstance<RoleGetResponse>({
    url: `/role`,
    method: "GET",
  });
  return result.data.data;
}
export const useRoles = () => {
  return useQuery({
    queryKey: [rolesKey],
    queryFn: () => getRoles(),
  });
};
