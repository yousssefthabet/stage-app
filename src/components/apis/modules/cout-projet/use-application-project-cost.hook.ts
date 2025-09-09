import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getApplicationProjectCost,
  createApplicationProjectCost,
  updateApplicationProjectCost,
} from "./application-project-cost-queries";
import {
  type ApplicationProjectCostRequest,
  type ApplicationProjectCostUpdateRequest,
} from "./types/application-project-cost-request.type";

const applicationProjectCostKey = ["application-project-cost"];

export const useApplicationProjectCost = (applicationId: number | string) => {
  return useQuery({
    queryKey: [...applicationProjectCostKey, applicationId],
    queryFn: () => getApplicationProjectCost(applicationId),
  });
};

export const useCreateApplicationProjectCost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      applicationId,
      data,
    }: {
      applicationId: number | string;
      data: ApplicationProjectCostRequest;
    }) => createApplicationProjectCost(applicationId, data),
    onSuccess: (_, { applicationId }) => {
      void queryClient.invalidateQueries({
        queryKey: [...applicationProjectCostKey, applicationId],
      });
    },
  });
};

export const useUpdateApplicationProjectCost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      applicationId,
      data,
    }: {
      applicationId: number | string;
      data: ApplicationProjectCostUpdateRequest;
    }) => updateApplicationProjectCost(applicationId, data),
    onSuccess: (_, { applicationId }) => {
      void queryClient.invalidateQueries({
        queryKey: [...applicationProjectCostKey, applicationId],
      });
    },
  });
};
