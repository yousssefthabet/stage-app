"use client";

import { customInstance } from "@/server/axios";
import { type MandatGetResponse } from "./types";
import { mandatKey } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const getMandats = async (
  id: string,
  {
    page = "1",
  }: {
    page?: string | null;
  },
) => {
  const response = await customInstance<MandatGetResponse>({
    url: `projet/${id}/mandat`,
    method: "GET",
    params: {
      page: page,
    },
  });

  return response;
};

export const useMandat = (id: string) => {
  const searchParams = useSearchParams();

  return useQuery({
    queryKey: [...mandatKey, id],
    queryFn: () => getMandats(id, { page: searchParams.get("page") }),
  });
};
