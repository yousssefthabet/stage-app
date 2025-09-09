import { apiClientWithAuth } from "@/server/axios";
import type {
  ApplicationProjectCostListResponse,
  ApplicationProjectCostResponse,
} from "./types/application-project-cost-response.type";
import type {
  ApplicationProjectCostRequest,
  ApplicationProjectCostUpdateRequest,
} from "./types/application-project-cost-request.type";

export const getApplicationProjectCost = async (
  applicationId: number | string,
): Promise<ApplicationProjectCostListResponse> => {
  const client = await apiClientWithAuth();
  const response = await client.get<ApplicationProjectCostListResponse>(
    `/projet-financement/${applicationId}/cout-projet`,
  );
  return response.data;
};

export const createApplicationProjectCost = async (
  applicationId: number | string,
  data: ApplicationProjectCostRequest,
): Promise<ApplicationProjectCostResponse> => {
  const client = await apiClientWithAuth();
  const response = await client.post<ApplicationProjectCostResponse>(
    `/projet-financement/${applicationId}/cout-projet`,
    data,
  );
  return response.data;
};

export const updateApplicationProjectCost = async (
  applicationId: number | string,
  data: ApplicationProjectCostUpdateRequest,
): Promise<ApplicationProjectCostResponse> => {
  const client = await apiClientWithAuth();
  const response = await client.patch<ApplicationProjectCostResponse>(
    `/projet-financement/${applicationId}/cout-projet`,
    data,
  );
  return response.data;
};
