"use client";

import { apiClientWithAuth } from "@/server/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type ChildListResponse,
  type ChildParams,
  type ChildRequest,
} from "@/apis/modules/child/child-api-types";
import { childKey } from "@/apis/modules/child/child-constants";

export const createChild = async (
  idApplication: string,
  data: ChildRequest,
) => {
  const client = await apiClientWithAuth();
  return client.post(`/projet/${idApplication}/child`, data);
};

export const getChildren = async (idApplication: string, req: ChildParams) => {
  const client = await apiClientWithAuth();

  const result = await client.get<ChildListResponse>(
    `/projet/${idApplication}/child`,
    {
      params: req,
    },
  );

  return result.data;
};

export const getChildById = async (idApplication: string, id: string) => {
  const client = await apiClientWithAuth();

  return client.get(`/projet/${idApplication}/child/${id}`);
};

export const updateChild = async (
  idApplication: string,
  id: string,
  data: ChildRequest,
) => {
  const client = await apiClientWithAuth();

  return client.patch(`/projet/${idApplication}/child/${id}`, data);
};

export const deleteChild = async (idApplication: string, id: string) => {
  const client = await apiClientWithAuth();

  return client.delete(`/projet/${idApplication}/child/${id}`);
};

export const useChildren = (idApplication: string, req: ChildParams) =>
  useQuery({
    queryKey: [...childKey, idApplication, req],
    queryFn: () => getChildren(idApplication, req),
  });

export const useChild = (idApplication: string, id: string) =>
  useQuery({
    queryKey: [...childKey, idApplication, id],
    queryFn: () => getChildById(idApplication, id),
  });

export const useCreateChild = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      idApplication,
      data,
    }: {
      idApplication: string;
      data: ChildRequest;
    }) => createChild(idApplication, data),
    onSuccess: (_) => {
      void queryClient.invalidateQueries({
        queryKey: [...childKey],
      });
    },
  });
};

export const useUpdateChild = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      idApplication,
      id,
      data,
    }: {
      idApplication: string;
      id: string;
      data: ChildRequest;
    }) => updateChild(idApplication, id, data),
    onSuccess: (_) => {
      void queryClient.invalidateQueries({ queryKey: [...childKey] });
    },
  });
};

export const useDeleteChild = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      idApplication,
      id,
    }: {
      idApplication: string;
      id: string;
    }) => deleteChild(idApplication, id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...childKey] });
    },
  });
};
