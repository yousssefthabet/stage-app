import { apiClientWithAuth } from "@/server/axios";
import {
  type updateComplementRequest,
  type updateComplementResponse,
} from "./complement-api-types";
import {
  type BackEndErrorType,
  type MutationProps,
} from "@/types/mutation-props";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { complementKey } from "./complement-constants";
import {
  handleApiError,
  handleBackendValidationErrors,
} from "@/lib/handleApiError";
import { toast } from "sonner";

export const updateComplement = async (props: updateComplementRequest) => {
  const client = await apiClientWithAuth();

  try {
    const response = await client.patch<updateComplementResponse>(
      `/customer/${props.customerId}/complement`,
      props.data,
    );

    if (!response.data.statusCode || response.data.statusCode !== 200) {
      return response.data.errors;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useUpdateComplement = (
  props?: MutationProps<
    | {
        message: string;
      }
    | BackEndErrorType[]
  >,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: complementKey,
    mutationFn: updateComplement,
    onError: (error) => {
      handleApiError(
        error,
        "Une erreur est survenue lors de la mise a jour de complément",
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
      void qc.invalidateQueries({ queryKey: complementKey });

      // Check if data is actually a Comment (success) or errors array
      if (data && !Array.isArray(data) && "message" in data) {
        toast.dismiss();
        toast.success("Complement a été mise a jour avec succès");
        props?.onSuccess?.(data as { message: string });
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
