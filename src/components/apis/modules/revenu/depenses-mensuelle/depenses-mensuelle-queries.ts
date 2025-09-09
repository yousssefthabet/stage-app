"use client";

import { customInstance } from "@/server/axios";

import { type DepensesMensuelleGetResponse } from "./depenses-mensuelle-api-types";
import { useQuery } from "@tanstack/react-query";
import { DepensesMensuelleKey } from "./depenses-mensuelle-constants";

export async function getDepensesMensuelle(id: string) {
  const result = await customInstance<DepensesMensuelleGetResponse>({
    url: `/customer/${id}/depenses-mensuelle`,
    method: "get",
  });

  return result.data;
}
export const useDepensesMensuelle = (id: string) => {
  return useQuery({
    queryKey: DepensesMensuelleKey,
    queryFn: () => getDepensesMensuelle(id),
  });
};
