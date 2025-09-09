"use client";

import { customInstance } from "@/server/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { tenueComptesKey } from "./tenue-comptes.constants";
import {
  type tenueComptesDataCopy,
  type tenueComptesListResponse,
} from "@/apis/modules/tenue-comptes/types";

export const getTenueComptesByType = async ({
  idApplication,
  type,
}: {
  idApplication: string;
  type: string;
}) => {
  return await customInstance<tenueComptesListResponse>({
    url: `/projet/${idApplication}/tenue-comptes/type/${type}`,
    method: "GET",
  });
};

export const useTenueComptesByType = ({
  idApplication,
  type,
}: {
  idApplication: string;
  type: string;
}) =>
  useQuery({
    queryKey: [tenueComptesKey, idApplication, type],
    queryFn: () => getTenueComptesByType({ idApplication, type }),
    enabled: !!idApplication && !!type,
  });

export const updateTenueCompteDetail = async ({
  idApplication,
  id,
  type,
  data,
}: {
  idApplication: string;
  id: string | number;
  type: string;
  data: Partial<tenueComptesDataCopy>;
}) => {
  return await customInstance({
    url: `/projet/${idApplication}/tenue-comptes/${id}/type/${type}`,
    method: "PATCH",
    data,
  });
};

export const useUpdateTenueCompteDetail = ({
  idApplication,
  type,
}: {
  idApplication: string;
  type: string;
}) => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | number;
      data: Partial<tenueComptesDataCopy>;
    }) => updateTenueCompteDetail({ idApplication, id, type, data }),
  });
};

export const createTenueCompteDetail = async ({
  idApplication,
  type,
  data,
}: {
  idApplication: string;
  type: string;
  data: Partial<tenueComptesDataCopy>;
}) => {
  return await customInstance<{ data: tenueComptesDataCopy }>({
    url: `/projet/${idApplication}/tenue-comptes/${type}`,
    method: "POST",
    data,
  });
};

export const useCreateTenueCompteDetail = ({
  idApplication,
  type,
}: {
  idApplication: string;
  type: string;
}) => {
  return useMutation({
    mutationFn: (data: Partial<tenueComptesDataCopy>) =>
      createTenueCompteDetail({ idApplication, type, data }),
  });
};

export const deleteTenueCompteDetail = async ({
  idApplication,
  id,
}: {
  idApplication: string;
  id: string | number;
}) => {
  return await customInstance({
    url: `/projet/${idApplication}/tenue-comptes/${id}`,
    method: "DELETE",
  });
};

export const useDeleteTenueCompteDetail = ({
  idApplication,
}: {
  idApplication: string;
}) => {
  return useMutation({
    mutationFn: (id: string | number) =>
      deleteTenueCompteDetail({ idApplication, id }),
  });
};
