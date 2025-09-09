"use client";

import { customInstance } from "@/server/axios";
import {
  type createEtudeNotaireRequest,
  type createEtudeNotaireResponse,
  type updateEtudeNotaireRequest,
  type updateEtudeNotaireResponse,
} from "./etude-notaire-api-types";
import {
  type BackEndErrorType,
  type MutationProps,
} from "@/types/mutation-props";
import { type EtudeNotaire } from "@/apis/types/etude-notaire-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { etudeNotaireKey } from "./etude-notaire-constants";
import {
  handleApiError,
  handleBackendValidationErrors,
} from "@/lib/handleApiError";
import { toast } from "sonner";

export const updateEtudeNotaire = async (
  props: updateEtudeNotaireRequest,
  id: string,
) => {
  try {
    const response = await customInstance<updateEtudeNotaireResponse>({
      url: `/etude-notaire/${id}`,
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
export const useUpdateEtudeNotaire = (
  id: string,
  props?: MutationProps<EtudeNotaire | BackEndErrorType[]>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: [...etudeNotaireKey, id],
    mutationFn: (data: updateEtudeNotaireRequest) =>
      updateEtudeNotaire(data, id),
    onError: (error) => {
      handleApiError(
        error,
        "Une erreur est survenue lors de la mise a jour de l'etude notaire",
        {
          ignoreStatusCodes: [],
          silent: false,
        },
      );
      props?.onError?.(error);
    },
    ...props,
    onSuccess: (data) => {
      void qc.invalidateQueries({ queryKey: [...etudeNotaireKey, id] });

      if (data && "id" in data) {
        toast.dismiss();
        toast.success("Etude Notaire a été mise a jour avec succès");
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
export const createEtudeNotaire = async (props: createEtudeNotaireRequest) => {
  try {
    const response = await customInstance<createEtudeNotaireResponse>({
      url: `/etude-notaire`,
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

export const useCreateEtudeNotaire = (
  props?: MutationProps<EtudeNotaire | BackEndErrorType[]>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: etudeNotaireKey,
    mutationFn: (data: createEtudeNotaireRequest) => createEtudeNotaire(data),
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
      void qc.invalidateQueries({ queryKey: etudeNotaireKey });

      if (data && "id" in data) {
        toast.dismiss();
        toast.success("Etude Notaire a été créée avec succès");
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
