export enum ResidencesTypeEnum {
  loc = "loc",
  free = "free",
  prop = "prop",
  fonc = "fonc",
  free_tiers = "free_tiers",
}
export const residenceTypes = [
  { id: ResidencesTypeEnum.loc, name: "Locataire" },
  { id: ResidencesTypeEnum.free, name: "Hébergé gratuitement" },
  { id: ResidencesTypeEnum.prop, name: "Propriétaire" },
  { id: ResidencesTypeEnum.fonc, name: "Logement de fonction" },
  { id: ResidencesTypeEnum.free_tiers, name: "Hébergé chez un tiers" },
];

export type CustomerResidence = {
  id?: string;
  type?: string;
  loyer?: string;
  isFreeEstimation?: boolean;
  isVendu?: boolean;
  occupationStartDate?: string;
};
