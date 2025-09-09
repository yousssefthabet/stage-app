"use client";

import { customInstance } from "@/server/axios";
import {
  type BackEndErrorType,
  type MutationProps,
} from "@/types/mutation-props";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleApiError,
  handleBackendValidationErrors,
} from "@/lib/handleApiError";
import { toast } from "sonner";
import {
  type createNotaireRequest,
  type createNotaireResponse,
  type updateNotaireRequest,
  type updateNotaireResponse,
} from "./notaire-api-types";
import { type Notaire } from "@/apis/types/notaire-types";
import { notaireKey } from "./notaire-constants";

export const updateNotaire = async (
  props: updateNotaireRequest,
  id: string,
) => {
  try {
    const response = await customInstance<updateNotaireResponse>({
      url: `/notaire/${id}`,
      method: "patch",
      data: props.data,
    });

    if (!response.statusCode || response.statusCode !== 200) {
      return response.data;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useUpdateNotaire = (
  id: string,
  props?: MutationProps<Notaire | BackEndErrorType[]>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: [...notaireKey, id],
    mutationFn: (data: updateNotaireRequest) => updateNotaire(data, id),
    onError: (error) => {
      handleApiError(
        error,
        "Une erreur est survenue lors de la mise a jour de notaire",
        {
          ignoreStatusCodes: [],
          silent: false,
        },
      );
      props?.onError?.(error);
    },
    ...props,
    onSuccess: (data) => {
      void qc.invalidateQueries({ queryKey: [...notaireKey, id] });

      if (data && "id" in data) {
        // ✅ Update single notaire cache
        qc.setQueryData([...notaireKey, id], data);

        // ✅ Refresh the list too
        void qc.invalidateQueries({ queryKey: [...notaireKey] });

        toast.dismiss();
        toast.success("Notaire a été mise a jour avec succès");
        props?.onSuccess?.(data);
      } else if (Array.isArray(data)) {
        toast.dismiss();
        handleBackendValidationErrors(data);
        props?.onSuccess?.(data as BackEndErrorType[]);
      } else {
        toast.dismiss();
        handleBackendValidationErrors([]);
      }
    },
  });
};

export const createNotaire = async (props: createNotaireRequest) => {
  try {
    const response = await customInstance<createNotaireResponse>({
      url: `/notaire`,
      method: "post",
      data: props.data,
    });

    if (!response.statusCode || response.statusCode !== 200) {
      return response.data;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCreateNotaire = (
  props?: MutationProps<Notaire | BackEndErrorType[]>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: notaireKey,
    mutationFn: (data: createNotaireRequest) => createNotaire(data),
    onError: (error) => {
      handleApiError(
        error,
        "Une erreur est survenue lors de la création de l'etude notaire",
        {
          ignoreStatusCodes: [],
          silent: false,
        },
      );
      props?.onError?.(error);
    },
    ...props,
    onSuccess: (data) => {
      void qc.invalidateQueries({ queryKey: notaireKey });

      if (data && "id" in data) {
        toast.dismiss();
        toast.success("Notaire a été créé avec succès");
        props?.onSuccess?.(data);
      } else if (Array.isArray(data)) {
        toast.dismiss();
        handleBackendValidationErrors(data);
        props?.onSuccess?.(data as BackEndErrorType[]);
      } else {
        toast.dismiss();
        handleBackendValidationErrors([]);
      }
    },
  });
};
