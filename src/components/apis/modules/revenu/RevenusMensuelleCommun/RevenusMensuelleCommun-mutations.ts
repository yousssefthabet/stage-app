"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type MutationProps } from "@/types/mutation-props";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { apiClientWithAuth } from "@/server/axios";
import { revenusMensuelleCommunKey } from "./RevenusMensuelleCommun-constants";
import { type RevenusMensuelleCommunGetResponse } from "./RevenusMensuelleCommun-api-types";
import { type RevenusMensuelleCommun } from "@/apis/types/RevenusMensuelleCommun-type";
type UpdateRevenusCommunInput = {
  id: string;
  props: RevenusMensuelleCommun;
};
export const createRevenusMensuelleCommun = async ({
  id,
  props,
}: UpdateRevenusCommunInput) => {
  const client = await apiClientWithAuth();

  const result = await client.post<RevenusMensuelleCommunGetResponse>(
    `/customer/${id}/revenus-mensuelle-commun`,
    props,
  );

  return result.data;
};

export const useCreateRevenusMensuelleCommun = (
  id: string,
  props?: MutationProps<RevenusMensuelleCommunGetResponse>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: revenusMensuelleCommunKey,
    mutationFn: (revenus: RevenusMensuelleCommun) =>
      createRevenusMensuelleCommun({ id, props: revenus }),

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
    onSuccess: (data) => {
      void qc.invalidateQueries({ queryKey: revenusMensuelleCommunKey });
      if (props?.onSuccess) {
        props.onSuccess(data);
      }
    },
  });
};
export const updateRevenusMensuelleCommun = async ({
  id,
  props,
}: UpdateRevenusCommunInput) => {
  const client = await apiClientWithAuth();
  await client.patch(
    `/customer/${id}/revenus-mensuelle-commun/${props.id}`,
    props,
  );
};
export const useUpdateRevenusMensuelleCommun = (
  id: string,

  props?: MutationProps<void>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: revenusMensuelleCommunKey,
    mutationFn: (revenus: RevenusMensuelleCommun) =>
      updateRevenusMensuelleCommun({ id, props: revenus }),

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
      void qc.invalidateQueries({ queryKey: revenusMensuelleCommunKey });
      props?.onSuccess?.();
    },
  });
};
