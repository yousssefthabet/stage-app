"use client";

import { customInstance } from "@/server/axios";
import {
  type updateDossierGeneralResponse,
  type updateDossierGeneralRequest,
  type createDossierGeneralRequest,
  type createDossierGeneralResponse,
} from "./dossier-general-api-types";
import {
  type BackEndErrorType,
  type MutationProps,
} from "@/types/mutation-props";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dossierGeneralKey } from "./dossier-general-constants";
import {
  handleApiError,
  handleBackendValidationErrors,
} from "@/lib/handleApiError";
import { toast } from "sonner";
import { type DossierGeneral } from "@/apis/types/dossier-general-types";

export const updateDossierGeneral = async (
  props: updateDossierGeneralRequest,
  id: string,
) => {
  try {
    const response = await customInstance<updateDossierGeneralResponse>({
      url: `/projet/${id}/instruction/${props.data.id}`,
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

export const useUpdateDossierGeneral = (
  id: string,
  props?: MutationProps<DossierGeneral | BackEndErrorType[]>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: dossierGeneralKey,
    mutationFn: (data: updateDossierGeneralRequest) =>
      updateDossierGeneral(data, id),
    onError: (error) => {
      handleApiError(
        error,
        "Une erreur est survenue lors de la mise a jour de Dossier général",
        {
          ignoreStatusCodes: [], // Don't ignore any status codes
          silent: false,
        },
      );

      // Call the custom onError if provided
      props?.onError?.(error);
    },
    ...props,
    onSuccess: (data) => {
      void qc.invalidateQueries({ queryKey: dossierGeneralKey });

      // Check if data is actually a Comment (success) or errors array
      if (data && "id" in data) {
        toast.dismiss();
        toast.success("Dossier général a été mise a jour avec succès");
        props?.onSuccess?.(data);
      } else if (Array.isArray(data)) {
        // Handle the case where backend returns errors in success response
        toast.dismiss();
        handleBackendValidationErrors(data);
        props?.onSuccess?.(data as BackEndErrorType[]);
      } else {
        // Unexpected data type, do not call onSuccess
        toast.dismiss();
        handleBackendValidationErrors([]);
      }
    },
  });
};

export const createDossierGeneral = async (
  props: createDossierGeneralRequest,
  id: string,
) => {
  try {
    const response = await customInstance<createDossierGeneralResponse>({
      url: `/projet/${id}/instruction`,
      method: "post",
      data: props.data,
    });

    if (!response.statusCode || response.statusCode !== 201) {
      return response.data;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCreateDossierGeneral = (
  id: string,
  props?: MutationProps<DossierGeneral | BackEndErrorType[]>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: dossierGeneralKey,
    mutationFn: (data: createDossierGeneralRequest) =>
      createDossierGeneral(data, id),
    onError: (error) => {
      handleApiError(
        error,
        "Une erreur est survenue lors de la création du dossier général",
        {
          ignoreStatusCodes: [], // Don't ignore any status codes
          silent: false,
        },
      );

      // Call the custom onError if provided
      props?.onError?.(error);
    },
    ...props,
    onSuccess: (data) => {
      void qc.invalidateQueries({ queryKey: dossierGeneralKey });

      // Check if data is actually a DossierGeneral (success) or errors array
      if (data && !Array.isArray(data) && "message" in data) {
        toast.dismiss();
        toast.success("Dossier général créé avec succès");
        props?.onSuccess?.(data);
      } else if (Array.isArray(data)) {
        // Handle the case where backend returns errors in success response
        toast.dismiss();
        handleBackendValidationErrors(data);
        props?.onSuccess?.(data as BackEndErrorType[]);
      } else {
        // Unexpected data type, do not call onSuccess
        toast.dismiss();
        handleBackendValidationErrors([]);
      }
    },
  });
};
