import { customInstance } from "@/server/axios";
import { type SocieteBilansGetResponse } from "./api-types";
import { useQuery } from "@tanstack/react-query";
import { societeBilansKey } from "./constants";
import { professionCustomerKey } from "../profession-revenu/constants";

export const getSocieteBilans = async (societeId: string) => {
  const response = await customInstance<SocieteBilansGetResponse>({
    url: `/societe/${societeId}/bilans`,
    method: "GET",
  });

  return response.data;
};

export const useSocieteBilans = (societeId: string) => {
  return useQuery({
    queryKey: [...societeBilansKey, societeId],
    queryFn: () => getSocieteBilans(societeId),
  });
};
