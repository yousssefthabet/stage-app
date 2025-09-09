export type Interlocuteur = {
  title: string;
  lastName: string;
  firstName?: string;
  email?: string;
  phone?: string;
};

export type Agence = {
  id: string;
  bankName: string;
  bankBusinessName?: string;
  agencyName: string;
  agencyNameToPrint?: string;
  branchCode: string;
  agencyAddress: string;
  agencyAddressContinued?: string;
  agencyPostalCode?: string;
  agencyPhone?: string;
  agencyFax?: string;
  agencyEmail?: string;
  comment?: string;
  agencyPOBox?: string;
  postalCode?: string;
  city: string;
  interlocuteurs: Interlocuteur[];
};
