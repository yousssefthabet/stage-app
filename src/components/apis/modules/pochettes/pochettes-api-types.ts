import {
  type PochetteVisibilityField,
  type Pochette,
  type ParentPochette,
  type GroupingPochette,
  type PochetteFile,
} from "@/apis/types/pochettes-types";

export type PochettesGetResponse = {
  data: {
    pochettes: (ParentPochette | GroupingPochette)[];
  };
};

export type CreatePochetteRequest = Omit<Pochette, "id" | "children" | "order">;

export type updatePochetteRequest = {
  id: string;
  data: Omit<Pochette, "children">;
};

export type updateManyPochetteRequest = {
  pochettes: Pochette[];
  abortSignal?: AbortSignal;
};

export type visibilityFieldsGetResponse = {
  data: {
    fields: PochetteVisibilityField[];
  };
};

export type PochetteFilesResponse = {
  data: PochetteFile[];
};
