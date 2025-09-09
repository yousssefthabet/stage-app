"use client";

import { apiClientWithAuth, customInstance } from "@/server/axios";
import {
  UpdateApplication,
  type ProjetGetAllResponse,
  type ProjetGetResponse,
} from "./projet-api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projetKey } from "./projet-constants";
import { Projet } from "@/apis/types/projet-types";

export async function getProjet(
  page: number,
  stepId?: string | string[] | null,
) {
  const params: Record<string, string | number | undefined> = {};
  if (stepId) {
    if (Array.isArray(stepId)) {
      params.stepsId = stepId.join(",");
    } else {
      params.stepsId = stepId;
    }
  }
  params.page = page;

  return await customInstance<ProjetGetAllResponse>({
    url: `/projet`,
    method: "get",
    params: params,
  });
}
export const useProjet = (page: number, stepId?: string | string[] | null) => {
  return useQuery({
    queryKey: [...projetKey, stepId, page],
    queryFn: () => getProjet(page, stepId),
  });
};

export async function getProjetById(id?: string) {
  if (!id) return null;

  const client = await apiClientWithAuth();
  const result = await client.get<ProjetGetResponse>(`/projet/${id}`);
  return result.data.data;
}

export const useProjetById = (id: string) => {
  return useQuery({
    queryKey: [...projetKey, id],
    queryFn: () => getProjetById(id),
    enabled: !!id,
  });
};
