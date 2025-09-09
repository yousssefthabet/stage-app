import React, { useMemo, useState } from "react";

export default function MandatsTable() {
  const data = [
    { source: "Direct", detail: "Ancien client",        compte: "AUBERT DE SCEPEY, Matthias", statut: "Signé",                     honoraires: 7500, etat: "Instruction" },
    { source: "Direct", detail: "Relation personnelle", compte: "SAYAH Sabrina",               statut: "Lien de signature envoyé", honoraires: 1500, etat: "Instruction" },
    { source: "Apporteur", detail: "ORBATTI Thibaud",   compte: "ARNAULT Claire",              statut: "Signé",                     honoraires: 2000, etat: "Instruction" },
    { source: "Direct", detail: "Ancien client",        compte: "CAGLUS Maxime",               statut: "Signé",                     honoraires: 2000, etat: "Envoyé banque" },
    { source: "Apport entrant", detail: "Web",          compte: "ARUTYUNYAN Anzhela",          statut: "Signé",                     honoraires: 1500, etat: "Instruction" },
    { source: "Direct", detail: "Relation personnelle", compte: "VINCENT Mathilde",            statut: "Signé",                     honoraires: 2500, etat: "Instruction" },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 8;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const currentRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [page, data]);

  const fmtEuro0 = (n:number) =>
    n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const fmtEuro2 = (n:number) =>
    n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

  const totals = useMemo(() => {
    const totalHonoraires = data.reduce((s, r) => s + (r.honoraires || 0), 0);
    const avgHonoraires = data.length ? totalHonoraires / data.length : 0;

    const mandatEnvoye = data.filter((r) => /envoy/i.test(r.statut)).length; 
    const mandatRecu = data.filter((r) => /sign|reç/i.test(r.statut)).length; 
    const taux = mandatEnvoye ? (mandatRecu / mandatEnvoye) * 100 : 0;

    return { avgHonoraires, mandatEnvoye, mandatRecu, taux };
  }, [data]);

  return (
    <div className="px-7 pb-8 max-w-[83rem] mx-auto">
      <div className="rounded-lg border border-white shadow-sm overflow-hidden bg-white">
        <div className="px-4 py-3 text-md text-gray-900 border-b border-white">
          Lien de signature envoyé
        </div>

        <div className="max-w-[75rem] mx-auto overflow-x-auto rounded-md">
          <table className="min-w-full text-[13px]">
            <thead className="bg-gray-200">
              <tr className="text-gray-600">
                <th className="px-4 py-2 text-left font-medium">Source</th>
                <th className="px-4 py-2 text-left font-medium">Détails source</th>
                <th className="px-4 py-2 text-left font-medium">Nom du compte</th>
                <th className="px-4 py-2 text-left font-medium">Statuts</th>
                <th className="px-4 py-2 text-right font-medium">Honoraires</th>
                <th className="px-4 py-2 text-left font-medium">État du dossier</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.map((r, i) => (
                <tr
                  key={i}
                  className={[
                    i === 0 ? "bg-cyan-50" : "",
                    i % 2 === 1 ? "bg-gray-50/60" : "bg-white",
                    "hover:bg-cyan-50/70 transition-colors",
                  ].join(" ")}
                >
                  <td className="px-4 py-2 whitespace-nowrap text-gray-800">{r.source}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-600">{r.detail}</td>
                  <td className="px-4 py-2 whitespace-nowrap font-medium">
                    <span className="text-cyan-700 hover:underline cursor-pointer">
                      {r.compte}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-800">{r.statut}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-right tabular-nums text-gray-800">
                    {fmtEuro0(r.honoraires)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-800">{r.etat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---- TOTAL summary strip (under the table) ---- */}
        <div className="px-8 py-3 border-t border-gray-200">
          <div className="text-xs text-gray-700">
            <div className="font-semibold text-cyan-700 mb-1">Total</div>
            <div className="space-x-2">
              <span>
                Moyenne honoraires : <span className="font-medium">{fmtEuro2(totals.avgHonoraires)}</span>
              </span>
              <span>|</span>
              <span>
                Mandat envoyé : <span className="font-medium">{totals.mandatEnvoye}</span>
              </span>
              <span>|</span>
              <span>
                Mandat reçu : <span className="font-medium">{totals.mandatRecu}</span>
              </span>
              <span>|</span>
              <span>
                Taux de transformation{" "}
                <span className="font-medium">
                  {totals.taux.toFixed(2).replace(".", ",")} %
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-center gap-2 text-sm">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-8 w-8 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40"
              disabled={page === 1}
            >
              ‹
            </button>
            <span className="px-3 py-1 rounded bg-cyan-500 text-white">{page}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-8 w-8 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40"
              disabled={page === totalPages}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
