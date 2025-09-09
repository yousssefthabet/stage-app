import { Projet } from "@/apis/types/projet-types";
import { ProjetGetResponse, UpdateApplication } from "./projet-api-types";
import { apiClientWithAuth } from "@/server/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projetKey } from "./projet-constants";

export async function updateApplication(
  id: string,
  payload: UpdateApplication,
): Promise<Projet> {
  const client = await apiClientWithAuth();
  const result = await client.patch<ProjetGetResponse>(
    `/projet/${id}`,
    payload,
  );
  return result.data.data;
}

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateApplication }) =>
      updateApplication(id, data),
    onSuccess: async () => {
      // Invalider le cache pour recharger les données du projet
      await queryClient.invalidateQueries({
        queryKey: projetKey,
        refetchType: "active",
      });
    },
  });
};
