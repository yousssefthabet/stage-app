"use client";

import { apiClientWithAuth, customInstance } from "@/server/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type PatrimoineListResponse,
  type CreditRequest,
  type CreditUpdateRequest,
  type PatrimoineRequest,
  type PatrimoineUpdateRequest,
  type CreditsListResponse,
} from "@/apis/modules/credit-patrimoine/types";
import {
  creditePatrimoineKey,
  patrimoineKeys,
} from "@/apis/modules/credit-patrimoine/constants";
import { type PaginationParams } from "@/apis/shared/types/pagination-params.type";

export const getAllCredits = async (
  applicationId: string,
  req: PaginationParams,
) => {
  const client = await apiClientWithAuth();
  const result = await client.get<CreditsListResponse>(
    `credit-patrimoine/${applicationId}/credit`,
    {
      params: req,
    },
  );
  return result.data;
};

export const getCreditById = async (
  applicationId: number | string,
  id: number | string,
) => {
  const client = await apiClientWithAuth();
  return client.get(`credit-patrimoine/${applicationId}/credit/${id}`);
};

export const createCredit = async (
  applicationId: string,
  data: CreditRequest,
) => {
  return await customInstance({
    url: `credit-patrimoine/${applicationId}/credit`,
    method: "POST",
    data: data,
  });
};

export const updateCredit = async (
  applicationId: number | string,
  id: number | string,
  data: CreditUpdateRequest,
) => {
  const client = await apiClientWithAuth();
  return client.patch(`credit-patrimoine/${applicationId}/credit/${id}`, data);
};

export const deleteCredit = async (
  applicationId: number | string,
  id: number | string,
) => {
  const client = await apiClientWithAuth();
  return client.delete(`credit-patrimoine/${applicationId}/credit/${id}`);
};

export const useCredits = (applicationId: string, req: PaginationParams) => {
  return useQuery({
    queryKey: [...creditePatrimoineKey, applicationId, req],
    queryFn: () => getAllCredits(applicationId, req),
  });
};

export const useCredit = (
  applicationId: number | string,
  id: number | string,
) => {
  return useQuery({
    queryKey: [...creditePatrimoineKey, applicationId, id],
    queryFn: () => getCreditById(applicationId, id),
  });
};

export const useCreateCredit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      applicationId,
      data,
    }: {
      applicationId: string;
      data: CreditRequest;
    }) => createCredit(applicationId, data),
    onSuccess: (_) => {
      void queryClient.invalidateQueries({
        queryKey: [...creditePatrimoineKey],
      });
    },
  });
};

export const useUpdateCredit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      applicationId,
      id,
      data,
    }: {
      applicationId: string;
      id: number | string;
      data: CreditUpdateRequest;
    }) => updateCredit(applicationId, id, data),
    onSuccess: (_, { applicationId }) => {
      void queryClient.invalidateQueries({
        queryKey: [...creditePatrimoineKey, applicationId],
      });
    },
  });
};

export const useDeleteCredit = (applicationId: number | string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { idApplication: string; id: string }) =>
      deleteCredit(applicationId, id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [...creditePatrimoineKey, applicationId],
      });
    },
  });
};

export const getAllPatrimoines = async (
  applicationId: string,
  req: PaginationParams,
) => {
  const client = await apiClientWithAuth();

  const result = await client.get<PatrimoineListResponse>(
    `/credit-patrimoine/${applicationId}/patrimoine`,
    {
      params: req,
    },
  );

  return result.data;
};
export const getOnePatrimoine = async (
  applicationId: string | number,
  id: string | number,
) => {
  return await customInstance({
    url: `/credit-patrimoine/${applicationId}/patrimoine/${id}`,
    method: "GET",
  });
};

export const createPatrimoine = async (
  applicationId: string | number,
  data: PatrimoineRequest,
) => {
  return await customInstance({
    url: `/credit-patrimoine/${applicationId}/patrimoine`,
    method: "POST",
    data: data,
  });
};

export const updatePatrimoine = async (
  applicationId: string | number,
  id: string | number,
  data: PatrimoineUpdateRequest,
) => {
  return await customInstance({
    url: `/credit-patrimoine/${applicationId}/patrimoine/${id}`,
    method: "PATCH",
    data: data,
  });
};

export const deletePatrimoine = async (
  applicationId: string | number,
  id: string | number,
) => {
  return await customInstance({
    url: `/credit-patrimoine/${applicationId}/patrimoine/${id}`,
    method: "DELETE",
  });
};

export const usePatrimoines = (applicationId: string, req: PaginationParams) =>
  useQuery({
    queryKey: [...patrimoineKeys, applicationId, req],
    queryFn: () => getAllPatrimoines(applicationId, req),
  });

export const usePatrimoine = (
  applicationId: number | string,
  id: number | string,
) =>
  useQuery({
    queryKey: [...patrimoineKeys],
    queryFn: () => getOnePatrimoine(applicationId, id),
  });

export const useCreatePatrimoine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      applicationId,
      data,
    }: {
      applicationId: number | string;
      data: PatrimoineRequest;
    }) => createPatrimoine(applicationId, data),
    onSuccess: (_, { applicationId }) => {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: [...patrimoineKeys, applicationId],
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: [...creditePatrimoineKey, applicationId],
          refetchType: "all",
        }),
      ]);
    },
  });
};

export const useUpdatePatrimoine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      applicationId,
      id,
      data,
    }: {
      applicationId: number | string;
      id: number | string;
      data: PatrimoineUpdateRequest;
    }) => updatePatrimoine(applicationId, id, data),
    onSuccess: (_, { applicationId }) => {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: [...patrimoineKeys, applicationId],
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: [...creditePatrimoineKey, applicationId],
          refetchType: "all",
        }),
      ]);
    },
  });
};

export const useDeletePatrimoine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      applicationId,
      id,
    }: {
      applicationId: number | string;
      id: number | string;
    }) => deletePatrimoine(applicationId, id),
    onSuccess: (_, { applicationId }) => {
      void queryClient.invalidateQueries({
        queryKey: [...patrimoineKeys, applicationId],
      });
    },
  });
};
