"use client";

import { customInstance } from "@/server/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projetFinancementDetailKey } from "./detail-projet-financement.constants";
import {
  type ProjetFinancementDetailCreateRequest,
  type ProjetFinancementDetailListResponse,
  type ProjetFinancementDetailResponse,
  type ProjetFinancementDetailUpdateRequest,
} from "./detail-projet-financement.types";

export const getProjetFinancementDetail = async (
  idApplication: string | number,
): Promise<ProjetFinancementDetailResponse> => {
  const response = await customInstance<ProjetFinancementDetailListResponse>({
    url: `/projet-financement/${idApplication}/detail`,
    method: "GET",
  });
  return response.data;
};

export const useProjetFinancementDetail = (idApplication: string | number) =>
  useQuery({
    queryKey: [...projetFinancementDetailKey, idApplication],
    queryFn: () => getProjetFinancementDetail(idApplication),
    enabled: !!idApplication,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

export const createProjetFinancementDetail = async (
  idApplication: string | number,
  data: ProjetFinancementDetailCreateRequest,
): Promise<ProjetFinancementDetailResponse> => {
  const response = await customInstance<ProjetFinancementDetailListResponse>({
    url: `/projet-financement/${idApplication}/detail`,
    method: "POST",
    data,
  });
  return response.data;
};

export const useCreateProjetFinancementDetail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      idApplication,
      data,
    }: {
      idApplication: string | number;
      data: ProjetFinancementDetailCreateRequest;
    }) => createProjetFinancementDetail(idApplication, data),
    onSuccess: async (_, { idApplication }) => {
      await queryClient.invalidateQueries({
        queryKey: [...projetFinancementDetailKey, idApplication],
      });
    },
  });
};

export const updateProjetFinancementDetail = async (
  idApplication: string | number,
  data: ProjetFinancementDetailUpdateRequest,
  signal?: AbortSignal,
): Promise<ProjetFinancementDetailResponse> => {
  const response = await customInstance<{
    data: ProjetFinancementDetailResponse;
  }>({
    url: `/projet-financement/${idApplication}/detail`,
    method: "PATCH",
    data,
    signal,
  });
  return response.data;
};

export const useUpdateProjetFinancementDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      idApplication,
      data,
      signal,
    }: {
      idApplication: string | number;
      data: ProjetFinancementDetailUpdateRequest;
      signal?: AbortSignal;
    }) => updateProjetFinancementDetail(idApplication, data, signal),

    onSuccess: (data, { idApplication }) => {
      queryClient.setQueryData(
        [...projetFinancementDetailKey, idApplication],
        data,
      );
    },
  });
};
