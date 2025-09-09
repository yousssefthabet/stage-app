import { z } from "zod";

export type Role = {
  id: number;
  name: string;
  description: string;
};

export const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});
