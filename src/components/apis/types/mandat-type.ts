export type MandatConsommataire = {
  id: string;
  numeroMandat: string;
  body: string | null;
  type: string;
  applicationId: string;
  templateId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type Mandat = {
  id: string;
  mandatId: string;
  fileYousignId: string;
  procedureId: string;
  signRequestId: string;
  memberEmpId: string | null;
  memberCoempId: string | null;
  memberCommercialId: string | null;
  memberProprietaireId: string | null;
  memberProprietaireCoempId: string | null;
  applicationFileId: string | null;
  status: string;
  statusEmp: string | null;
  statusCoemp: string | null;
  statusCommerciale: string | null;
  mandat: MandatConsommataire;
  createdAt: "2025-07-16T14:18:05.134Z";
  updatedAt: "2025-07-16T14:18:05.134Z";
};
