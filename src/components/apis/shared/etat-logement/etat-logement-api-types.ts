export type EtatLogementsListResponse = {
  data: EtatLogement[];
};

export type EtatLogement = {
  id: number;
  ident: string;
  name?: string | null;
};
