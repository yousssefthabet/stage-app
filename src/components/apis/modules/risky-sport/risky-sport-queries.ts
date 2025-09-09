"use client";

import { apiClientWithAuth } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { riskySportKey } from "./risky-sport-constants";
import { type roskySportsGetResponse } from "./risky-sport-api-types";

export async function getRiskySports() {
  const client = await apiClientWithAuth();
  const result = await client.get<roskySportsGetResponse>(`/risky-sport`);
  return result.data.data;
}

export const useRiskySports = () => {
  return useQuery({
    queryKey: riskySportKey,
    queryFn: () => getRiskySports(),
  });
};
