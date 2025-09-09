import { z } from "zod";

export type Region = {
  id?: number | null;
  name: string;
  code: string;
  capital: string;
};

export type Department = {
  id?: string | null;
  name: string;
  code: string;
  regionId?: string | null;
  region?: Region | null;
};

export type postalCode = {
  cityId: string;
  code: string;
  geoShape?: number | null;
  id: string;
  latitude: number;
  longitude: number;
};

export type City = {
  id: string;
  name: string;
  normalizedName: string;
  code: string;
  PostalCodes: postalCode[];
  siren: string;
  codeEpci: string;
  latitude: number;
  longitude: number;
  departmentId: string;
  department: Department;
};

export const regionSchema = z.object({
  id: z.number().optional().nullable(),
  name: z.string({ required_error: "Nom de la région requis" }),
  code: z.string({ required_error: "Code de la région requis" }),
  capital: z.string({ required_error: "Capitale de la région requise" }),
});

export const departmentSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string({ required_error: "Nom du département requis" }),
  code: z.string({ required_error: "Code du département requis" }),
  regionId: z.string().optional().nullable(),
});

export const postalCodeSchema = z.object({
  cityId: z.string({ required_error: "ID de la ville requis" }),
  code: z.string({ required_error: "Code postal requis" }),
  geoShape: z
    .number({ required_error: "GeoShape requis" })
    .nullable()
    .optional(),
  id: z.string({ required_error: "ID requis" }),
  latitude: z.number({ required_error: "Latitude requise" }),
  longitude: z.number({ required_error: "Longitude requise" }),
});

export const citySchema = z.object({
  id: z.string({ required_error: "ID de la ville requis" }),
  name: z.string({ required_error: "Nom de la ville requis" }),
  normalizedName: z.string({ required_error: "Nom normalisé requis" }),
  code: z.string({ required_error: "Code INSEE requis" }),
  PostalCodes: z.array(postalCodeSchema),
  siren: z.string({ required_error: "SIREN requis" }),
  codeEpci: z.string({ required_error: "Code EPCI requis" }),
  latitude: z.number({ required_error: "Latitude requise" }),
  longitude: z.number({ required_error: "Longitude requise" }),
  departmentId: z.string({ required_error: "ID du département requis" }),
  department: departmentSchema,
});
