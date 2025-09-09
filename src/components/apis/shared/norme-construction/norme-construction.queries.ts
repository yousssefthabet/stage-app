"use client";

import { customInstance } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { type NormeConstructionsListResponse } from "./norme-construction-api-types";
import { normeConstructionKey } from "./norme-construction.constants";
export const getAllNormeConstructions = async () => {
  return await customInstance<NormeConstructionsListResponse>({
    url: `/norme-construction`,
    method: "GET",
  });
};

export const useAllNormeConstructions = () =>
  useQuery({
    queryKey: [normeConstructionKey],
    queryFn: () => getAllNormeConstructions(),
  });
