"use client";

import { apiClientWithAuth } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { backofficesKey } from "./backoffice-constants";
import { type UsersbackofficeGetResponse } from "./backoffice-api-types";

export async function getBackoffice() {
  const client = await apiClientWithAuth();

  const result =
    await client.get<UsersbackofficeGetResponse>(`/user/backoffice`);
  return result.data.data;
}
export const useUsersBackoffice = () => {
  return useQuery({
    queryKey: [backofficesKey],
    queryFn: () => getBackoffice(),
  });
};
