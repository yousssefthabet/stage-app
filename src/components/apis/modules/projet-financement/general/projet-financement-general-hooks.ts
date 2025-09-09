import {
  type ProjetFinancementGeneralRequest,
  type ProjetFinancementGeneralUpdateRequest,
} from "../types/projet-financement-general-request.type";
import {
  getProjetFinancementGeneral,
  createProjetFinancementGeneral,
  updateProjetFinancementGeneral,
} from "./projet-financement-general-queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const projetFinancementGeneralKey = ["projet-financement-general"];

export const useProjetFinancementGeneral = (applicationId: number | string) => {
  return useQuery({
    queryKey: [...projetFinancementGeneralKey, applicationId],
    queryFn: () => getProjetFinancementGeneral(applicationId),
  });
};

export const useCreateProjetFinancementGeneral = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      applicationId,
      data,
    }: {
      applicationId: number | string;
      data: ProjetFinancementGeneralRequest;
    }) => createProjetFinancementGeneral(applicationId, data),
    onSuccess: (_, { applicationId }) => {
      void queryClient.invalidateQueries({
        queryKey: [...projetFinancementGeneralKey, applicationId],
      });
    },
  });
};

export const useUpdateProjetFinancementGeneral = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      applicationId,
      data,
    }: {
      applicationId: number | string;
      data: ProjetFinancementGeneralUpdateRequest;
    }) => updateProjetFinancementGeneral(applicationId, data),
    onSuccess: (_, { applicationId }) => {
      void queryClient.invalidateQueries({
        queryKey: [...projetFinancementGeneralKey, applicationId],
      });
    },
  });
};
