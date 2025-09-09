import { type ChildType } from "@/apis/types/child-types";

export type ChildListResponse = {
  count: number;
  totalPages: number;
  data: ChildType[];
};

export type ChildParams = {
  page: number;
  perPage: number;
  sortOrder?: "asc" | "desc";
  sortBy?: string;
};

// types/child.ts

export type ChildRequest = {
  firstName?: string;
  lastName?: string;
  birthday?: string;
  isCharge: boolean;
  isGardeAlt: boolean;
  isHandicap: boolean;
  customerIds: number[];
};
