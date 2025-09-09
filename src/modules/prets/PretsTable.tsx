import React, { useState, useMemo } from "react";

export default function PretsTable() {
  const data = [
    { dateEnvoi: "2025-08-01", source: "Direct", nomCompte: "MOHAMED Moussa", detailSource: "Relation personnelle", dateCompromis: "2025-05-23", conditions: "2025-07-30", signatureNotaire: "2025-08-30", etatDDP: "Accordée", etatDossier: "Abandon" },
    { dateEnvoi: "2025-08-05", source: "Apporteur", nomCompte: "DANELLE BAYEF", detailSource: "Relation personnelle", dateCompromis: "2025-07-09", conditions: "2025-09-08", signatureNotaire: "2025-10-02", etatDDP: "DDP envoyé", etatDossier: "Envoyé banque" },
    { dateEnvoi: "2025-08-10", source: "Direct", nomCompte: "VINGERT Mathilde", detailSource: "Relation personnelle", dateCompromis: "2025-07-30", conditions: "2025-09-30", signatureNotaire: "2025-10-30", etatDDP: "DDP envoyé", etatDossier: "Envoyé banque" },
    { dateEnvoi: "2025-08-11", source: "Agence", nomCompte: "Compte B", detailSource: "Détail B", dateCompromis: "2025-08-22", conditions: "Oui", signatureNotaire: "Non", etatDDP: "Reçu", etatDossier: "Terminé" },
    { dateEnvoi: "2025-08-12", source: "Banque", nomCompte: "Compte A", detailSource: "Détail A", dateCompromis: "2025-08-25", conditions: "Aucune", signatureNotaire: "Oui", etatDDP: "Envoyé", etatDossier: "En cours" },
    { dateEnvoi: "2025-08-13", source: "Agence", nomCompte: "Compte C", detailSource: "Détail C", dateCompromis: "2025-08-29", conditions: "Oui", signatureNotaire: "Oui", etatDDP: "Reçu", etatDossier: "Terminé" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [currentPage, data]);

  const goToPage = (p:number) => p >= 1 && p <= totalPages && setCurrentPage(p);

  return (
    <div className="px-5 py-6">
      <div className="rounded-lg border border-slate-200 shadow-sm overflow-hidden bg-white">
        <table className="min-w-full text-[13px] leading-5">
          <thead className="bg-gray-200 h-15">
            <tr className="text-slate-600">
              <th className="px-4 py-2 text-left font-medium">Date d'envoi</th>
              <th className="px-4 py-2 text-left font-medium">Source</th>
              <th className="px-4 py-2 text-left font-medium">Nom du compte</th>
              <th className="px-4 py-2 text-left font-medium">Détail source</th>
              <th className="px-4 py-2 text-left font-medium">Date du compromis</th>
              <th className="px-4 py-2 text-left font-medium">Conditions suspensive</th>
              <th className="px-4 py-2 text-left font-medium">Signature notaire</th>
              <th className="px-4 py-2 text-left font-medium">État de la DDP</th>
              <th className="px-4 py-2 text-left font-medium">État du dossier</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {currentRows.map((row, i) => (
              <tr
                key={i}
                className="odd:bg-white even:bg-indigo-50/50 hover:bg-indigo-100/60 transition-colors"
              >
                <td className="px-4 py-2 whitespace-nowrap text-slate-700">{row.dateEnvoi}</td>
                <td className="px-4 py-2 whitespace-nowrap text-slate-700">{row.source}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sky-700 font-medium">
                  {row.nomCompte}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-slate-700">
                  {row.detailSource}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-slate-700">
                  {row.dateCompromis}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-slate-700">
                  {row.conditions}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-slate-700">
                  {row.signatureNotaire}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-slate-700">{row.etatDDP}</td>
                <td className="px-4 py-2 whitespace-nowrap text-slate-700">{row.etatDossier}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 px-4 py-3 bg-white">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`h-8 w-8 rounded border ${
                currentPage === 1
                  ? "border-slate-200 text-slate-300 cursor-not-allowed"
                  : "border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
              aria-label="Page précédente"
            >
              ‹
            </button>
            <span className="px-3 h-8 flex items-center rounded bg-cyan-500 text-white text-sm">
              {currentPage}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`h-8 w-8 rounded border ${
                currentPage === totalPages
                  ? "border-slate-200 text-slate-300 cursor-not-allowed"
                  : "border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
              aria-label="Page suivante"
            >
              ›
            </button>
          </div>
        )}
        <div className="px-4 pb-4 text-sm text-slate-700">
          <p>
            Total Honoraires: <span className="font-semibold">0.00 €</span>
            <span className="mx-2 text-slate-300">|</span>
            Total Comm. Bancaires: <span className="font-semibold">0.00 €</span>
            <span className="mx-2 text-slate-300">|</span>
            Total CA: <span className="font-semibold">0.00 €</span>
          </p>
          <p>
            Moyenne Honoraires: <span className="font-semibold">0.00 €</span>
            <span className="mx-2 text-slate-300">|</span>
            Moyenne Comm. Bancaires: <span className="font-semibold">0.00 €</span>
            <span className="mx-2 text-slate-300">|</span>
            Moyenne Dossier: <span className="font-semibold">0.00 €</span>
          </p>
        </div>
      </div>
    </div>
  );
}
