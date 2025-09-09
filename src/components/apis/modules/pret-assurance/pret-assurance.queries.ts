"use client";

import { customInstance } from "@/server/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type PretAssuranceListResponse,
  type PretAssuranceRequest,
  type PretAssuranceResponse,
  type UpdatePretAssuranceRequest,
} from "./pret-assurance.types";
import { pretAssuranceKey } from "./pret-assurance.constants";
interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export const getAllPretAssurances = async (
  idApplication: string | number,
): Promise<PretAssuranceResponse[]> => {
  const response = await customInstance<PretAssuranceListResponse>({
    url: `/general/${idApplication}/pret-assurance`,
    method: "GET",
  });
  return response.data;
};

export const usePretAssurances = (idApplication: string | number) =>
  useQuery({
    queryKey: [...pretAssuranceKey, idApplication],
    queryFn: () => getAllPretAssurances(idApplication),
  });

export const createPretAssurance = async (
  idApplication: string | number,
  data: PretAssuranceRequest,
): Promise<ApiResponse<PretAssuranceResponse>> => {
  const response = await customInstance<ApiResponse<PretAssuranceResponse>>({
    url: `/general/${idApplication}/pret-assurance`,
    method: "POST",
    data,
  });

  return response;
};

export const useCreatePretAssurance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      idApplication,
      data,
    }: {
      idApplication: string | number;
      data: PretAssuranceRequest;
    }) => createPretAssurance(idApplication, data),
    onSuccess: (_, { idApplication }) => {
      return queryClient.invalidateQueries({
        queryKey: [...pretAssuranceKey, idApplication],
      });
    },
  });
};

export const updatePretAssurance = async (
  idApplication: string | number,
  idPretAssurance: string | number,
  data: UpdatePretAssuranceRequest,
): Promise<PretAssuranceResponse> => {
  const response = await customInstance<PretAssuranceResponse>({
    url: `/general/${idApplication}/pret-assurance/${idPretAssurance}`,
    method: "PATCH",
    data,
  });
  return response;
};

export const useUpdatePretAssurance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      idApplication,
      idPretAssurance,
      data,
    }: {
      idApplication: string | number;
      idPretAssurance: string | number;
      data: UpdatePretAssuranceRequest;
    }) => updatePretAssurance(idApplication, idPretAssurance, data),
    onSuccess: (_, { idApplication }) => {
      return queryClient.invalidateQueries({
        queryKey: [...pretAssuranceKey, idApplication],
      });
    },
  });
};

export const deletePretAssurance = async (
  idApplication: string | number,
  idPretAssurance: string | number,
): Promise<void> => {
  await customInstance<void>({
    url: `/general/${idApplication}/pret-assurance/${idPretAssurance}`,
    method: "DELETE",
  });
};

export const useDeletePretAssurance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      idApplication,
      idPretAssurance,
    }: {
      idApplication: string | number;
      idPretAssurance: string | number;
    }) => deletePretAssurance(idApplication, idPretAssurance),
    onSuccess: (_, { idApplication }) => {
      return queryClient.invalidateQueries({
        queryKey: [...pretAssuranceKey, idApplication],
      });
    },
  });
};
