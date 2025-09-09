"use client";

import { customInstance } from "@/server/axios";
import { type CountriesListResponse } from "../../../apis/shared/countries/country-api-types";
import { useQuery } from "@tanstack/react-query";
import { countryKey } from "./country-constants";

export const getAllCountries = async () => {
  return await customInstance<CountriesListResponse>({
    url: `/countries`,
    method: "GET",
  });
};

export const useAllCountries = () =>
  useQuery({
    queryKey: [countryKey],
    queryFn: () => getAllCountries(),
  });

export const searchCountries = async (name: string) => {
  return await customInstance<CountriesListResponse>({
    url: `/countries/search`,
    method: "GET",
    params: { name },
  });
};

export const useSearchCountries = (name: string) =>
  useQuery({
    queryKey: [countryKey, name],
    queryFn: () => searchCountries(name),
    enabled: !!name,
  });
