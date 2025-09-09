  "use client";

  import React, { useMemo, useState } from "react";

  const EUR = (n) =>
    n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

  const rows0 = [
    {
      num: "F25-437",
      nature: "Honoraires",
      dossier: "2025-014M",
      client: "PLANARD Raphaël",
      dateCrt: "2025-07-02",
      dateFac: "2025-07-08",
      echeance: "2025-08-08",
      regleLe: "2025-08-25",
      ttc: 2500,
      regle: 2500,
      mode: "CB",
      etat: "Réglé",
    },
    {
      num: "F25-438",
      nature: "Commissions",
      dossier: "2025-014N",
      client: "DURAND Léa",
      dateCrt: "2025-07-04",
      dateFac: "2025-07-09",
      echeance: "2025-08-09",
      regleLe: "",
      ttc: 6000,
      regle: 0,
      mode: "",
      etat: "Ouverte",
    },
    {
      num: "F25-439",
      nature: "Honoraires",
      dossier: "2025-015P",
      client: "MARTIN Karim",
      dateCrt: "2025-07-10",
      dateFac: "2025-07-11",
      echeance: "2025-08-11",
      regleLe: "2025-08-20",
      ttc: 2000,
      regle: 2000,
      mode: "Virement",
      etat: "Réglé",
    },
    {
      num: "F25-437",
      nature: "Honoraires",
      dossier: "2025-014M",
      client: "PLANARD Raphaël",
      dateCrt: "2025-07-02",
      dateFac: "2025-07-08",
      echeance: "2025-08-08",
      regleLe: "2025-08-25",
      ttc: 2500,
      regle: 2500,
      mode: "CB",
      etat: "Réglé",
    },
  ];

export default function FactureTable() { 
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const total = rows0.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const rows = useMemo(() => {
      const start = (page - 1) * pageSize;
      return rows0.slice(start, start + pageSize);
    }, [page, pageSize]);

    return (
      <div className="px-6 pb-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Top bar */}
          <div className="px-4 py-2 flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Factures émises
            </span>
            <label className="flex items-center gap-2 text-gray-600">
              <span>Éléments par page</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="h-8 text-sm border border-cyan-400 rounded px-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {[5, 10, 25, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-[13px]">
              <thead className="bg-gray-100">
                <tr className="text-cyan-700">
                  <th className="px-3 py-2 text-left font-medium">Numéro Facture</th>
                  <th className="px-3 py-2 text-left font-medium">Nature</th>
                  <th className="px-3 py-2 text-left font-medium">N° Dossier</th>
                  <th className="px-3 py-2 text-left font-medium">Client</th>
                  <th className="px-3 py-2 text-left font-medium">Date crt</th>
                  <th className="px-3 py-2 text-left font-medium">Date Facturation</th>
                  <th className="px-3 py-2 text-left font-medium">Échéance</th>
                  <th className="px-3 py-2 text-left font-medium">Réglé le</th>
                  <th className="px-3 py-2 text-right font-medium">Montant TTC</th>
                  <th className="px-3 py-2 text-right font-medium">Montant Réglé</th>
                  <th className="px-3 py-2 text-left font-medium">Mode paiement</th>
                  <th className="px-3 py-2 text-left font-medium">État</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={r.num + i}
                    className={[
                      i % 2 === 0 ? "bg-white" : "bg-cyan-50/40",
                      "hover:bg-cyan-50 transition-colors",
                    ].join(" ")}
                  >
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">{r.num}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">{r.nature}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">{r.dossier}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <a className="text-cyan-700 hover:underline font-medium" href="#">
                        {r.client}
                      </a>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">{r.dateCrt}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">{r.dateFac}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">{r.echeance}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">{r.regleLe || "-"}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-right font-medium text-gray-800">
                      {EUR(r.ttc)}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-right font-medium text-gray-800">
                      {EUR(r.regle)}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">{r.mode || "-"}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">{r.etat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
        </div>
      </div>
    );
  }
