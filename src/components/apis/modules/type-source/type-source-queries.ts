"use client";

import { apiClientWithAuth } from "@/server/axios";
import { typeSourcesKey } from "./type-source-constants";

import { type TypeSourcesGetResponse } from "./type-source-api-types";
import { useQuery } from "@tanstack/react-query";

export async function getTypeSources() {
  const client = await apiClientWithAuth();

  const result = await client.get<TypeSourcesGetResponse>(`/type-source`);
  return result.data.data.data;
}

export const useTypeSources = () => {
  return useQuery({
    queryKey: typeSourcesKey,
    queryFn: () => getTypeSources(),
  });
};
