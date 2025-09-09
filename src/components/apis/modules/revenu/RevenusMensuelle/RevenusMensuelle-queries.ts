"use client";

import { customInstance } from "@/server/axios";

import { useQuery } from "@tanstack/react-query";
import { revenusMensuelleKey } from "./RevenusMensuelle-constants";
import { type RevenusMensuelleGetResponse } from "./RevenusMensuelle-api-types";

export async function getRevenusMensuelle(id: string | null) {
  const result = await customInstance<RevenusMensuelleGetResponse>({
    url: `/customer/${id}/revenus-mensuelle`,
    method: "get",
  });
  return result.data;
}

export const useRevenusMensuelle = (id: string | null) => {
  return useQuery({
    queryKey: revenusMensuelleKey,
    queryFn: () => getRevenusMensuelle(id),
  });
};
