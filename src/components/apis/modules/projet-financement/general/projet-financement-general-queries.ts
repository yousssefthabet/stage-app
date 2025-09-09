import { apiClientWithAuth } from "@/server/axios";
import type {
  ProjetFinancementGeneralResponse,
  ProjetFinancementGeneralResponseList,
} from "../types/projet-financement-general-response.type";
import type {
  ProjetFinancementGeneralRequest,
  ProjetFinancementGeneralUpdateRequest,
} from "../types/projet-financement-general-request.type";

export const getProjetFinancementGeneral = async (
  applicationId: number | string,
): Promise<ProjetFinancementGeneralResponseList> => {
  const client = await apiClientWithAuth();
  const response = await client.get<ProjetFinancementGeneralResponseList>(
    `/projet-financement/${applicationId}/general`,
  );
  return response.data;
};

export const createProjetFinancementGeneral = async (
  applicationId: number | string,
  data: ProjetFinancementGeneralRequest,
): Promise<ProjetFinancementGeneralResponse> => {
  const client = await apiClientWithAuth();
  const response = await client.post<ProjetFinancementGeneralResponse>(
    `/projet-financement/${applicationId}/general`,
    data,
  );
  return response.data;
};

export const updateProjetFinancementGeneral = async (
  applicationId: number | string,
  data: ProjetFinancementGeneralUpdateRequest,
): Promise<ProjetFinancementGeneralResponse> => {
  const client = await apiClientWithAuth();
  const response = await client.patch<ProjetFinancementGeneralResponse>(
    `/projet-financement/${applicationId}/general`,
    data,
  );
  return response.data;
};
