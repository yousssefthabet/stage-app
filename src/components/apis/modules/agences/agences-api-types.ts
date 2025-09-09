import type { Agence } from "../../../apis/types/agencies-types";

export interface GetAgencesResponse {
  data: {
    agencies: Agence[];
    meta: {
      total: number;
      currentPage: number;
      pageSize: number;
      totalPages: number;
    };
  };
}

export type GetAgenciesParams = {
  page: number;
  perPage: number;
  sortOrder: "asc" | "desc";
  sortBy: string;
  search?: string | null;
};
