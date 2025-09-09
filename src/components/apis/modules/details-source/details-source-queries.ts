"use client";

import { DetailsSourcesKey } from "./details-source-constants";

import { type DetailsSourcesGetResponse } from "./details-source-api-types";
import { useQuery } from "@tanstack/react-query";
import { apiClientWithAuth } from "@/server/axios";

export async function getDetailsSources() {
  const client = await apiClientWithAuth();

  const result = await client.get<DetailsSourcesGetResponse>(`/details-source`);
  return result.data.data.data;
}

export const useDetailsSources = () => {
  return useQuery({
    queryKey: DetailsSourcesKey,
    queryFn: () => getDetailsSources(),
  });
};
