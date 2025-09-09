"use client";

import { customInstance } from "@/server/axios";
import { dossierGeneralKey } from "./dossier-general-constants";
import { useQuery } from "@tanstack/react-query";
import { type DossierGeneralGetResponse } from "./dossier-general-api-types";

export async function getDossierGeneral(id: string) {
  const result = await customInstance<DossierGeneralGetResponse>({
    url: `/projet/${id}/instruction`,
    method: "get",
  });

  return result.data;
}
export const useDossierGeneral = (id: string) => {
  return useQuery({
    queryKey: [...dossierGeneralKey, id],
    queryFn: () => getDossierGeneral(id),
  });
};
