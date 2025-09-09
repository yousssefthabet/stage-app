export type CountriesListResponse = {
  data: Country[];
};
//
export type Country = {
  iso2: string;
  iso3: string;
  numericCode: string;
  name?: string | null;
};
