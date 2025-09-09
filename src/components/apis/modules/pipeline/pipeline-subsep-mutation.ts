import { toast } from "sonner";
import { pipelineKey, subStepKey } from "./pipeline-constants";
import { type MutationProps } from "@/types/mutation-props";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClientWithAuth } from "@/server/axios";
import {
  type SubStepResponse,
  type CreatePipelineSubStepRequest,
  type updatePipelineSubStepRequest,
} from "./pipeline-api-types";
import { isAxiosError } from "axios";

export const deletePipelineSubStep = async ({
  id,
  idStep,
  idsubstep,
}: {
  id: number;
  idStep: number;
  idsubstep: number;
}) => {
  const client = await apiClientWithAuth();

  await client.delete(
    `pipeline/${id}/step/${idStep}/sub-step/${idsubstep}`,
    {},
  );
};
export const useDeleteipelineSubStep = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: pipelineKey,
    mutationFn: deletePipelineSubStep,
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
        "Une erreur est survenue lors de la suppression d’une sous-étape dans le pipeline",
      );
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: pipelineKey });
      props?.onSuccess?.();
    },
  });
};

export const createPipelineSubStep = async ({
  id,
  idstep,
  data,
}: {
  id: string;
  idstep: string;
  data: CreatePipelineSubStepRequest;
}) => {
  const client = await apiClientWithAuth();

  await client.post(`pipeline/${id}/step/${idstep}/sub-step`, data);
};
export const useCreatePipelineSubStep = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: pipelineKey,
    mutationFn: createPipelineSubStep,
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
        "Une erreur est survenue lors de la création d’une sous-étape dans le pipeline",
      );
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: pipelineKey });
      props?.onSuccess?.();
    },
  });
};
export const updatePipelineSubStep = async ({
  id,
  props,
}: {
  id: number;

  props: updatePipelineSubStepRequest;
}) => {
  const client = await apiClientWithAuth();

  await client.put(
    `/pipeline/${id}/step/${props.data.stepId}/sub-step/${props.data.id}`,
    props.data,
  );
};
export const useUpdatePipelineSubStep = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: pipelineKey,
    mutationFn: updatePipelineSubStep,
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
        "Une erreur est survenue lors de la mise à jour d’une sous-étape dans le pipeline",
      );
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: pipelineKey });
      props?.onSuccess?.();
    },
  });
};

export async function getSubStepByStepId(id: string) {
  const client = await apiClientWithAuth();
  const result = await client.get<SubStepResponse>(`/sub-step/${id}`);
  return result.data.data;
}

export const useSubStepByStepId = (id: string) => {
  return useQuery({
    queryKey: [...subStepKey, id],
    queryFn: () => getSubStepByStepId(id),
    enabled: !!id,
  });
};
