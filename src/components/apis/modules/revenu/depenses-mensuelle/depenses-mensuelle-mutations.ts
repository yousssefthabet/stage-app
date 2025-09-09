"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type MutationProps } from "@/types/mutation-props";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { apiClientWithAuth } from "@/server/axios";
import { type DepensesMensuelleGetResponse } from "./depenses-mensuelle-api-types";
import { DepensesMensuelleKey } from "./depenses-mensuelle-constants";
import { type DepensesMensuelle } from "@/apis/types/depensesMensuelle-type";
type UpdateDepensesMensuelleInput = {
  id: string | null;
  props: DepensesMensuelle;
};

export const createDepensesMensuelle = async ({
  id,
  props,
}: UpdateDepensesMensuelleInput) => {
  const client = await apiClientWithAuth();

  const result = await client.post<DepensesMensuelle>(
    `/customer/${id}/depenses-mensuelle`,
    props,
  );

  return result.data;
};

export const useCreateDepensesMensuelle = (
  id: string | null,
  props?: MutationProps<DepensesMensuelle>,
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: DepensesMensuelleKey,
    mutationFn: (revenus: DepensesMensuelle) =>
      createDepensesMensuelle({ id, props: revenus }),
    onError: (e: unknown) => {
      if (isAxiosError<{ message: string }>(e)) {
        if (e.status != 422 && e.response?.data)
          toast.error(e.response?.data?.message);
        return;
      }
      toast.error(
        "Une erreur est survenue lors de la création du depense mensuel.",
      );
    },
    ...props,
    onSuccess: (res) => {
      void qc.invalidateQueries({ queryKey: DepensesMensuelleKey });
      props?.onSuccess?.(res);
    },
  });
};

export const updateDepensesMensuelle = async ({
  id,
  props,
}: UpdateDepensesMensuelleInput) => {
  const client = await apiClientWithAuth();

  await client.patch(`/customer/${id}/depenses-mensuelle/${props.id}`, props);
};
export const useUpdateDepensesMensuelle = (
  id: string,
  props?: MutationProps<void>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: DepensesMensuelleKey,
    mutationFn: (DepensesMensuelle: DepensesMensuelle) =>
      updateDepensesMensuelle({ id, props: DepensesMensuelle }),

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
      void qc.invalidateQueries({ queryKey: DepensesMensuelleKey });
      props?.onSuccess?.();
    },
  });
};
