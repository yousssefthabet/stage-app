"use client";

import { apiClientWithAuth } from "@/server/axios";
import { typeOperationKey } from "./type-operation-constants";

import {
  type TypeOperationsGetOneResponse,
  type TypeOperationsGetResponse,
} from "./type-operation-api-types";
import { useQuery } from "@tanstack/react-query";

export async function getTypeOperation() {
  const client = await apiClientWithAuth();

  const result = await client.get<TypeOperationsGetResponse>(`/type-operation`);
  return result.data.data.data;
}

export const useTypeOperation = () => {
  return useQuery({
    queryKey: typeOperationKey,
    queryFn: () => getTypeOperation(),
  });
};

export async function getTypeOperationById(id: number | string) {
  const client = await apiClientWithAuth();
  const result = await client.get<TypeOperationsGetOneResponse>(
    `/type-operation/${id}`,
  );
  return result.data.data;
}

export const useTypeOperationById = (id: number | string, enabled = true) => {
  return useQuery({
    queryKey: [...typeOperationKey, id],
    queryFn: () => getTypeOperationById(id),
    enabled: !!id && enabled,
  });
};
