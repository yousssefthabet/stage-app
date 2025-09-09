"use client";

import { customInstance } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { devenirPretKey } from "./devenir-pret-constants";
import {
  type CDevenirPretsListResponse,
  type DevenirPret,
} from "./devenir-pret-api-types";

export const getAllDevenirsPret = async (): Promise<DevenirPret[]> => {
  const response = await customInstance<CDevenirPretsListResponse>({
    url: `/devenir-pret`,
    method: "GET",
  });
  return response.data;
};

export const useAllDevenirsPret = () =>
  useQuery<DevenirPret[]>({
    queryKey: [devenirPretKey],
    queryFn: getAllDevenirsPret,
  });
