import { type societeBilans } from "@/apis/types/societe-bilans-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  type updateSocieteBilanApiResponse,
  type createSocieteBilanApiRequest,
  type createSocieteBilanApiResponse,
  type deleteSocieteBilanApiResponse,
  type updateSocieteBilanApiRequest,
} from "./api-types";
import { societeBilansKey } from "./constants";
import { type MutationProps } from "@/types/mutation-props";
import { customInstance } from "@/server/axios";
import { professionCustomerKey } from "../profession-revenu/constants";
import { toast } from "sonner";

export const createSocieteBilan = async (
  companyId: string | number,
  bilan: societeBilans,
) => {
  const response = await customInstance<createSocieteBilanApiResponse>({
    url: `/societe/${companyId}/bilans`,
    method: "POST",
    data: bilan,
  });

  return response.data;
};

export const updateSocieteBilan = async (
  companyId: string | number,
  bilandId: string | number,
  bilan: societeBilans,
) => {
  const response = await customInstance<updateSocieteBilanApiResponse>({
    url: `/societe/${companyId}/bilans/${bilandId}`,
    method: "PUT",
    data: bilan,
  });

  return response.data;
};

export const deleteSocieteBilan = async (
  companyId: number | string,
  bilanId: number | string,
) => {
  await customInstance<deleteSocieteBilanApiResponse>({
    url: `/societe/${companyId}/bilans/${bilanId}`,
    method: "DELETE",
  });
};
export const useCreateSocieteBilan = (props?: MutationProps<void>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      data,
      companyId,
    }: {
      data: createSocieteBilanApiRequest;
      companyId: number | string;
    }) => createSocieteBilan(companyId, data.data),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: [...societeBilansKey, variables.companyId],
      });
      props?.onSuccess?.();
      toast.success("Bilan créé avec succès");
    },
    onError: (error: Error) => props?.onError?.(error),
  });
};

export const useUpdateSocieteBilan = (
  companyId: number | string,
  props?: MutationProps<void>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      bilanId,
      data,
    }: {
      bilanId: number | string;
      data: updateSocieteBilanApiRequest;
    }) => updateSocieteBilan(companyId, bilanId, data.data),
    onSuccess: () => {
      // Invalidate the same query as create
      void queryClient.invalidateQueries({
        queryKey: [...societeBilansKey, companyId],
      });
      props?.onSuccess?.();
    },
    onError: (error: Error) => props?.onError?.(error),
  });
};

export const useDeleteSocieteBilan = (
  companyId: number | string,
  props?: MutationProps<void>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bilanId }: { bilanId: number | string }) =>
      deleteSocieteBilan(companyId, bilanId),
    onSuccess: () => {
      // Invalidate the same query as create
      void queryClient.invalidateQueries({
        queryKey: [...societeBilansKey, companyId],
      });
      props?.onSuccess?.();
    },
    onError: (error: Error) => props?.onError?.(error),
  });
};
