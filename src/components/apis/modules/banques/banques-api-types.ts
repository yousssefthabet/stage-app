import { type Banque } from "@/apis/types/banques-types";

export type BanquesGetResponse = {
  data: {
    banks: Banque[];
    meta: {
      total: number;
      page: number;
      perPage: number;
      totalPages: number;
    };
  };
};

export type BanquesGetParams = {
  page: number;
  perPage: number;
  sortOrder: "asc" | "desc";
  sortBy: string;
  search?: string | null;
};
