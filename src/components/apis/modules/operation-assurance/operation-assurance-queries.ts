"use client";

import { apiClientWithAuth } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { operationAssuranceKey } from "./operation-assurance-constants";
import { type operationAssuranceGetResponse } from "./operation-assurance-api-types";

export async function getOperationAssurances() {
  const client = await apiClientWithAuth();
  const result =
    await client.get<operationAssuranceGetResponse>(`/operation/Assurance`);
  return result.data.data;
}

export const useOperationAssurances = () => {
  return useQuery({
    queryKey: operationAssuranceKey,
    queryFn: () => getOperationAssurances(),
  });
};
