"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  type CreateFastProjectRequestResponse,
  type CreateFastProjectRequest,
} from "./fast-project-api-types";
import { type MutationProps } from "@/types/mutation-props";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { fastProjectsKey } from "./fast-project-constants";
import { apiClientWithAuth } from "@/server/axios";

export const createFastProject = async (data: CreateFastProjectRequest) => {
  const client = await apiClientWithAuth();

  const result = await client.post<CreateFastProjectRequestResponse>(
    `fast-project`,
    data,
  );

  return result.data;
};

export const useCreateFastProject = (
  props?: MutationProps<CreateFastProjectRequestResponse>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: fastProjectsKey,
    mutationFn: createFastProject,
    onError: (e: unknown) => {
      if (isAxiosError<{ message: string }>(e)) {
        if (e.status != 422 && e.response?.data)
          toast.error(e.response?.data?.message);
        return;
      }
      toast.error(
        "Une erreur est survenue lors de la creation du projet rapide.",
      );
    },
    ...props,
    onSuccess: (res) => {
      void qc.invalidateQueries({ queryKey: fastProjectsKey });
      props?.onSuccess?.(res);
    },
  });
};
export const updateFastProject = async (
  props: CreateFastProjectRequestResponse,
) => {
  const client = await apiClientWithAuth();

  await client.patch(`/fast-project/${props.data.id}`, props.data);
};
export const useUpdateFastProject = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: fastProjectsKey,
    mutationFn: updateFastProject,
    onError: (e) => {
      if (isAxiosError(e)) {
        if (e.status !== 422) {
          const responseData = e.response?.data as
            | Record<string, unknown>
            | undefined;
          let errorMessage = "";

          if (responseData && typeof responseData === "object") {
            const message = responseData.message;
            if (
              message !== undefined &&
              (typeof message === "string" || typeof message === "number")
            ) {
              errorMessage = String(message);
            }
          }

          if (errorMessage) {
            toast.error(errorMessage);
          }
        }
        return;
      }
      toast.error(
        "Une erreur est survenue lors de la suppression d'utilisateur",
      );
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: fastProjectsKey });
      props?.onSuccess?.();
    },
  });
};
