"use client";

import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/server/axios";
import { type MutationProps } from "@/types/mutation-props";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { type loginRequest, type loginResponse } from "./auth-api-types";
import { loginKey } from "./auth-constants";

export const login = async (data: loginRequest) => {
  const res = await apiClient.post<loginResponse>(`/auth/login`, { ...data });
  return res.data;
};

export const useLogin = (props?: MutationProps<loginResponse>) => {
  return useMutation({
    mutationKey: loginKey,
    mutationFn: login,
    onError: (e) => {
      if (isAxiosError<{ message: string }>(e)) {
        if (e.status != 422) toast.error(e.response?.data?.message);
        return;
      }
      toast.error("Une erreur est survenue lors de la connexion");
    },
    ...props,
  });
};
