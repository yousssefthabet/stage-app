"use client";

import { customInstance } from "@/server/axios";
import { notaireKey } from "./notaire-constants";
import { useQuery } from "@tanstack/react-query";
import { type NotaireGetResponse } from "./notaire-api-types";

export async function getNotaire() {
  const result = await customInstance<NotaireGetResponse>({
    url: `/notaire`,
    method: "get",
  });

  return result.data;
}
export const useNotaire = () => {
  return useQuery({
    queryKey: [...notaireKey],
    queryFn: () => getNotaire(),
  });
};
