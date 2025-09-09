export type NormeConstructionsListResponse = {
  data: NormeConstruction[];
};

export type NormeConstruction = {
  id: number;
  ident: string;
  name?: string | null;
};
