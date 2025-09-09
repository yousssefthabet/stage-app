export enum FieldType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  DATE = "DATE",
}

export enum Operator {
  GREATER_THAN = "GREATER_THAN",
  LESS_THAN = "LESS_THAN",
  GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
  LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL",
  EQUAL = "EQUAL",
  STARTS_WITH = "STARTS_WITH",
  ENDS_WITH = "ENDS_WITH",
  CONTAINS = "CONTAINS",
}

export enum PochetteCategory {
  EMPRUNTEUR = "EMPRUNTEUR",
  COEMPRUNTEUR = "COEMPRUNTEUR",
  AUTRES_BIENS_IMMOBILIERS = "AUTRES_BIENS_IMMOBILIERS",
  PROJET_IMMOBILIER = "PROJET_IMMOBILIER",
  DOCUMENTS_FUSIONNES = "DOCUMENTS_FUSIONNES",
  REVENUS = "REVENUS",
  REGLEMENTAIRE_FINALISE = "REGLEMENTAIRE_FINALISE",
  COURRIERS = "COURRIERS",
  RESIDENCE_PRINCIPALE = "RESIDENCE_PRINCIPALE",
  PRETS_EN_COURS = "PRETS_EN_COURS",
  DOCUMENTS_TEMPLATE = "DOCUMENTS_TEMPLATE",
  SITUATION_FINANCIERE = "SITUATION_FINANCIERE",
  CARCASSE_DDP = "CARCASSE_DDP",
  REGLEMENTATION = "REGLEMENTATION",
  DOCUMENT_FORMATION = "DOCUMENT_FORMATION",
  A_CLASSER = "A_CLASSER",
  BIEN_GENERES = "BIEN_GENERES",
  DOCUMENTS_GENERES = "DOCUMENTS_GENERES",
  NON_CLASSES = "NON_CLASSES",
  FACTURES = "FACTURES",
  MANDAT_DOCUMENTS = "MANDAT_DOCUMENTS",
  PIECE_JOINTE = "PIECE_JOINTE",
}

export enum OcrModule {
  PIECE_IDENTITE = "PIECE_IDENTITE",
  BULLETIN_SALAIRE = "BULLETIN_SALAIRE",
  AVIS_IMPOSITION = "AVIS_IMPOSITION",
  RELEVE_COMPTE_BANCAIRE = "RELEVE_COMPTE_BANCAIRE",
  AUTO_CLASSIFICATION = "AUTO_CLASSIFICATION",
}

export type Pochette = GroupingPochette | ChildPochette | ParentPochette;

export type BasePochette = {
  id: string;
  name: string;
  description: string;
  order: number;
  roleId?: number;
};

export type GroupingPochette = BasePochette & {
  isGroupingPochette: true;
  hasParent: false;
  parentId?: undefined;
  groupingId?: undefined;
  children: ParentPochette[];
  PochetteVisibilityRule?: undefined;
};

export type ChildPochette = BasePochette & {
  isGroupingPochette: false;
  hasParent: true;
  parentId: string;
  category?: string;
  groupingId?: undefined;
  children?: undefined;
  ocrEnabled?: boolean;
  ocrModule?: string;
  PochetteVisibilityRule: PochetteVisibilityRule[];
};

export type ParentPochette = BasePochette & {
  isGroupingPochette: false;
  hasParent: false;
  parentId?: undefined;
  groupingId: string | null;
  children: ChildPochette[];
  PochetteVisibilityRule?: undefined;
};

export interface PochetteVisibilityRule {
  id: string;
  fieldId: string;
  operator: Operator;
  value: string;
}

export interface PochetteVisibilityField {
  id: string;
  name: string;
  path: string;
  type: FieldType;
}

export enum SimulationFileStatusEnum {
  READ = "READ",
  NOT_READ = "NOT_READ",
  ARCHIVED = "ARCHIVED",
}
export interface PochetteFile {
  id: bigint;
  applicationId: bigint;
  typeId: bigint;
  driveId: string;
  mimeType: string;
  name: string;
  size: string;
  url: string;
  status: SimulationFileStatusEnum;
  s3Key: string | null;
  nylasId: string | null;
  sentToOcr: boolean;
  order: number | null;
  treatedByOcr: boolean;
  assignedUser: bigint | null;
  backOffice: bigint | null;
  statusBackOffice: SimulationFileStatusEnum | null;
  savedInTenuCompte: boolean;
  carcasseId: bigint | null;
  pochetteId: string;
  pochette: Pochette | null;
  createdAt: Date;
  updatedAt: Date;
}
