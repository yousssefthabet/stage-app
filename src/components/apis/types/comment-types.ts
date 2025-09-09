import { type User } from "./user-types";

export type Comment = {
  id: string;
  userId: string;
  user: User;
  applicationId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
};
