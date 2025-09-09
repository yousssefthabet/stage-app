"use client";

import { customInstance } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { type CityGetResponse } from "./city-api-types";
import { citysKey } from "./city-constants";

export async function getCity(params?: { name?: string; postalCode?: string }) {
  const result = await customInstance<CityGetResponse>({
    url: `/cities/search`,
    method: "GET",
    params: params,
  });

  return result.data ?? [];
}

//////////////////////////////

export const useCity = (params?: { name?: string; postalCode?: string }) => {
  return useQuery({
    queryKey: [citysKey, params],
    queryFn: () => getCity(params),
    enabled: !!(params?.name ?? params?.postalCode),
  });
};
