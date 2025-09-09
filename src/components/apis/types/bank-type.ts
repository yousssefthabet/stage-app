import { z } from "zod";

export type Bank = {
  id: string;
  name: string;
  image: string;
  active: boolean;
  rachat: boolean;
  createdAt: string;
  updatedAt: string;
};

export const bankSchema = z.object({
  id: z.number(),
  name: z.string({ required_error: "Nom de la banque requis" }),
  image: z.string(),
  active: z.boolean(),
  rachat: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
