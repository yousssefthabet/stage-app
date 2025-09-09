"use client";

import { customInstance } from "@/server/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNylasAccountsKey } from "@/apis/modules/mail/mail-constants";

export const exchangeCodeGrantToken = async (code: string) => {
  const result = await customInstance({
    url: "/nylas/auth/token",
    method: "post",
    data: {
      code,
      redirectURI: "http://localhost:3000/espace-mail",
    },
  });
  return result;
};

export async function authMail(email: string, pwd: string) {
  return await customInstance({
    url: `ovh/account/auth`,
    method: "POST",
    data: { email, pwd },
  });
}

export const useAuthMail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, pwd }: { email: string; pwd: string }) =>
      authMail(email, pwd),
    onSuccess: () => {
      void queryClient.resetQueries({ queryKey: [...useNylasAccountsKey] });
      void queryClient.invalidateQueries({
        queryKey: [...useNylasAccountsKey],
        refetchType: "active",
      });
    },
  });
};

export async function deleteAccount(id: string) {
  return await customInstance({
    url: `ovh/account/${id}`,
    method: "DELETE",
  });
}
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteAccount(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [...useNylasAccountsKey],
        refetchType: "active",
      });
    },
  });
};
