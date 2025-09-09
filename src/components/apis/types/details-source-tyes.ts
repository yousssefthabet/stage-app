import { type TypeSource } from "./type-source-types";

export type DetailsSources = {
  id: string;
  label: string | null;
  typeSourceId: string;
  typeSource: TypeSource;
  customerId: string | null;
  possibleValues: Record<string, string>[] | null;
  createdAt: Date;
};
