"use client";

import { type CustomerAllResponse } from "@/apis/modules/customer/customer-api-types";
import { customerKey } from "@/apis/modules/customer/customer-constants";
import { customInstance } from "@/server/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projetKey } from "../projet/projet-constants";

export async function getAllCustomerByProjet(idApplication: string) {
  return await customInstance<CustomerAllResponse>({
    url: `/projet/${idApplication}/customer`,
    method: "GET",
  });
}
export const useAllCustomerByProjet = (idApplication: string) => {
  return useQuery({
    queryKey: [...customerKey, idApplication],
    queryFn: () => getAllCustomerByProjet(idApplication),
  });
};

export async function getAllCustomer() {
  return await customInstance<CustomerAllResponse>({
    url: `/customer`,
    method: "GET",
  });
}

export const useAllCustomer = () => {
  return useQuery({
    queryKey: [...customerKey],
    queryFn: () => getAllCustomer(),
  });
};

export async function deleteCustomer(
  idApplication: string,
  customerId: string,
) {
  return await customInstance({
    url: `/projet/${idApplication}/customer/${customerId}`,
    method: "DELETE",
  });
}

export const useDeleteCustomer = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (customerId: string) =>
      await deleteCustomer(idApplication, customerId),

    onSuccess: async () => {
      // Invalidate customers list
      await queryClient.invalidateQueries({
        queryKey: [...customerKey, idApplication],
      });

      // Invalidate project so Sidebar updates
      await queryClient.invalidateQueries({
        queryKey: [...projetKey, idApplication], // 🔥 same key used in useProjetById
      });
    },
  });
};
