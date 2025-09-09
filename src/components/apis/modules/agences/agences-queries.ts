"use client";
import { useQuery } from "@tanstack/react-query";
import type {
  GetAgencesResponse,
  GetAgenciesParams,
} from "./agences-api-types";
import { apiClientWithAuth } from "@/server/axios";
import { agenceKey } from "./agences-constants";

export const getAgencies = async ({
  page = 1,
  perPage = 10,
  sortOrder = "asc",
  sortBy = "bank_name",
  search,
}: GetAgenciesParams) => {
  const client = await apiClientWithAuth();

  const response = await client.get<GetAgencesResponse>(
    `/agency?page=${page}&perPage=${perPage}&sortOrder=${sortOrder}&sortBy=${sortBy}${
      search ? `&search=${search}` : ""
    }`,
  );
  return response.data;
};

export function useAgencies({
  page = 1,
  perPage = 10,
  sortOrder = "asc",
  sortBy = "bank_name",
  search,
}: GetAgenciesParams) {
  const { data, isLoading, error } = useQuery<GetAgencesResponse, Error>({
    queryKey: [...agenceKey, { page, perPage, sortOrder, sortBy, search }],
    queryFn: () => getAgencies({ page, perPage, sortOrder, sortBy, search }),
  });

  return {
    data,
    isLoading,
    error,
  };
}
