"use client";

import { apiClientWithAuth } from "@/server/axios";

import { useQuery } from "@tanstack/react-query";
import { fastProjectsKey } from "./fast-project-constants";
import { type ApplicationGetResponse } from "./fast-project-api-types";
import { useParams } from "next/navigation";
export async function getApplicationById(id: string) {
  const client = await apiClientWithAuth();
  const result = await client.get<ApplicationGetResponse>(
    `/fast-project/${id}`,
  );
  return result.data.data.data;
}

export const useApplicationById = () => {
  const params = useParams();
  const id = params?.id as string;

  return useQuery({
    queryKey: [...fastProjectsKey, id],
    queryFn: () => getApplicationById(id),
    enabled: !!id,
  });
};
