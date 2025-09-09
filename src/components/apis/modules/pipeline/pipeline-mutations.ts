import { apiClientWithAuth } from "@/server/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { type MutationProps } from "@/types/mutation-props";

import { pipelineKey } from "./pipeline-constants";
import {
  type CreatePipelineRequest,
  type updatePipelineRequest,
} from "./pipeline-api-types";
export const deletePipeline = async (
  id: number,
): Promise<{ message?: string; [key: string]: unknown }> => {
  const client = await apiClientWithAuth();
  const response = await client.delete(`pipeline/${id}`);
  return response.data as { message?: string; [key: string]: unknown };
};
export const useDeletePipeline = (props?: MutationProps<void>) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: pipelineKey,
    mutationFn: deletePipeline,
    onError: (e) => {
      if (isAxiosError(e)) {
        if (e.status !== 422) {
          const responseData = e.response?.data as
            | Record<string, unknown>
            | undefined;
          const message = responseData?.message;

          if (typeof message === "string") {
            toast.error(message);
          } else {
            toast.error(
              "Une erreur est survenue lors de la suppression d'un Pipeline",
            );
          }
        }
        return;
      }
      toast.error(
        "Une erreur est survenue lors de la suppression d'un Pipeline",
      );
    },
    ...props,
    onSuccess: (data) => {
      void qc.invalidateQueries({ queryKey: pipelineKey });

      const message = (data as Record<string, unknown>)?.message;
      if (typeof message === "string") {
        toast.success(message);
      } else {
        toast.success("Pipeline supprimé avec succès");
      }

      props?.onSuccess?.();
    },
  });
};

export interface CreatePipelineResponse {
  statusCode?: number;
  message?: string;
  [key: string]: unknown;
}

export const createPipeline = async (
  data: CreatePipelineRequest,
): Promise<CreatePipelineResponse> => {
  const client = await apiClientWithAuth();
  try {
    const response = await client.post(`/pipeline`, data);
    return response.data as CreatePipelineResponse;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      const responseData = error.response?.data as
        | { message?: string }
        | undefined;
      throw new Error(
        responseData?.message ?? "Pipeline with this role already exists",
      );
    }
    throw error;
  }
};

export const useCreatePipeline = (props?: MutationProps<void>) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: pipelineKey,
    mutationFn: createPipeline,
    onError: (e: unknown) => {
      if (e instanceof Error) {
        toast.error(e.message);
      } else if (isAxiosError(e)) {
        const responseData = e.response?.data as
          | Record<string, unknown>
          | undefined;
        const message = responseData?.message;

        if (e.response?.status === 404) {
          toast.error(
            (message as string) || "Pipeline with this role already exists",
          );
        } else if (typeof message === "string") {
          toast.error(message);
        } else {
          toast.error("Error creating pipeline");
        }
      } else {
        toast.error("Error creating pipeline");
      }
    },
    ...props,
    onSuccess: (data) => {
      const statusCode = (data as Record<string, unknown>)?.statusCode;
      const message = (data as Record<string, unknown>)?.message;

      if (statusCode && ![200, 201].includes(statusCode as number)) {
        toast.error((message as string) || "Error creating pipeline");
        return;
      }

      void qc.invalidateQueries({ queryKey: pipelineKey });
      toast.success((message as string) || "Pipeline created successfully");
      props?.onSuccess?.();
    },
  });
};

export interface UpdatePipelineResponse {
  message?: string;
  [key: string]: unknown;
}

export const updatePipeline = async (
  props: updatePipelineRequest,
): Promise<UpdatePipelineResponse> => {
  const client = await apiClientWithAuth();
  const response = await client.put(`/pipeline/${props.data.id}`, props.data);
  return response.data as UpdatePipelineResponse;
};
export const useUpdatePipeline = (props?: MutationProps<void>) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: pipelineKey,
    mutationFn: updatePipeline,
    onError: (e) => {
      if (isAxiosError(e)) {
        if (e.status !== 422) {
          const responseData = e.response?.data as
            | Record<string, unknown>
            | undefined;
          const message = responseData?.message;

          if (typeof message === "string") {
            toast.error(message);
          } else {
            toast.error(
              "Une erreur est survenue lors de la mise à jour d’un pipeline",
            );
          }
        }
        return;
      }
      toast.error(
        "Une erreur est survenue lors de la mise à jour d’un pipeline",
      );
    },
    ...props,
    onSuccess: (data) => {
      void qc.invalidateQueries({ queryKey: pipelineKey });

      const message = (data as Record<string, unknown>)?.message;
      if (typeof message === "string") {
        toast.success(message);
      } else {
        toast.success("Pipeline mise à jour avec succès");
      }

      props?.onSuccess?.();
    },
  });
};
