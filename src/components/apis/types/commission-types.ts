import { z } from "zod";

export type Commission = {
  id: bigint;
  value: number;
  percentage?: number | null;
  userId: bigint;
  typeCommission: "general" | "biens";
};

export const commissionSchema = z.object({
  id: z.bigint(),
  value: z.number(),
  percentage: z.number().nullable().optional(),
  userId: z.bigint(),
  typeCommission: z.enum(["general", "biens"]),
});
