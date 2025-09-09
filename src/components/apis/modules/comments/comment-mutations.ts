import { apiClientWithAuth } from "@/server/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentKey } from "./comment-constants";
import {
  type createCommentResponse,
  type createCommentRequest,
  type updateCommenteResponse,
  type updateCommentRequest,
  type deleteCommentResponse,
  type deleteCommentRequest,
} from "./comment-api-types";
import {
  type BackEndErrorType,
  type MutationProps,
} from "@/types/mutation-props";
import {
  handleApiError,
  handleBackendValidationErrors,
} from "@/lib/handleApiError";
import { type Comment } from "@/apis/types/comment-types";
import { toast } from "sonner";

export const updateComment = async (props: updateCommentRequest) => {
  const client = await apiClientWithAuth();

  try {
    const response = await client.patch<updateCommenteResponse>(
      `/customer/comment/${props.id}`,
      props,
    );

    if (!response.data.data?.id) {
      return response.data.errors;
    }

    return response.data.data;
  } catch (error) {
    // Re-throw the error so it can be handled by the mutation
    throw error;
  }
};

export const useUpdateComment = (
  props?: MutationProps<Comment | BackEndErrorType[]>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: commentKey,
    mutationFn: updateComment,
    onError: (error) => {
      // Don't ignore 422 errors for this specific mutation
      handleApiError(
        error,
        "Une erreur est survenue lors de la mise a jour de remarque",
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
      void qc.invalidateQueries({ queryKey: commentKey });

      // Check if data is actually a Comment (success) or errors array
      if (data && !Array.isArray(data) && "id" in data) {
        toast.dismiss();
        toast.success("Remarque a été mise a jour avec succès");
        props?.onSuccess?.(data as Comment);
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

export const createComment = async (props: createCommentRequest) => {
  const client = await apiClientWithAuth();

  try {
    const response = await client.post<createCommentResponse>(
      "/customer/comment",
      {
        userId: Number(props.userId),
        applicationId: Number(props.applicationId),
        comment: props.comment,
      },
    );

    if (!response.data.data?.id) {
      return response.data.errors;
    }

    return response.data.data;
  } catch (error) {
    // Re-throw the error so it can be handled by the mutation
    throw error;
  }
};

export const useCreateComment = (
  props?: MutationProps<Comment | BackEndErrorType[]>,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: commentKey,
    mutationFn: createComment,
    onError: (error) => {
      // Don't ignore 422 errors for this specific mutation
      handleApiError(
        error,
        "Une erreur est survenue lors de la creation de remarque",
        {
          ignoreStatusCodes: [], // Don't ignore any status codes
          silent: false,
        },
      );

      // Call the custom onError if provided
      props?.onError?.(error);
    },
    onSuccess: (data) => {
      void qc.invalidateQueries({ queryKey: commentKey });

      // Check if data is actually a Comment (success) or errors array
      if (data && !Array.isArray(data) && "id" in data) {
        toast.dismiss();
        toast.success("Remarque ajoutée avec succès");
        props?.onSuccess?.(data as Comment);
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
    onSettled: props?.onSettled,
  });
};

export const deleteComment = async (props: deleteCommentRequest) => {
  const client = await apiClientWithAuth();

  try {
    const response = await client.delete<deleteCommentResponse>(
      `/customer/comment/${props.id}`,
    );

    if (response.data.statusCode != 200) {
      return response.data.errors;
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const useDeleteComment = (
  props?: MutationProps<
    | {
        message: string;
      }
    | BackEndErrorType[]
  >,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: commentKey,
    mutationFn: deleteComment,
    onError: (error) => {
      // Don't ignore 422 errors for this specific mutation
      handleApiError(
        error,
        "Une erreur est survenue lors de la supprition de remarque",
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
      void qc.invalidateQueries({ queryKey: commentKey });

      // Check if data is actually a Comment (success) or errors array
      if (data && !Array.isArray(data) && "message" in data) {
        toast.dismiss();
        toast.success("Remarque a supprimer a jour avec succès");
        props?.onSuccess?.(data as unknown as { message: string });
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
