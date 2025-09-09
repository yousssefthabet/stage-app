export type ChildType = {
  id: string | number;
  customerIds?: string[];
  firstName?: string | null;
  lastName?: string | null;
  birthday?: Date | null;
  relationship?: string | null;
  parentName?: string | null;
  isCharge: boolean;
  isGardeAlt: boolean;
  isHandicap: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};
