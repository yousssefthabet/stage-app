"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type MutationProps } from "@/types/mutation-props";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { apiClientWithAuth } from "@/server/axios";
import { type CustomerResidenceGetResponse } from "./CustomerResidence-api-types";
import { CustomerResidenceKey } from "./CustomerResidence-constants";
import { type CustomerResidence } from "@/apis/types/CustomerResidence-type";
type UpdateCustomerResidenceInput = {
  id: string;
  props: CustomerResidence;
};
export const createCustomerResidence = async ({
  id,
  props,
}: UpdateCustomerResidenceInput) => {
  const client = await apiClientWithAuth();

  const result = await client.post<CustomerResidenceGetResponse>(
    `/customer/${id}/residence`,
    props,
  );

  return result.data;
};

export const useCreateCustomerResidence = (
  id: string,
  props?: MutationProps<void>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: CustomerResidenceKey,
    mutationFn: (CustomerResidence: CustomerResidence) =>
      createCustomerResidence({ id, props: CustomerResidence }),
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
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: CustomerResidenceKey });
      props?.onSuccess?.();
    },
  });
};
export const updateCustomerResidence = async ({
  id,
  props,
}: UpdateCustomerResidenceInput) => {
  const client = await apiClientWithAuth();

  await client.patch(`/customer/${id}/residence/${props.id}`, props);
};
export const useUpdateCustomerResidence = (
  id: string,

  props?: MutationProps<void>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: CustomerResidenceKey,
    mutationFn: (CustomerResidence: CustomerResidence) =>
      updateCustomerResidence({ id, props: CustomerResidence }),

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
      void qc.invalidateQueries({ queryKey: CustomerResidenceKey });
      props?.onSuccess?.();
    },
  });
};
