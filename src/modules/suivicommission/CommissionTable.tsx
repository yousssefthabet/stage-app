import React, { useMemo } from "react";

function formatMoney(v:number) {
  if (v == null) return "0 €";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(v);
}

export default function CommissionTable() {

  const rows = [
    {
      id: 1,
      source: "Apporteur",
      detailSource: "LAGOSANTO Alexia",
      etatDossier: "Concurrence prospect",
      commercial: "Sandra GONCALVES",
      nomDossier: "DUBOIS Guy",
      taux: 0,
      ca: 2000,
      commissionDirecte: 0,
      statut: "Payé",
    },
    {
      id: 2,
      source: "Formulaire",
      detailSource: "Site Web",
      etatDossier: "Nouveau",
      commercial: "Paul Martin",
      nomDossier: "MARTIN Anne",
      taux: 1.5,
      ca: 3500,
      commissionDirecte: 52.5,
      statut: "En attente",
    },
    {
      id: 3,
      source: "Direct",
      detailSource: "Salon pro",
      etatDossier: "En cours",
      commercial: "Lucie Henry",
      nomDossier: "BERNARD Léa",
      taux: 2,
      ca: 12000,
      commissionDirecte: 240,
      statut: "Relancé",
    },
    {
      id: 4,
      source: "Parrainage",
      detailSource: "Client existant",
      etatDossier: "En cours",
      commercial: "Nadia Roux",
      nomDossier: "MORIN Claire",
      taux: 1.2,
      ca: 5900,
      commissionDirecte: 70.8,
      statut: "En attente",
    },
    {
      id: 5,
      source: "Appel entrant",
      detailSource: "Standard",
      etatDossier: "Accepté banque",
      commercial: "Hugo Petit",
      nomDossier: "GIRAUD Marc",
      taux: 0.8,
      ca: 8600,
      commissionDirecte: 68.8,
      statut: "Payé",
    },
    {
      id: 6,
      source: "Passage",
      detailSource: "Agence",
      etatDossier: "Refusé banque",
      commercial: "Alice Leroy",
      nomDossier: "ROBIN Eve",
      taux: 0,
      ca: 0,
      commissionDirecte: 0,
      statut: "Clôturé",
    },
  ];

  const totals = useMemo(() => {
    const count = rows.length;
    const ca = rows.reduce((s, r) => s + (Number(r.ca) || 0), 0);
    const commission = rows.reduce((s, r) => s + (Number(r.commissionDirecte) || 0), 0);
    return { count, ca, commission };
  }, [rows]);

  return (
    <div className="px-10 mt-6">
      <div className="overflow-x-auto rounded-md shadow-sm border border-gray-200">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-[#0E7490] text-white">
            <tr className="text-lef divide-x divide-white/70">
              <th className="px-3 py-2 font-semibold">#</th>
              <th className="px-3 py-2 font-semibold">Source</th>
              <th className="px-3 py-2 font-semibold">Détails source</th>
              <th className="px-3 py-2 font-semibold">État du dossier</th>
              <th className="px-3 py-2 font-semibold">Commercial</th>
              <th className="px-3 py-2 font-semibold">Nom de dossier</th>
              <th className="px-3 py-2 font-semibold">Taux (%)</th>
              <th className="px-3 py-2 font-semibold">CA affecté</th>
              <th className="px-3 py-2 font-semibold">Commission directe</th>
              <th className="px-3 py-2 font-semibold">Statut</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-3 py-6 text-center text-gray-500">
                  Aucune ligne
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={r.id ?? i} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-3 py-2">{i + 1}</td>
                  <td className="px-3 py-2">{r.source}</td>
                  <td className="px-3 py-2">{r.detailSource}</td>
                  <td className="px-3 py-2">{r.etatDossier}</td>
                  <td className="px-3 py-2">{r.commercial}</td>
                  <td className="px-3 py-2 underline text-teal-700">{r.nomDossier}</td>
                  <td className="px-3 py-2">{r.taux ?? 0} %</td>
                  <td className="px-3 py-2">{formatMoney(r.ca)}</td>
                  <td className="px-3 py-2">{formatMoney(r.commissionDirecte)}</td>
                  <td className="px-3 py-2">
                    <span className="inline-block px-2 py-0.5 text-xs rounded bg-cyan-100 text-cyan-700 border border-cyan-300">
                      {r.statut ?? "N/A"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
      <div className="text-sm text-gray-700 mt-3">
        <span className="mr-6">
          <span className="font-medium">Total</span>
        </span>
        <span className="mr-6">
          Nombre de dossier : <span className="font-semibold">{totals.count}</span>
        </span>
        <span className="mr-6">
          Montant CA Total : <span className="font-semibold">{formatMoney(totals.ca)}</span>
        </span>
        <span>
          Montant commission direct Total :{" "}
          <span className="font-semibold">{formatMoney(totals.commission)}</span>
        </span>
      </div>
    </div>
  );
}
