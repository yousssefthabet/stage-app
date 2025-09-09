"use client";

import {
  pochettesKey,
  pochettFilesHistoryKey,
  pochettFilessKey,
  visibilityFieldsKey,
} from "./pochettes-constants";
import {
  type PochetteFilesResponse,
  type PochettesGetResponse,
  type visibilityFieldsGetResponse,
} from "./pochettes-api-types";
import { useQuery } from "@tanstack/react-query";
import { customInstance } from "@/server/axios";

export async function getPochettes() {
  const result = await customInstance<PochettesGetResponse>({
    url: `/pochettes`,
    method: "GET",
  });
  return result.data.pochettes;
}
export const usePochettes = () => {
  return useQuery({
    queryKey: pochettesKey,
    queryFn: () => getPochettes(),
  });
};

export const getVisibilityFields = async () => {
  const result = await customInstance<visibilityFieldsGetResponse>({
    url: `/pochettes/visibility-fields`,
    method: "GET",
  });
  return result.data.fields;
};

export const useVisibilityFields = () => {
  return useQuery({
    queryKey: visibilityFieldsKey,
    queryFn: () => getVisibilityFields(),
  });
};

export async function getPochetteFiles(
  applicationId: bigint | string,
  pochetteId: string,
) {
  const result = await customInstance<PochetteFilesResponse>({
    url: `/projet/${applicationId}/pochette/${pochetteId}/files`,
    method: "GET",
  });
  return result.data;
}

export const useGetPochetteFiles = (
  applicationId: bigint | string,
  pochetteId: string,
) => {
  return useQuery({
    queryKey: [pochettFilessKey, applicationId, pochetteId],
    queryFn: () => getPochetteFiles(applicationId, pochetteId),
  });
};

export async function getFiles(applicationId: bigint | string) {
  const result = await customInstance<PochetteFilesResponse>({
    url: `/projet/${applicationId}/files`,
    method: "GET",
  });
  return result.data;
}

export const useGetFiles = (applicationId: bigint | string) => {
  return useQuery({
    queryKey: [pochettFilesHistoryKey, applicationId],
    queryFn: () => getFiles(applicationId),
  });
};
