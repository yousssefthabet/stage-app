import { customInstance } from "@/server/axios";
import {
  type updateProfessionApiRequest,
  type updateProfessionApiResponse,
  type createProfessionApiRequest,
  type createProfessionApiResponse,
  type deleteProfessionApiResponse,
  type createSocieteProfessionApiRequest,
  type creatSocieteProfessionApiResponse,
} from "./api-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { professionCustomerKey } from "./constants";
import {
  type BackEndErrorType,
  type MutationProps,
} from "@/types/mutation-props";
import { type Societe } from "@/apis/types/societe-types";
import {
  handleApiError,
  handleBackendValidationErrors,
} from "@/lib/handleApiError";

export const createProfession = async (
  customerId: number | string,
  data: createProfessionApiRequest,
) => {
  const response = await customInstance<createProfessionApiResponse>({
    url: `/customer/${customerId}/profession`,
    method: "post",
    data: data.data,
  });

  if (response.statusCode > 299 || response.statusCode < 200) {
    throw new Error(response.message || "Failed to create profession");
  }

  return response;
};

export const useCreateProfession = (
  customerId: number | string,
  props?: MutationProps<void>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: createProfessionApiRequest }) =>
      createProfession(customerId, data),
    onSuccess: (_) => {
      void queryClient.invalidateQueries({
        queryKey: [...professionCustomerKey],
      });
      if (props?.onSuccess) {
        props.onSuccess?.();
      }
    },
    onError: (error: Error) => {
      if (props?.onError) {
        props.onError(error);
      }
    },
  });
};

export const updateProfession = async (
  customerId: number | string,
  professionId: number | string,
  data: updateProfessionApiRequest,
  signal?: AbortSignal,
) => {
  const response = await customInstance<updateProfessionApiResponse>({
    url: `/customer/${customerId}/profession/${professionId}`,
    method: "patch",
    data: data.data,
    signal,
  });

  if (response.statusCode > 299 || response.statusCode < 200) {
    throw new Error(response.message || "Failed to update profession");
  }

  return response;
};

export const useUpdateProfession = (
  customerId: number | string,
  props?: MutationProps<void>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      professionId,
      data,
      signal,
    }: {
      professionId: number | string;
      data: updateProfessionApiRequest;
      signal?: AbortSignal;
    }) => updateProfession(customerId, professionId, data, signal),
    onSuccess: (_) => {
      void queryClient.invalidateQueries({
        queryKey: [...professionCustomerKey],
      });
      if (props?.onSuccess) {
        props.onSuccess?.();
      }
    },
    onError: (error: Error) => {
      if (props?.onError) {
        props.onError(error);
      }
    },
  });
};

export const deleteProfession = async (
  customerId: number | string,
  professionId: number | string,
) => {
  const response = await customInstance<deleteProfessionApiResponse>({
    url: `/customer/${customerId}/profession/${professionId}`,
    method: "delete",
  });

  if (response.statusCode > 299 || response.statusCode < 200) {
    throw new Error(response.message || "Failed to delete profession");
  }

  return response;
};

export const useDeleteProfession = (
  customerId: number | string,
  props?: MutationProps<void>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (professionId: number | string) =>
      deleteProfession(customerId, professionId),
    onSuccess: (_) => {
      void queryClient.invalidateQueries({
        queryKey: [...professionCustomerKey],
      });
      if (props?.onSuccess) {
        props.onSuccess?.();
      }
    },
    onError: (error: Error) => {
      if (props?.onError) {
        props.onError(error);
      }
    },
  });
};

export const createSocieteForProfession = async (
  customerId: number,
  professionId: number,
  data: createSocieteProfessionApiRequest,
) => {
  const response = await customInstance<creatSocieteProfessionApiResponse>({
    url: `/customer/${customerId}/profession/${professionId}/societe`,
    method: "post",
    data: data.data,
  });

  return response.data;
};

export const useCreateSocieteForProfession = (
  customerId: number,
  props?: MutationProps<Societe | BackEndErrorType[]>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: [...professionCustomerKey],
    mutationFn: ({
      data,
      professionId,
    }: {
      data: createSocieteProfessionApiRequest;
      professionId: number;
    }) => createSocieteForProfession(customerId, professionId, data),
    onError: (error) => {
      handleApiError(
        error,
        "Une erreur est survenue lors de la création de la société",
        {
          ignoreStatusCodes: [],
          silent: false,
        },
      );
      props?.onError?.(error);
    },
    ...props,
    onSuccess: (data, variables) => {
      void qc.invalidateQueries({
        queryKey: [
          ...professionCustomerKey,
          customerId,
          variables.professionId,
        ],
      });

      if (data && "id" in data) {
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

export const updateSocieteForProfession = async (
  customerId: number,
  professionId: number,
  request: createSocieteProfessionApiRequest,
  signal?: AbortSignal,
) => {
  const response = await customInstance<creatSocieteProfessionApiResponse>({
    url: `/customer/${customerId}/profession/${professionId}/societe`,
    method: "patch",
    data: request.data,
    signal,
  });

  return response.data;
};

export const useUpdateSocieteForProfession = (
  customerId: number,
  professionId: number,
  props?: MutationProps<Societe | BackEndErrorType[]>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: [...professionCustomerKey],
    mutationFn: (data: createSocieteProfessionApiRequest) =>
      updateSocieteForProfession(customerId, professionId, data),
    onError: (error) => {
      handleApiError(
        error,
        "Une erreur est survenue lors de la mise a jour de la société",
        {
          ignoreStatusCodes: [],
          silent: false,
        },
      );
      props?.onError?.(error);
    },
    ...props,
    onSuccess: (data) => {
      void qc.invalidateQueries({
        queryKey: [...professionCustomerKey, customerId, professionId],
      });

      if (data && "id" in data) {
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
