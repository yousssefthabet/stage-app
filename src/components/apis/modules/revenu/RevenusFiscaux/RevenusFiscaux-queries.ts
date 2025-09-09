"use client";

import { customInstance } from "@/server/axios";

import { useQuery } from "@tanstack/react-query";
import { RevenusFiscauxKey } from "./RevenusFiscaux-constants";
import { type RevenusFiscauxGetResponse } from "./RevenusFiscaux-api-types";

export async function getRevenusFiscaux(id: string) {
  const result = await customInstance<RevenusFiscauxGetResponse>({
    url: `/customer/${id}/revenus-fiscaux`,
    method: "get",
  });
  return result.data;
}

export const useRevenusFiscaux = (id: string) => {
  return useQuery({
    queryKey: RevenusFiscauxKey,
    queryFn: () => getRevenusFiscaux(id),
  });
};
