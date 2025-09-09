import React, { useMemo } from "react";
import type { JSX } from "react";

export type SocieteRow = {
  user: string;
  dossiersFactures?: number;
  dossiersEnCours?: number;
  caFactures?: number;
  commFacturable?: number;
  commReglee?: number;
  caPrev?: number;
  commPrev?: number;
};

type Props = {
  title: string;
  rows?: SocieteRow[];
  /** Tailwind width utility (e.g. "w-full", "w-[80rem]") */
  widthClass?: string;
};

const euro = (n: number | undefined): string =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n ?? 0);

export default function SocieteGroupTable({
  title,
  rows = [],
  widthClass = "w-full",
}: Props): JSX.Element {
  const totals = useMemo(() => {
    const t = {
      users: rows.length,
      dossiersFactures: 0,
      dossiersEnCours: 0,
      caFactures: 0,
      commFacturable: 0,
      commReglee: 0,
      caPrev: 0,
      commPrev: 0,
    };
    for (const r of rows) {
      t.dossiersFactures += r.dossiersFactures ?? 0;
      t.dossiersEnCours += r.dossiersEnCours ?? 0;
      t.caFactures += r.caFactures ?? 0;
      t.commFacturable += r.commFacturable ?? 0;
      t.commReglee += r.commReglee ?? 0;
      t.caPrev += r.caPrev ?? 0;
      t.commPrev += r.commPrev ?? 0;
    }
    return t;
  }, [rows]);

  return (
    <div
      className={`bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 ${widthClass}`}
    >
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">
          {title}{" "}
          <span className="font-normal text-slate-500">({rows.length})</span>
        </h3>
      </div>

      <div className="px-3 pb-3">
        <div className="overflow-x-auto">
          <table className="min-w-full text-[13px] leading-5">
            <thead className="bg-gray-200 text-slate-700">
              <tr>
                <th className="text-left font-medium px-3 py-2">Nom Utilisateur</th>
                <th className="text-left font-medium px-3 py-2">Nombre de dossiers facturés</th>
                <th className="text-left font-medium px-3 py-2">Nombre de dossiers en cours</th>
                <th className="text-left font-medium px-3 py-2">CA Facturés</th>
                <th className="text-left font-medium px-3 py-2">Commission facturable</th>
                <th className="text-left font-medium px-3 py-2">Commission Réglée</th>
                <th className="text-left font-medium px-3 py-2">CA Facturés Prévisionnel</th>
                <th className="text-left font-medium px-3 py-2">Commission Prévisionnel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r, idx) => (
                <tr
                  key={`${r.user}-${idx}`}
                  className={idx % 2 === 1 ? "bg-indigo-100" : "bg-white"}
                >
                  <td className="px-3 py-2 text-sky-700 font-medium whitespace-nowrap">
                    {r.user}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {r.dossiersFactures ?? 0} dossier(s)
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {r.dossiersEnCours ?? 0} dossier(s)
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{euro(r.caFactures)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{euro(r.commFacturable)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{euro(r.commReglee)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{euro(r.caPrev)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{euro(r.commPrev)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 text-[13px] text-slate-700 px-1">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span>
              <span className="font-semibold">Total utilisateurs:</span> {totals.users} utilisateur(s)
            </span>
            <span>
              <span className="font-semibold">Total des dossiers facturés:</span>{" "}
              {totals.dossiersFactures} dossier(s)
            </span>
            <span>
              <span className="font-semibold">Total des dossiers en cours:</span>{" "}
              {totals.dossiersEnCours} dossier(s)
            </span>
            <span>
              <span className="font-semibold">Total CA Facturés:</span> {euro(totals.caFactures)}
            </span>
            <span>
              <span className="font-semibold">Total Commission Facturable:</span>{" "}
              {euro(totals.commFacturable)}
            </span>
            <span>
              <span className="font-semibold">Total Commission Réglée:</span>{" "}
              {euro(totals.commReglee)}
            </span>
            <span>
              <span className="font-semibold">Total CA Facturés Prévisionnel:</span>{" "}
              {euro(totals.caPrev)}
            </span>
            <span>
              <span className="font-semibold">Total Commission Prévisionnel:</span>{" "}
              {euro(totals.commPrev)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
