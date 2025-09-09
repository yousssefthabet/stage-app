"use client";

import { useQuery } from "@tanstack/react-query";
import { type UsageLogementGetResponse } from "./usage-logement-api-types";
import { UsageLogementKey } from "./usage-logement-constants";
import { apiClientWithAuth } from "@/server/axios";

export async function getUsageLogement() {
  const client = await apiClientWithAuth();
  const result = await client.get<UsageLogementGetResponse>(`/usage-logement`);
  return result.data.data.data;
}

export const useUsageLogement = () => {
  return useQuery({
    queryKey: UsageLogementKey,
    queryFn: () => getUsageLogement(),
  });
};
