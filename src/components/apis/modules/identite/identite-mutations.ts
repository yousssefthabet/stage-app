import { customInstance } from "@/server/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { identiteKey } from "./identite-constants";
import { toast } from "sonner";
import {
  type updateIdentiteResponse,
  type updateIdentiteRequest,
  type createIdentiteRequest,
  type createIdentiteResponse,
} from "./identite-api-types";
import {
  type BackEndErrorType,
  type MutationProps,
} from "@/types/mutation-props";
import {
  handleApiError,
  handleBackendValidationErrors,
} from "@/lib/handleApiError";
import { type Identite } from "@/apis/types/identite-types";
import { projetKey } from "../projet/projet-constants";

export const updateIdentite = async (
  props: updateIdentiteRequest & { signal?: AbortSignal },
) => {
  const response = await customInstance<updateIdentiteResponse>({
    method: "PATCH",
    url: `/customer/${props.data.id}/identity`,
    data: props.data,
    signal: props.signal,
  });

  return response;
};

export const useUpdateIdentite = (
  props?: MutationProps<Identite | BackEndErrorType[]>,
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: identiteKey,
    mutationFn: updateIdentite,
    onError: () => {
      handleApiError(
        "Une erreur est survenue lors de la mise a jour de l'identité",
      );
      props?.onError?.();
    },
    ...props,
    onSuccess: (data) => {
      void qc.invalidateQueries({ queryKey: identiteKey });
      if (data.statusCode > 299) {
        props?.onError?.();
      } else {
        props?.onSuccess?.(data as unknown as Identite);
      }
    },
  });
};

export const createIdentite = async (props: createIdentiteRequest) => {
  try {
    const response = await customInstance<createIdentiteResponse>({
      method: "POST",
      url: `/customer/${props.data.id}/identity`,
      data: props.data,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCreateIdentite = (
  projectId: string,
  props?: MutationProps<Identite | BackEndErrorType[]>,
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: identiteKey,
    mutationFn: createIdentite,
    onError: (error) => {
      handleApiError(
        error,
        "Une erreur est survenue lors de la création d'un co-emprunteur",
        { ignoreStatusCodes: [], silent: false },
      );

      props?.onError?.(error);
    },
    ...props,
    onSuccess: (data) => {
      toast.dismiss();

      // Invalidate identite list
      void qc.invalidateQueries({ queryKey: identiteKey });

      // Invalidate project query so Sidebar updates
      void qc.invalidateQueries({
        queryKey: [...projetKey, projectId],
      });

      // Handle response data
      if (data && !Array.isArray(data) && "id" in data) {
        toast.success("Co-emprunteur a été créé avec succès");
        props?.onSuccess?.(data);
      } else if (Array.isArray(data)) {
        handleBackendValidationErrors(data);
        props?.onSuccess?.(data as BackEndErrorType[]);
      } else {
        handleBackendValidationErrors([]);
      }
    },
  });
};
