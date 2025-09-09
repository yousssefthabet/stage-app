import { apiClientWithAuth } from "@/server/axios";
import { type MutationProps } from "@/types/mutation-props";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pipelineKey, stepKey } from "./pipeline-constants";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import {
  type StepsResponse,
  type CreatePipelineStepRequest,
  type CreateStepResponse,
  type updatePipelineStepRequest,
} from "./pipeline-api-types";

export const deletePipelineStep = async ({
  id,
  idStep,
}: {
  id: number;
  idStep: number;
}) => {
  const client = await apiClientWithAuth();

  await client.delete(`pipeline/${id}/step/${idStep}`, {});
};
export const useDeleteipelineStep = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: pipelineKey,
    mutationFn: deletePipelineStep,
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
        "Une erreur est survenue lors de la suppression d’une étape dans le pipeline",
      );
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: pipelineKey });
      props?.onSuccess?.();
    },
  });
};

export const createPipelineStep = async ({
  data,
}: {
  data: CreatePipelineStepRequest;
}) => {
  const client = await apiClientWithAuth();

  const response = await client.post<CreateStepResponse>(
    `pipeline/${data.pipelineId}/step`,
    data,
  );
  return response.data.data.id;
};
export const useCreatePipelineStep = (props?: MutationProps<number>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: pipelineKey,
    mutationFn: createPipelineStep,
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
        "Une erreur est survenue lors de la création d’une étape dans un pipeline",
      );
    },
    ...props,
    onSuccess: (data) => {
      void qc.invalidateQueries({ queryKey: pipelineKey });
      props?.onSuccess?.(data);
    },
  });
};

export const updatePipelineStep = async ({
  id,
  props,
}: {
  id: number;
  props: updatePipelineStepRequest;
}) => {
  const client = await apiClientWithAuth();

  await client.put(`/pipeline/${id}/step/${props.data.id}`, props.data);
};
export const useUpdatePipelineStep = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: pipelineKey,
    mutationFn: updatePipelineStep,
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
        "Une erreur est survenue lors de la mise à jour d’une étape dans le pipeline",
      );
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: pipelineKey });
      props?.onSuccess?.();
    },
  });
};

export async function getFirstPipelineSteps() {
  const client = await apiClientWithAuth();
  const result = await client.get<StepsResponse>(`/pipeline/steps`);
  return result.data;
}

export const useFirstPipelineSteps = () => {
  return useQuery({
    queryKey: [...stepKey],
    queryFn: () => getFirstPipelineSteps(),
    select: (data) => data.data,
  });
};
