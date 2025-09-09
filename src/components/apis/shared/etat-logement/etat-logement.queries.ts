"use client";

import { customInstance } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { type EtatLogementsListResponse } from "./etat-logement-api-types";
import { etatLogementKey } from "./etat-logement.constants";
export const getAllEtatLogements = async () => {
  return await customInstance<EtatLogementsListResponse>({
    url: `/etat-logement`,
    method: "GET",
  });
};

export const useAllEtatLogements = () =>
  useQuery({
    queryKey: [etatLogementKey],
    queryFn: () => getAllEtatLogements(),
  });
