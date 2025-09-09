"use client";

import { apiClientWithAuth } from "@/server/axios";
import { banquesKey } from "./banques-constants";
import {
  type BanquesGetParams,
  type BanquesGetResponse,
} from "./banques-api-types";
import { useQuery } from "@tanstack/react-query";

export async function getBanques({
  page = 1,
  perPage = 10,
  sortOrder = "asc",
  sortBy = "name",
  search = null,
}: BanquesGetParams) {
  const client = await apiClientWithAuth();

  const result = await client.get<BanquesGetResponse>(
    `/bank/organization?page=${page}&perPage=${perPage}&sortOrder=${sortOrder}&sortBy=${sortBy}${search ? `&search=${search}` : ""}`,
  );
  return result.data.data;
}

export const useBanques = ({
  page = 1,
  perPage = 10,
  sortOrder = "asc",
  sortBy = "name",
  search = null,
}: BanquesGetParams) => {
  return useQuery({
    queryKey: [...banquesKey, { page, perPage, sortOrder, sortBy, search }],
    queryFn: () => getBanques({ page, perPage, sortOrder, sortBy, search }),
  });
};
