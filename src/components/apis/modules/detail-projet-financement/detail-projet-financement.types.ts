import { type AddressResponse } from "../credit-patrimoine/types";

export interface ProjetFinancementDetailListResponse {
  data: ProjetFinancementDetailResponse;
}

export enum PlacesType {
  fr = "fr",
  ue = "ue",
}

export enum DpeType {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  SansDPE = "SansDPE",
}

export enum ZonePtz {
  zone_a = "zone_a",
  zone_abis = "zone_abis",
  zone_b1 = "zone_b1",
  zone_b2 = "zone_b2",
  zone_c = "zone_c",
}

export enum ZoneApl {
  zone_1 = "zone_1",
  zone_1bis = "zone_1bis",
  zone_2idf = "zone_2idf",
  zone_2prov = "zone_2prov",
  zone_3prov = "zone_3prov",
}

export interface ProjetFinancementDetailResponse {
  id: string;
  refVendeur?: string;
  refNumReservation?: string;
  refNumProg?: string;
  refNumLot?: string;
  refAnnexes?: string;
  refCadastre?: string;
  isAccessionPsla?: boolean;
  isRevenuteHlm?: boolean;
  isTravLourdRemiseNeufPtz?: boolean;
  isTravTransfLogementPtz?: boolean;
  typeLogementId: number;
  etatLogementId?: number;
  proprieteBienId?: number;
  nbrPiece?: number;
  normeConstrucId?: number;
  ageLogement?: number;
  surfaceHabitable?: number;
  surfaceAnnex?: number;
  surfaceCreatedTrav?: number;
  surfaceTerrain?: number;
  surfaceLocauxPro?: number;
  place?: PlacesType;
  dpe?: DpeType;
  zonePtz?: ZonePtz;
  zoneApl?: ZoneApl;
  futureOccupants?: number;
  isPrimoAccessionHp?: boolean;
  souhaiteEstimationGratuite?: boolean;
  hasSamePropInFrench?: boolean;
  codeInsee?: string;
  numDepart?: string;
  address?: AddressResponse;
}

export interface ProjetFinancementDetailRequestBase {
  refVendeur?: string;
  refNumReservation?: string;
  refNumProg?: string;
  refNumLot?: string;
  refAnnexes?: string;
  refCadastre?: string;
  isAccessionPsla?: boolean;
  isRevenuteHlm?: boolean;
  isTravLourdRemiseNeufPtz?: boolean;
  isTravTransfLogementPtz?: boolean;
  typeLogementId?: number;
  etatLogementId?: number;
  proprieteBienId?: number;
  nbrPiece?: number;
  normeConstrucId?: number;
  ageLogement?: number;
  surfaceHabitable?: number;
  surfaceAnnex?: number;
  surfaceCreatedTrav?: number;
  surfaceTerrain?: number;
  surfaceLocauxPro?: number;
  place?: PlacesType;
  dpe?: DpeType;
  zonePtz?: ZonePtz;
  zoneApl?: ZoneApl;
  futureOccupants?: number;
  isPrimoAccessionHp?: boolean;
  souhaiteEstimationGratuite?: boolean;
  hasSamePropInFrench?: boolean;
  codeInsee?: string;
  numDepart?: string;
  address?: AddressResponse;
}

export type ProjetFinancementDetailCreateRequest =
  Partial<ProjetFinancementDetailRequestBase>;

export type ProjetFinancementDetailUpdateRequest =
  Partial<ProjetFinancementDetailRequestBase>;
