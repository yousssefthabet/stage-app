import { customInstance } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import {
  professionActivityKey,
  professionCategoryKey,
  professionCustomerKey,
  riskyProfessionsKey,
} from "./constants";
import {
  type getProfessionsCategoryApiResponse,
  type getRiskyProfessionsApiResponse,
  type getProfessionsActivityApiResponse,
  type getProfessionsCustomerApiResponse,
  type getSocieteForProfessionApiResponse,
} from "./api-types";

export const getAllProfessionActivity = async () => {
  return await customInstance<getProfessionsActivityApiResponse>({
    url: `/profession-activity`,
    method: "get",
  });
};

export const useProfessionActivity = () => {
  return useQuery({
    queryKey: [...professionActivityKey],
    queryFn: () => getAllProfessionActivity(),
  });
};

export const getAllRiskyProfession = async () => {
  return await customInstance<getRiskyProfessionsApiResponse>({
    url: `/risky-professions`,
    method: "get",
  });
};

export const useRiskyProfessions = () => {
  return useQuery({
    queryKey: [...riskyProfessionsKey],
    queryFn: () => getAllRiskyProfession(),
  });
};

export const getAllProfessionCategory = async () => {
  return await customInstance<getProfessionsCategoryApiResponse>({
    url: `/profession-category`,
    method: "get",
    params: {
      perPage: 100,
    },
  });
};

export const useProfessionCategory = () => {
  return useQuery({
    queryKey: [...professionCategoryKey],
    queryFn: () => getAllProfessionCategory(),
  });
};

export const getProfessionsCustomer = async (idCustomer: string | number) => {
  return await customInstance<getProfessionsCustomerApiResponse>({
    url: `customer/${idCustomer}/profession`,
    method: "get",
  });
};

export const useProfessionCustomer = (idCustomer: string | number) => {
  return useQuery({
    queryKey: [...professionCustomerKey, idCustomer],
    queryFn: () => getProfessionsCustomer(idCustomer),
    enabled: !!idCustomer,
  });
};

export const getSocieteForProfession = async (
  customerId: string | number,
  professionId: string | number,
) => {
  const response = await customInstance<getSocieteForProfessionApiResponse>({
    url: `/customer/${customerId}/profession/${professionId}/societe`,
    method: "get",
  });

  return response.data;
};

export const useSocieteForProfession = (
  customerId: string | number,
  professionId: string | number,
) => {
  return useQuery({
    queryKey: [`societeForProfession`, customerId, professionId],
    queryFn: () => getSocieteForProfession(customerId, professionId),
  });
};
