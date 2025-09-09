export type PaginationParams = {
  page: number;
  perPage: number;
  sortOrder?: "asc" | "desc";
  sortBy?: string;
};
