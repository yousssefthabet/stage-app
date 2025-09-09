export type TypeCreditsListResponse = {
  data: TypeCredit[];
};

export type TypeCredit = {
  id: string;
  name?: string | null;
};
