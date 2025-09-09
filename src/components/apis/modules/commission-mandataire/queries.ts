"use client";

import { customInstance } from "@/server/axios";
import { type CommissionMandataireGetResponse } from "./types";
import { commissionMandataireKey } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const getCommissionMandataires = async (
  id: string,
  {
    page = "1",
  }: {
    page?: string | null;
  },
) => {
  const response = await customInstance<CommissionMandataireGetResponse>({
    url: `projet/${id}/commission-mandataire`,
    method: "GET",
    params: {
      page: page,
    },
  });

  return response;
};

export const useCommissionMandataires = (id: string) => {
  const searchParams = useSearchParams();

  return useQuery({
    queryKey: [...commissionMandataireKey, id],
    queryFn: () =>
      getCommissionMandataires(id, { page: searchParams.get("page") }),
  });
};
