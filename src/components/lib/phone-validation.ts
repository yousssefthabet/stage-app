"use client";

import parsePhoneNumberFromString, {
  type CountryCode,
} from "libphonenumber-js";
import { toast } from "sonner";
import z from "zod";

export const createClientPhoneSchema = (countryCode: string) => {
  return z.string().refine((phone) => {
    if (!phone) return false;

    const phoneNumber = parsePhoneNumberFromString(
      phone,
      countryCode as CountryCode,
    );

    return Boolean(phoneNumber?.isValid());
  });
};

export const verifyPhoneNumber = (phone: {
  number: string;
  countryId: string;
  category: string;
}): boolean => {
  const phoneSchema = createClientPhoneSchema(phone.countryId);
  const result = phoneSchema.safeParse(phone.number);

  if (!result.success) {
    toast.error("Numéro de téléphone invalide pour le pays sélectionné", {
      duration: 4000,
    });
    return false;
  }

  return true;
};
