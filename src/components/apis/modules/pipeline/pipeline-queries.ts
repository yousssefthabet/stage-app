"use client";

import { apiClientWithAuth } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import { pipelineKey } from "./pipeline-constants";
import { type pipelineGetResponse } from "./pipeline-api-types";
import { type Pipeline } from "@/apis/types/pipeline-types";

export async function getPipeline() {
  const client = await apiClientWithAuth();

  const result = await client.get<pipelineGetResponse>(`/pipeline`);
  return result.data.data;
}

export const usePipeline = () => {
  return useQuery<Pipeline[]>({
    queryKey: [...pipelineKey],
    queryFn: () => getPipeline(),
  });
};
