"use client";

import { customInstance } from "@/server/axios";

import { useQuery } from "@tanstack/react-query";
import { DepensesMensuelleCommunKey } from "./depenses-mensuelle-commun-constants";
import { type DepensesMensuelleCommunGetResponse } from "./depenses-mensuelle-commun-api-types";

export async function getDepensesMensuelleCommun(id: string) {
  const result = await customInstance<DepensesMensuelleCommunGetResponse>({
    url: `/customer/${id}/depenses-mensuelle-commun`,
    method: "get",
  });
  return result.data;
}

export const useDepensesMensuelleCommun = (id: string) => {
  return useQuery({
    queryKey: DepensesMensuelleCommunKey,
    queryFn: () => getDepensesMensuelleCommun(id),
  });
};
