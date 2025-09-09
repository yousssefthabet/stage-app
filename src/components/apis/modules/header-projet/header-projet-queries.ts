"use client";

import { customInstance } from "@/server/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { headerProjetKey } from "./header-projet-constants";
import {
  type HeaderProjetRequest,
  type HeaderProjetGetResponse,
} from "./header-projet-api-types";

export async function getHeaderProjet(id: string) {
  const result = await customInstance<HeaderProjetGetResponse>({
    url: `/projet/${id}/header`,
  });
  const temparr = [result.data];
  return temparr;
}
export const useHeaderProjet = (id: string) => {
  return useQuery({
    queryKey: [...headerProjetKey, id],
    queryFn: () => getHeaderProjet(id),
  });
};

export async function updateHeaderProjet(
  id: string,
  data: Partial<HeaderProjetRequest>,
) {
  const result = await customInstance<HeaderProjetGetResponse>({
    url: `/projet/${id}`,
    method: "PATCH",
    data,
  });

  return result.data;
}

export const useUpdateHeaderProjet = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<HeaderProjetRequest>) => {
      return await updateHeaderProjet(id, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...headerProjetKey, id],
      });
    },
  });
};
