export type ProprieteBiensListResponse = {
  data: ProprieteBien[];
};

export type ProprieteBien = {
  id: number;
  ident: string;
  name?: string | null;
};
