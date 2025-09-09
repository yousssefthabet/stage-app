"use client";

import { customInstance } from "@/server/axios";
import { type FacturesGetResponse } from "./types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { facturesKey } from "./constants";

export const getFactures = async (
  id: string,
  {
    page = "1",
  }: {
    page?: string | null;
  },
) => {
  const response = await customInstance<FacturesGetResponse>({
    url: `projet/${id}/facture`,
    method: "GET",
    params: {
      page: page,
    },
  });

  return response;
};

export const useFactures = (id: string) => {
  const searchParams = useSearchParams();

  return useQuery({
    queryKey: [...facturesKey, id],
    queryFn: () => getFactures(id, { page: searchParams.get("page") }),
  });
};
