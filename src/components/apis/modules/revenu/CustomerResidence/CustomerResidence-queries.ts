"use client";

import { customInstance } from "@/server/axios";

import { useQuery } from "@tanstack/react-query";
import { type CustomerResidenceGetResponse } from "./CustomerResidence-api-types";
import { CustomerResidenceKey } from "./CustomerResidence-constants";

export async function getCustomerResidence(id: string) {
  const result = await customInstance<CustomerResidenceGetResponse>({
    url: `/customer/${id}/residence`,
    method: "get",
  });
  return result.data;
}

export const useCustomerResidence = (id: string) => {
  return useQuery({
    queryKey: CustomerResidenceKey,
    queryFn: () => getCustomerResidence(id),
  });
};
