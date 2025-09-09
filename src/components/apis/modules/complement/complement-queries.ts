"use client";

import { apiClientWithAuth } from "@/server/axios";
import { type ComplementssGetResponse } from "./complement-api-types";
import { complementKey } from "./complement-constants";
import { useQuery } from "@tanstack/react-query";

export async function getComplement(id: string) {
  const client = await apiClientWithAuth();

  const result = await client.get<ComplementssGetResponse>(
    `/customer/${id}/complement`,
  );
  return result.data.data;
}
export const useComplements = (id: string) => {
  return useQuery({
    queryKey: [...complementKey, id],
    queryFn: () => getComplement(id),
    enabled: !!id,
  });
};
