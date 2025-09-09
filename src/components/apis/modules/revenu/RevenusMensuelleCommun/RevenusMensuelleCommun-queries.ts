"use client";

import { customInstance } from "@/server/axios";

import { useQuery } from "@tanstack/react-query";
import { type RevenusMensuelleCommunGetResponse } from "./RevenusMensuelleCommun-api-types";
import { revenusMensuelleCommunKey } from "./RevenusMensuelleCommun-constants";

export async function getRevenusMensuelleCommun(id: string) {
  const result = await customInstance<RevenusMensuelleCommunGetResponse>({
    url: `/customer/${id}/revenus-mensuelle-commun`,
    method: "get",
  });

  return result.data;
}

export const useRevenusMensuelleCommun = (id: string) => {
  return useQuery({
    queryKey: revenusMensuelleCommunKey,
    queryFn: () => getRevenusMensuelleCommun(id),
  });
};
