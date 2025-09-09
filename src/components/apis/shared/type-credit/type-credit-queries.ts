"use client";

import { customInstance } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { typeCreditKey } from "./type-credit-constants";
import {
  type TypeCredit,
  type TypeCreditsListResponse,
} from "./type-credit-api-types";

export const getAllCreditTypes = async (): Promise<TypeCredit[]> => {
  const response = await customInstance<TypeCreditsListResponse>({
    url: `/type-credit`,
    method: "GET",
  });
  return response.data;
};

export const useAllCreditTypes = () =>
  useQuery<TypeCredit[]>({
    queryKey: [typeCreditKey],
    queryFn: getAllCreditTypes,
  });
