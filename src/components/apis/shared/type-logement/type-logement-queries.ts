"use client";

import { customInstance } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { type TypeLogementsListResponse } from "./type-logement-api-types";
import { typeLogementKey } from "./type-logement-constants";
export const getAllTypeLogements = async () => {
  return await customInstance<TypeLogementsListResponse>({
    url: `/type-logement`,
    method: "GET",
  });
};

export const useAllTypeLogements = () =>
  useQuery<TypeLogementsListResponse>({
    queryKey: [typeLogementKey],
    queryFn: getAllTypeLogements,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
