"use client";

import { useQuery } from "@tanstack/react-query";
import { type SocietesGetResponse } from "./societe-api-types";
import { societesKey } from "./societe-constants";
import { apiClientWithAuth } from "@/server/axios";

export async function getSociete() {
  const client = await apiClientWithAuth();

  const result = await client.get<SocietesGetResponse>(`/societe`);
  return result.data.data;
}
export const useSociete = () => {
  return useQuery({
    queryKey: [societesKey],
    queryFn: () => getSociete(),
  });
};
