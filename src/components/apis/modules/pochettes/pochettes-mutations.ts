"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customInstance } from "@/server/axios";
import {
  pochettesKey,
  pochettFilesHistoryKey,
  pochettFilessKey,
} from "./pochettes-constants";
import {
  type updateManyPochetteRequest,
  type CreatePochetteRequest,
  type updatePochetteRequest,
  type PochettesGetResponse,
} from "./pochettes-api-types";
import { type MutationProps } from "@/types/mutation-props";
import { isAxiosError, isCancel } from "axios";
import { toast } from "sonner";

export const createPochette = async (data: CreatePochetteRequest) => {
  return await customInstance({
    url: `/pochettes`,
    method: "POST",
    data,
  });
};

export const useCreatePochette = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: pochettesKey,
    mutationFn: createPochette,
    onError: (e: unknown) => {
      if (isAxiosError<{ message: string }>(e)) {
        if (e.status != 422 && e.response?.data)
          toast.error(e.response?.data?.message);
        return;
      }
      toast.error("Une erreur est survenue lors de la creation du pochette");
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: pochettesKey });
      props?.onSuccess?.();
    },
  });
};

export const updatePochette = async (props: updatePochetteRequest) => {
  return await customInstance({
    url: `/pochettes/${props.id}`,
    method: "PATCH",
    data: props.data,
  });
};
export const useUpdatePochette = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: pochettesKey,
    mutationFn: updatePochette,
    onError: (e) => {
      if (isAxiosError<{ message: string }>(e)) {
        if (e.status !== 422) {
          toast.error(e.response?.data?.message);
        }
        return;
      }
      toast.error(
        "Une erreur est survenue lors de la modification de la pochette",
      );
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: pochettesKey });
      props?.onSuccess?.();
    },
  });
};

export const deletePochette = async (id: string) => {
  return await customInstance({
    url: `pochettes/${id}`,
    method: "DELETE",
  });
};
export const useDeletePochette = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: pochettesKey,
    mutationFn: deletePochette,
    onError: (e) => {
      if (isAxiosError<{ message: string }>(e)) {
        if (e.status != 422) toast.error(e.response?.data?.message);
        return;
      }
      toast.error(
        "Une erreur est survenue lors de la suppression de la pochette",
      );
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: pochettesKey });
      props?.onSuccess?.();
    },
  });
};

export const updateManyPochettes = async ({
  pochettes,
  abortSignal,
}: updateManyPochetteRequest) => {
  return await customInstance({
    url: `pochettes/update-many`,
    method: "PUT",
    data: {
      pochettes: pochettes.map((pochette) => {
        return { id: pochette.id, order: pochette.order };
      }),
    },
    signal: abortSignal,
  });
};
export const useUpdateManyPochettes = (props?: MutationProps<void>) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: pochettesKey,
    mutationFn: updateManyPochettes,
    onError: (e: unknown) => {
      if (isCancel(e)) return;
      if (isAxiosError<{ message: string }>(e)) {
        if (e.status != 422) {
          toast.error(e.response?.data?.message);
        }
        return;
      }
      toast.error(
        "Une erreur est survenue lors de la modification des pochettes",
      );
    },
    ...props,
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: pochettesKey,
        refetchType: "none",
      });
      props?.onSuccess?.();
    },
  });
};

export async function uploadFile(
  applicationId: bigint | string,
  pochetteId: string,
  formData: FormData,
  onProgress: (progress: number) => void,
) {
  return await customInstance<PochettesGetResponse>({
    url: `/projet/${applicationId}/pochette/${pochetteId}/files`,
    method: "POST",
    data: formData,
    onUploadProgress: (event) => {
      if (event.total) {
        const progress = Math.round((event.loaded * 100) / event.total);
        onProgress(progress);
      }
    },
  });
}

export const useUploadFile = (
  applicationId: bigint | string,
  pochetteId: string,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: [pochettFilessKey, applicationId, pochetteId],
    mutationFn: ({
      applicationId,
      pochetteId,
      formData,
      onProgress,
    }: {
      applicationId: bigint | string;
      pochetteId: string;
      formData: FormData;
      onProgress: (progress: number) => void;
    }) => uploadFile(applicationId, pochetteId, formData, onProgress),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: [pochettFilessKey, applicationId, pochetteId],
      });
      void qc.invalidateQueries({
        queryKey: [pochettFilesHistoryKey, applicationId],
      });
    },
  });
};

export const deletePochetteFiles = async (
  applicationId: bigint | string,
  pochetteId: string,
  ids: bigint[],
) => {
  return await customInstance({
    url: `/projet/${applicationId}/pochette/${pochetteId}/files/bulk`,
    method: "DELETE",
    data: {
      ids,
    },
  });
};

export const useDeletePochetteFiles = (
  applicationId: bigint | string,
  pochetteId: string,
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: [pochettFilessKey, applicationId, pochetteId],
    mutationFn: ({
      applicationId,
      pochetteId,
      ids,
    }: {
      applicationId: bigint | string;
      pochetteId: string;
      ids: bigint[];
    }) => deletePochetteFiles(applicationId, pochetteId, ids),
    onSuccess: () => {
      void qc.invalidateQueries({
        queryKey: [pochettFilessKey, applicationId, pochetteId],
      });
    },
  });
};
