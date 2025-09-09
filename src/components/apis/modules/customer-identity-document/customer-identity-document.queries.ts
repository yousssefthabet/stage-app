"use client";

import { customInstance } from "@/server/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customerIdentityDocumentKey } from "./customer-identity-document.constants";
import {
  type CustomerIdentityDocumentRequest,
  type CustomerIdentityDocumentResponse,
  type CustomerIdentityDocumentResponseList,
  type CustomerIdentityDocumentUpdateRequest,
  type IdentityType,
} from "./customer-identity-document.types";
import { toast } from "sonner";

export const getCustomerIdentityDocument = async (
  customerId: string | number,
  type: IdentityType,
): Promise<CustomerIdentityDocumentResponse> => {
  const response = await customInstance<CustomerIdentityDocumentResponseList>({
    url: `/identity/${customerId}/customer-document/${type}`,
    method: "GET",
  });
  return response.data;
};

export const useCustomerIdentityDocument = (
  customerId: string | number,
  type: IdentityType,
) =>
  useQuery({
    queryKey: [...customerIdentityDocumentKey, customerId],
    queryFn: () => getCustomerIdentityDocument(customerId, type),
    enabled: !!customerId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
export const createCustomerIdentityDocument = async ({
  customerId,
  type,
  data,
}: {
  customerId: string | number;
  type: IdentityType;
  data: CustomerIdentityDocumentRequest;
}): Promise<CustomerIdentityDocumentResponse> => {
  const response = await customInstance<CustomerIdentityDocumentResponseList>({
    url: `/identity/${customerId}/customer-document`,
    method: "POST",
    data: { ...data, type },
  });
  return response.data;
};

export const useCreateCustomerIdentityDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomerIdentityDocument,
    onError: () => {
      toast.dismiss();
      toast.error("Erreur lors de la création du document !");
    },
    onSuccess: (_, { customerId }) => {
      void queryClient.invalidateQueries({
        queryKey: [...customerIdentityDocumentKey, customerId],
      });
      toast.dismiss();
      toast.success("Document créé avec succès !");
    },
  });
};

export const updateCustomerIdentityDocument = async ({
  id,
  customerId,
  data,
  signal,
}: {
  id: string | number;
  customerId: string | number;
  data: CustomerIdentityDocumentUpdateRequest;
  signal?: AbortSignal;
}): Promise<CustomerIdentityDocumentResponse> => {
  const response = await customInstance<CustomerIdentityDocumentResponseList>({
    url: `/identity/${customerId}/customer-document/${id}`,
    method: "PATCH",
    data,
    signal,
  });
  return response.data;
};

export const useUpdateCustomerIdentityDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCustomerIdentityDocument,
    onError: () => {
      toast.dismiss();
      toast.error("Erreur lors de la mise à jour du document !");
    },
    onSuccess: (data, { customerId }) => {
      queryClient.setQueryData(
        [...customerIdentityDocumentKey, customerId],
        data,
      );
      toast.dismiss();
      toast.success("Document mis à jour !");
    },
  });
};
