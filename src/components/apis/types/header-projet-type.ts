export type CustomerPhoneNumber = {
  customerId: string;
  phoneNumberId: string;
  phoneNumber: {
    id: string;
    number: string;
    category: string;
    countryId: string;
    createdAt: string;
    updatedAt: string;
    etablissementBancaireId: string | null;
  };
};

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  civilite: string;
  email: string;
  isEmpOrCoemp: boolean;
  isSci: boolean;
  isCaution: boolean;
  isSolidaire: boolean;
  isHypotecaire: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  customerPhoneNumbers: CustomerPhoneNumber[];
};

export type SourceDetail = {
  id: string;
  label?: string;
  firstName?: string;
  lastName?: string;
  typeSourceId: string;
  customerId: string | null;
  apporteurId: string | null;
  possibleValues: string[] | null;
  createdAt: string;
};

export type TypeSource = {
  id: string;
  name: string;
  slug: string;
  valueSourceType: string;
  createdAt: string;
};
export type OperationType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: string;
  etat: string;
  comment: string;
  commentPrescr: string;
  applicationId: string;
  typeRdv: string;
  signedByUserId: string;
  assignedUser: {
    id: string;
    masterUserId: string;
    firstName: string;
    lastName: string;
    gender: string | null;
    civilite: string | null;
    category: string;
    userPhoto: string | null;
    email: string;
    username: string;
    confirmed: boolean;
    active: boolean;
    identifiantIframeApporteur: string | null;
    lastSeenAt: string | null;
    calendlyUrl: string | null;
    backofficeId: string | null;
    commercialId: string | null;
    levelId: string | null;
    societeId: string | null;
    createdAt: string;
    updatedAt: string;
    roleId: string;
  };
  etape: {
    createdAt: string;
    id: string;
    ident: string;
    name: string;
    order: number;
    stepId: string;
    updatedAt: string;
  };
  rappelHour: string | null;
  dateEcheance: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

export type AgentBackoffice = {
  active: boolean;
  backofficeId: string | null;
  calendlyUrl: string | null;
  category: string;
  civilite: string | null;
  commercialId: string | null;
  confirmed: boolean;
  createdAt: string;
  email: string;
  firstName: string;
  gender: string | null;
  id: string;
  identifiantIframeApporteur: string | null;
  lastName: string;
  lastSeenAt: string | null;
  levelId: string | null;
  roleId: string | null;
  societeId: string | null;
  updatedAt: string;
  userPhoto: string | null;
  username: string | null;
};

export type HeaderProjet = {
  id: string;
  agentBackoffice: AgentBackoffice | null;
  refDossierEnBanque: string | null;
  customers: Customer[];
  sourceDetail: SourceDetail | null;
  operationType: OperationType | null;
  task: Task | null;
  rappelHour: string | null;
  TypeSource: TypeSource;
};
