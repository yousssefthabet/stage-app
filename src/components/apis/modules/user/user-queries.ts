"use client";

import { apiClientWithAuth, customInstance } from "@/server/axios";
import { useQuery } from "@tanstack/react-query";
import {
  type whoAmIGetResponse,
  type UsersGetResponse,
  type UsersWithRoleGetResponse,
} from "./user-api-types";
import { type SearchParams } from "@/types/search-params";
import { handleSearchParams } from "@/lib/utils";
import { userKey, usersKey, userWithRoleKey } from "./user-constants";
import { useMemo } from "react";

export async function getUsers(queryString: string) {
  const client = await apiClientWithAuth();

  const result = await client.get<UsersGetResponse>(`/user${queryString}`);
  return result.data.data;
}
export const useUsers = (SearchParams: SearchParams) => {
  const queryString = useMemo(() => {
    return handleSearchParams(SearchParams, [
      { key: "active", type: "boolean" },
      { key: "search", type: "string" },
      { key: "type", type: "string" },
      { key: "ville", type: "string" },
      { key: "role", type: "string" },
    ]);
  }, [SearchParams]);
  return useQuery({
    queryKey: [...usersKey, queryString],
    queryFn: () => getUsers(queryString),
  });
};

export async function whoAmI() {
  const client = await apiClientWithAuth();

  const result = await client.get<whoAmIGetResponse>(`/auth/whoami`);
  return result.data.data.user;
}

export const useWhoAmI = () => {
  return useQuery({
    queryKey: [...userKey],
    queryFn: whoAmI,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const getUsersWithRole = async (
  role: "commercial" | "backoffice" | "apporteur" | "parrain",
) => {
  const result = await customInstance<UsersWithRoleGetResponse>({
    url: `/user/${role}`,
    method: "get",
  });
  return result.data.data;
};

export const useUsersWithRole = (
  role: "commercial" | "backoffice" | "apporteur" | "parrain",
) => {
  return useQuery({
    queryKey: [...userWithRoleKey, role],
    queryFn: () => getUsersWithRole(role),
  });
};
