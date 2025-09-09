"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type MutationProps } from "@/types/mutation-props";

import { customInstance } from "@/server/axios";
import { type RevenusFiscauxGetResponse } from "./RevenusFiscaux-api-types";
import { RevenusFiscauxKey } from "./RevenusFiscaux-constants";
import { type RevenusFiscaux } from "@/apis/types/revenusFiscaux-type";

export const createRevenusFiscaux = async (
  id: string,
  data: RevenusFiscaux,
) => {
  await customInstance<RevenusFiscauxGetResponse>({
    url: `/customer/${id}/revenus-fiscaux`,
    method: "POST",
    data,
  });
};

export const useCreateRevenusFiscaux = (
  id: string,
  props?: MutationProps<void>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: RevenusFiscauxKey,
    mutationFn: (data: RevenusFiscaux) => createRevenusFiscaux(id, data),
    onError: (e: Error) => {
      props?.onError?.(e);
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: RevenusFiscauxKey });
      props?.onSuccess?.();
    },
  });
};

export const updateRevenusFiscaux = async (
  id: string,
  data: RevenusFiscaux,
) => {
  await customInstance({
    url: `/customer/${id}/revenus-fiscaux/${data.id}`,
    method: "PATCH",
    data,
  });
};

export const useUpdateRevenusFiscaux = (
  id: string,
  props?: MutationProps<void>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: RevenusFiscauxKey,
    mutationFn: (data: RevenusFiscaux) => updateRevenusFiscaux(id, data),
    onError: (e) => {
      props?.onError?.(e);
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: RevenusFiscauxKey });
      props?.onSuccess?.();
    },
  });
};
