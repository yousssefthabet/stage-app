import { apiClientWithAuth } from "@/server/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { commissionKey } from "./commission-constants";
import { type MutationProps } from "@/types/mutation-props";
import { type CreateCommissionRequest } from "./commission-api-types";
import { usersKey } from "../user/user-constants";

export const createCommission = async (data: CreateCommissionRequest) => {
  const client = await apiClientWithAuth();
  await client.put(`commission`, data);
};
export const useCreateCommission = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: commissionKey,
    mutationFn: createCommission,
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
      void qc.invalidateQueries({ queryKey: commissionKey });
      void qc.invalidateQueries({ queryKey: usersKey });

      props?.onSuccess?.();
    },
  });
};
export const deleteCommission = async (id: string) => {
  const client = await apiClientWithAuth();

  await client.delete(`commission/${id}`);
};
export const useDeleteCommission = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: commissionKey,
    mutationFn: deleteCommission,
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
      void qc.invalidateQueries({
        queryKey: commissionKey,
        refetchType: "all",
      });
      void qc.invalidateQueries({ queryKey: usersKey });
      props?.onSuccess?.();
    },
  });
};
