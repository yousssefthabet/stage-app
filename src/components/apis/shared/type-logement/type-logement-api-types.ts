export type TypeLogementsListResponse = {
  data: {
    data: TypeLogement[];
  };
};

export type TypeLogement = {
  id: number;
  ident: string;
  name?: string | null;
};
