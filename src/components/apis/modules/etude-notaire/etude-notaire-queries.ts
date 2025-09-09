"use client";

import { customInstance } from "@/server/axios";
import { etudeNotaireKey } from "./etude-notaire-constants";
import { useQuery } from "@tanstack/react-query";
import { type EtudeNotaireGetResponse } from "./etude-notaire-api-types";

export async function getEtudeNotaire() {
  const result = await customInstance<EtudeNotaireGetResponse>({
    url: `/etude-notaire`,
    method: "get",
  });

  return result.data;
}
export const useEtudeNotaire = () => {
  return useQuery({
    queryKey: [...etudeNotaireKey],
    queryFn: () => getEtudeNotaire(),
  });
};
