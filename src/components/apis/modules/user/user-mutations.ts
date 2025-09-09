import { apiClientWithAuth } from "@/server/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { usersKey } from "./user-constants";
import { type MutationProps } from "@/types/mutation-props";
import {
  type CreateUserRequest,
  type updateUserRequest,
} from "./user-api-types";

export const deleteUser = async (id: string) => {
  const client = await apiClientWithAuth();

  await client.delete(`user/${id}`, {});
};
export const useDeleteUser = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: usersKey,
    mutationFn: deleteUser,
    onError: (e) => {
      if (isAxiosError(e)) {
        if (e.status !== 422) {
          const responseData = e.response?.data as
            | Record<string, unknown>
            | undefined;
          let errorMessage = "";

          if (responseData && typeof responseData === "object") {
            const message = responseData.message;
            // Ensure we're dealing with a string or something that can be safely converted to string
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
      // Fix floating promise with void operator
      void qc.invalidateQueries({ queryKey: usersKey });
      props?.onSuccess?.();
    },
  });
};

export const createUser = async (data: CreateUserRequest) => {
  const client = await apiClientWithAuth();

  await client.post(`user`, data);
};
export const useCreateUser = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: usersKey,
    mutationFn: createUser,
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
      void qc.invalidateQueries({ queryKey: usersKey });
      props?.onSuccess?.();
    },
  });
};
export const updateUser = async (props: updateUserRequest) => {
  const client = await apiClientWithAuth();

  await client.patch(`/user/${props.data.user.id}`, props.data);
};
export const useUpdateUser = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: usersKey,
    mutationFn: updateUser,
    onError: (e) => {
      if (isAxiosError(e)) {
        if (e.status !== 422) {
          const responseData = e.response?.data as
            | Record<string, unknown>
            | undefined;
          let errorMessage = "";

          if (responseData && typeof responseData === "object") {
            const message = responseData.message;
            // Ensure we're dealing with a string or something that can be safely converted to string
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
      void qc.invalidateQueries({ queryKey: usersKey });
      props?.onSuccess?.();
    },
  });
};
