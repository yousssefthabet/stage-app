import React, { useState, useMemo } from "react";

export default function PretsTable() {
  const data = [
    { dateEnvoi: "2025-08-01", source: "Direct",   nomCompte: "MOHAMED Moussa",  detailSource: "Relation personnelle", dateCompromis: "2025-05-23", conditions: "2025-07-30", signatureNotaire: "2025-08-30", etatDDP: "Accordée",   etatDossier: "Abandon" },
    { dateEnvoi: "2025-08-05", source: "Apporteur",nomCompte: "DANELLE BAYEF",   detailSource: "Relation personnelle", dateCompromis: "2025-07-09", conditions: "2025-09-08", signatureNotaire: "2025-10-02", etatDDP: "DDP envoyé", etatDossier: "Envoyé banque" },
    { dateEnvoi: "2025-08-10", source: "Direct",   nomCompte: "VINGERT Mathilde",detailSource: "Relation personnelle", dateCompromis: "2025-07-30", conditions: "2025-09-30", signatureNotaire: "2025-10-30", etatDDP: "DDP envoyé", etatDossier: "Envoyé banque" },
    { dateEnvoi: "2025-08-11", source: "Agence",   nomCompte: "Compte B",        detailSource: "Détail B",             dateCompromis: "2025-08-22", conditions: "Oui",        signatureNotaire: "Non",        etatDDP: "Reçu",       etatDossier: "Terminé" },
    { dateEnvoi: "2025-08-12", source: "Banque",   nomCompte: "Compte A",        detailSource: "Détail A",             dateCompromis: "2025-08-25", conditions: "Aucune",     signatureNotaire: "Oui",        etatDDP: "Envoyé",     etatDossier: "En cours" },
    { dateEnvoi: "2025-08-13", source: "Agence",   nomCompte: "Compte C",        detailSource: "Détail C",             dateCompromis: "2025-08-29", conditions: "Oui",        signatureNotaire: "Oui",        etatDDP: "Reçu",       etatDossier: "Terminé" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15); // default 15 like screenshot

  const totalRows = data.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));

  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [currentPage, rowsPerPage, data]);

  const goToPage = (p: number) => p >= 1 && p <= totalPages && setCurrentPage(p);

  const onChangeRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const startIndex = totalRows === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, totalRows);

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

        {/* Footer controls like the screenshot */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm">
          {/* left: total count */}
          <div className="text-cyan-700">
            Total dossiers : <span className="underline">{totalRows}</span>
          </div>

          {/* center: pager */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40"
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
              className="h-8 w-8 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              aria-label="Page suivante"
            >
              ›
            </button>
          </div>

          {/* right: elements per page */}
          <div className="flex items-center gap-2 text-slate-700">
            <span className="whitespace-nowrap">Éléments par page</span>
            <select
              value={rowsPerPage}
              onChange={onChangeRowsPerPage}
              className="h-8 min-w-[70px] rounded border border-cyan-300 bg-white px-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            >
              {[5, 10, 15, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
<hr className="text-gray-200 py-1"/>
        {/* Totals (left as static placeholders) */}
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
