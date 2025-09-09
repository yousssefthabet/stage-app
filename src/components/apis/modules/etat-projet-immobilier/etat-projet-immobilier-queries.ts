"use client";

import { useQuery } from "@tanstack/react-query";
import { type EtatProjetImmobilierGetResponse } from "./etat-projet-immobilier-api-types";
import { etatProjetImmobilierKey } from "./etat-projet-immobilier-constants";
import { apiClientWithAuth } from "@/server/axios";

export async function getEtatProjetImmobilier() {
  const client = await apiClientWithAuth();

  const result = await client.get<EtatProjetImmobilierGetResponse>(
    `/etat-projet-immobilier`,
  );
  return result.data.data.data;
}

export const useEtatProjetImmobilier = () => {
  return useQuery({
    queryKey: etatProjetImmobilierKey,
    queryFn: () => getEtatProjetImmobilier(),
  });
};
