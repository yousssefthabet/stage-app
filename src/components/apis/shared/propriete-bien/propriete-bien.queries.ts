"use client";

import { customInstance } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { type ProprieteBiensListResponse } from "./propriete-bien-api-types";
import { proprieteBienKey } from "./propriete-bien.constants";

export const getAllProprieteBiens = async () => {
  return await customInstance<ProprieteBiensListResponse>({
    url: `/propriete-bien`,
    method: "GET",
  });
};

export const useAllProprieteBiens = () =>
  useQuery({
    queryKey: [proprieteBienKey],
    queryFn: () => getAllProprieteBiens(),
  });
