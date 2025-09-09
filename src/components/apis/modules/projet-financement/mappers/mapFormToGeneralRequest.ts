import { type ProjetFinancementGeneralRequest } from "@/apis/modules/projet-financement/types/projet-financement-general-request.type";
import { type FormValuesGeneral } from "@/app/(private)/projet/[id]/details-projet/financement/_components/general/type";

export const mapFormToGeneralRequest = (
  form: FormValuesGeneral,
): ProjetFinancementGeneralRequest => ({
  etatProjetImmobilierId: Number(form.etatProjet),
  compromiseSignatureDate: form.dateSignatureCompromis ?? undefined,
  suspensiveConditionsDate: form.dateConditionsSuspensives ?? undefined,
  notaireSignatureDate: form.dateSignatureNotaire ?? undefined,
  choixClient: form.choixClient,
  dateSignature: form.dateProjet ?? undefined,
  usageLogementId: Number(form.usageLogement),
  operationTypeId: Number(form.typeid),
  apport: form.apport_personnel ?? "0",
  pretRelais: form.pretRelais,
  customerIds: form.customerIds,
});
