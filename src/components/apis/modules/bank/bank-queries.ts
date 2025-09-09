"use client";

import { apiClientWithAuth } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { bankKey } from "./bank-constants";
import { type banksGetResponse } from "./bank-api-types";
import { type Bank } from "@/apis/types/bank-type";

export async function getBanks(): Promise<Bank[]> {
  const client = await apiClientWithAuth();
  const result = await client.get<banksGetResponse>(`/bank-tenant`);
  return result.data.data;
}

export const useBanks = () => {
  return useQuery<Bank[]>({
    queryKey: bankKey,
    queryFn: () => getBanks(),
  });
};
