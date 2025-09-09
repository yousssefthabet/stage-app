"use client";

import { apiClientWithAuth } from "@/server/axios";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { identiteKey } from "./identite-constants";
import { type identiteGetResponse } from "./identite-api-types";
import { type Identite } from "@/apis/types/identite-types";

export async function getIdentite(id: string) {
  const client = await apiClientWithAuth();
  const result = await client.get<identiteGetResponse>(
    `/customer/${id}/identity`,
  );
  return result.data.data.data;
}

export const useIdentite = (
  id: string,
  options?: Omit<
    UseQueryOptions<Identite, Error, Identite, [string, string]>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<Identite, Error, Identite, [string, string]>({
    queryKey: [...identiteKey, id] as [string, string],
    queryFn: () => getIdentite(id),
    enabled: !!id, // move enabled here instead of from outside
    ...options,
  });
};
