export type CreatePhoneNumber = {
  id?: string;
  number?: string;
  category?: "DOMICILE" | "MOBILE" | "BUREAU";
  countryId?: string;
  userId?: number;
};
