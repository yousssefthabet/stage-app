"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type MutationProps } from "@/types/mutation-props";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { apiClientWithAuth, customInstance } from "@/server/axios";
import { revenusMensuelleKey } from "./RevenusMensuelle-constants";
import { type RevenusMensuelle } from "@/apis/types/revenuMensuelle-type";

type UpdateRevenusInput = {
  id: string | null;
  props: RevenusMensuelle;
};

export const createRevenusMensuelle = async ({
  id,
  props,
}: UpdateRevenusInput) => {
  const client = await apiClientWithAuth();

  const result = await client.post<RevenusMensuelle>(
    `/customer/${id}/revenus-mensuelle`,
    props,
  );

  return result.data;
};

export const useCreateRevenusMensuelle = (
  id: string | null,
  props?: MutationProps<RevenusMensuelle>,
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: revenusMensuelleKey,
    mutationFn: (revenus: RevenusMensuelle) =>
      createRevenusMensuelle({ id, props: revenus }),
    onError: (e: unknown) => {
      if (isAxiosError<{ message: string }>(e)) {
        if (e.status != 422 && e.response?.data)
          toast.error(e.response?.data?.message);
        return;
      }
      toast.error(
        "Une erreur est survenue lors de la création du revenu mensuel.",
      );
    },
    ...props,
    onSuccess: (res) => {
      void qc.invalidateQueries({ queryKey: revenusMensuelleKey });
      props?.onSuccess?.(res);
    },
  });
};

export const updateRevenusMensuelle = async ({
  id,
  props,
}: UpdateRevenusInput) => {
  await customInstance({
    url: `/customer/${id}/revenus-mensuelle/${props.id}`,
    method: "PATCH",
    data: props,
  });
};

export const useUpdateRevenusMensuelle = (
  id: string | null,
  props?: MutationProps<void>,
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: [...revenusMensuelleKey, id],
    mutationFn: (revenus: RevenusMensuelle) =>
      updateRevenusMensuelle({ id, props: revenus }),
    onError: (e) => {
      props?.onError?.(e);
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: revenusMensuelleKey });
      props?.onSuccess?.();
    },
  });
};
