export enum IdentityType {
  CNI = "CNI",
  PASSPORT = "PASSPORT",
  CARTE_SEJOUR = "CARTE_SEJOUR",
  PERMIS_CONDUIRE = "PERMIS_CONDUIRE",
  AUTRE = "AUTRE",
}

export interface CustomerIdentityDocumentResponse {
  id?: string;
  number: string;
  type?: IdentityType;
  issuedAt?: string;
  expiresAt?: string;
}

export interface CustomerIdentityDocumentResponseList {
  data: CustomerIdentityDocumentResponse;
}

export interface CustomerIdentityDocumentRequest {
  number: string;
  issuedAt?: string;
  expiresAt?: string;
}

export type CustomerIdentityDocumentUpdateRequest =
  Partial<CustomerIdentityDocumentRequest>;
