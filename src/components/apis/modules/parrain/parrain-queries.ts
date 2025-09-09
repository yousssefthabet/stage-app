"use client";

import { useQuery } from "@tanstack/react-query";
import { parrainsKey } from "./parrain-constants";
import { type UsersparrainGetResponse } from "./parrain-api-types";
import { apiClientWithAuth } from "@/server/axios";

export async function getParrain(queryString: string) {
  const client = await apiClientWithAuth();

  const result = await client.get<UsersparrainGetResponse>(
    `/user/parrain${queryString}`,
  );
  return result.data.data;
}
export const useUsersParrain = (queryString: string | null) => {
  const queryStringFinal = queryString ? `?id=${queryString}` : "";

  return useQuery({
    queryKey: [...parrainsKey, queryString],
    queryFn: () => getParrain(queryStringFinal),
  });
};
