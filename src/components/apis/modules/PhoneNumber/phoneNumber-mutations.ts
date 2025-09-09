import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { phonesNumberKey } from "./phoneNumber-constants";
import type { MutationProps } from "@/types/mutation-props";
import type { CreatePhoneNumber } from "./phoneNumber-api-types";
import { apiClientWithAuth } from "@/server/axios";

export const createPhoneNumber = async (data: CreatePhoneNumber) => {
  const client = await apiClientWithAuth();

  await client.post(`phone-number`, data);
};
export const useCreatePhoneNumber = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: phonesNumberKey,
    mutationFn: createPhoneNumber,
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
      void qc.invalidateQueries({ queryKey: phonesNumberKey });
      props?.onSuccess?.();
    },
  });
};

export const updatePhoneNumber = async (props: CreatePhoneNumber) => {
  const client = await apiClientWithAuth();

  await client.patch(`/phone-number/${props.id}`, props);
};
export const useUpdatePhoneNumber = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: phonesNumberKey,
    mutationFn: updatePhoneNumber,
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
      void qc.invalidateQueries({ queryKey: phonesNumberKey });
      props?.onSuccess?.();
    },
  });
};
