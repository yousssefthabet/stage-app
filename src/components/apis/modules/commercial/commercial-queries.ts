"use client";

import { apiClientWithAuth } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { commercialsKey } from "./commercial-constants";
import { type UserscommercialGetResponse } from "./commercial-api-types";

export async function getCommercial() {
  const client = await apiClientWithAuth();

  const result =
    await client.get<UserscommercialGetResponse>(`/user/commercial`);
  return result.data.data;
}
export const useUsersCommercial = () => {
  return useQuery({
    queryKey: [commercialsKey],
    queryFn: () => getCommercial(),
  });
};
