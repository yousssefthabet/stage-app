export enum MandatsQuestionType {
  oui_non = "oui_non",
  free_response = "free_response",
}

export type MandatsArticle = {
  id: number;
  article: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type MandatsQuestion = {
  id: number;
  question: string;
  questionType: string;
  articleId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type mandatsQuestionAnswers = {
  question: MandatsQuestion;
  customerId: number;
  answer: boolean | string | null;
  otherAnswer: string | null;
  questionId: number;
};

export type ComplementInsurance = {
  coveragePercentage: number;
  diplomeGrandEcole: boolean;
  etudeMedical: boolean;
  franchise: string | null;
  hasBackGuarantee: boolean;
  hasJobLossGuarantee: boolean;
  hasPsychGuarantee: boolean;
  insuredGuarantee: string | null;
  isManualWorker: boolean;
  isSmoker: boolean;
  isTravelingMore2000km: boolean;
  isWorkingAtHeight3Meters: boolean;
  medicalStudyRequest: boolean;
  professionRiskId: number | null;
  sportRiskId: number | null;
  tauxChargement: string | null;
  taxCityId: number | null;
  taxResidenceCountryId: number | null;
};

export type ComplementDataPrivacy = {
  cessionCoordinates: boolean;
  collectData: boolean;
  isNpai: boolean;
  receiveOffers: boolean;
};

export type ComplementPersonalBank = {
  bankId: number;
  bic: string;
  ficheBanqueFrance: boolean;
  ficheBanqueFranceFCC: boolean;
  ficheBanqueFranceFICP: boolean;
  iban: string;
  isCurrentBank: boolean;
};

export type operationType = {
  id: number;
  name: string;
  operationTypeId: number | null;
};

export type Complement = {
  diplomeGrandEcole: boolean | null;
  personalBanks: ComplementPersonalBank[];
  dataPrivacy: ComplementDataPrivacy | null;
  mandatsQuestionAnswers: mandatsQuestionAnswers[];
  insurance: ComplementInsurance | null;
  typeOperationAssurance: operationType | null;
  typeOperationAssuranceId: number | null;
};
