"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type MutationProps } from "@/types/mutation-props";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { apiClientWithAuth, customInstance } from "@/server/axios";
import { type DepensesMensuelleCommunGetResponse } from "./depenses-mensuelle-commun-api-types";
import { DepensesMensuelleCommunKey } from "./depenses-mensuelle-commun-constants";
import { type DepensesMensuelleCommun } from "@/apis/types/DepensesMensuelleCommun-type";
type UpdateDepensesMensuelleCommunInput = {
  id: string;
  props: DepensesMensuelleCommun;
};

export const createDepensesMensuelleCommun = async (
  id: string,
  data: DepensesMensuelleCommun,
) => {
  await customInstance<DepensesMensuelleCommunGetResponse>({
    url: `/customer/${id}/depenses-mensuelle-commun`,
    method: "POST",
    data,
  });
};

export const useCreateDepensesMensuelleCommun = (
  id: string,
  props?: MutationProps<void>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: DepensesMensuelleCommunKey,
    mutationFn: (data: DepensesMensuelleCommun) =>
      createDepensesMensuelleCommun(id, data),
    onError: (e: Error) => {
      props?.onError?.(e);
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: DepensesMensuelleCommunKey });
      props?.onSuccess?.();
    },
  });
};
export const updateDepensesMensuelleCommun = async ({
  id,
  props,
}: UpdateDepensesMensuelleCommunInput) => {
  const client = await apiClientWithAuth();

  await client.patch(
    `/customer/${id}/depenses-mensuelle-commun/${props.id}`,
    props,
  );
};
export const useUpdateDepensesMensuelleCommun = (
  id: string,
  props?: MutationProps<void>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: DepensesMensuelleCommunKey,
    mutationFn: (DepensesMensuelleCommun: DepensesMensuelleCommun) =>
      updateDepensesMensuelleCommun({ id, props: DepensesMensuelleCommun }),
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
      void qc.invalidateQueries({ queryKey: DepensesMensuelleCommunKey });
      props?.onSuccess?.();
    },
  });
};
