import { type SingleCreditFormValues } from "@/app/(private)/projet/[id]/details-projet/credit-patrimoine/_components/credit/_components/modal/credit-form-fiche";
import { type Credit } from "../types";
import { type CreditTauxType } from "@/app/(private)/projet/[id]/details-projet/credit-patrimoine/_components/creditImmobilie/type";

export function transformSingleCreditForForm(
  credit: Credit,
): SingleCreditFormValues {
  return {
    id: credit.id?.toString() ?? "",
    lenderId: credit.lenderId?.toString() ?? "",
    name: credit.name ?? "",
    creditTypeId: credit.creditTypeId?.toString() ?? "",
    devenirPretId: credit.devenirPretId?.toString() ?? "",
    lissable: credit.lissable?.toString() ?? "",
    internalLoan: credit.internalLoan ?? false,
    mortgageLoan: credit.mortgageLoan ?? false,
    startDate: credit.startDate?.split("T")[0] ?? "",
    endDate: credit.endDate?.split("T")[0] ?? "",
    initialAmount: credit.initialAmount?.toString() ?? "",
    remainingCapital: credit.remainingCapital?.toString() ?? "",
    interestRate: credit.interestRate?.toString() ?? "",
    customerIds: credit.customerIds?.map(Number) ?? [],
    creditTauxType: credit.creditTauxType as CreditTauxType | undefined,
    duree: credit.duree ?? 0,
    paliers:
      credit.Palier?.map((palier) => ({
        id: palier.id?.toString() ?? "",
        name: palier.name ?? "",
        mensualiteHa: palier.mensualiteHa?.toString() ?? "",
        mensualiteA: palier.mensualiteA?.toString() ?? "",
        mensualite: palier.mensualite?.toString() ?? "",
        duration: palier.duration ?? 0,
        endDate: palier.endDate?.split("T")[0] ?? "",
      })) ?? [],
  };
}
