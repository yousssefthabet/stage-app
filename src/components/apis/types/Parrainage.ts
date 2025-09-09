import { type User } from "./user-types";

export type Parrainage = {
  id: number;
  filleulCustomerId?: number;
  filleulUserId?: string;
  filleulUser?: User;
  parrainId?: string;
  parrain?: User;
};
