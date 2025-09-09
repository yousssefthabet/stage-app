"use client";


import React, { useEffect, useMemo, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";

const DEMO = [
  { ref: "2025-3364", date: "2025-08-21 20:57:49", client: "RAYLAUD Philippe",  phone: "0629095123", email: "philippe.raylaud@hotmail.com",   type: "Achat ancien sans travaux", source: "Apporteur" },
  { ref: "2025-3363", date: "2025-08-21 20:34:36", client: "GULSES Irma",       phone: "06 11 23 23 55", email: "irma.gulses@lafrance.fr",     type: "Achat ancien sans travaux", source: "Direct" },
  { ref: "2025-3362", date: "2025-08-21 19:44:22", client: "CECOLOU GUGUI ARMEL",phone:"0662774425",    email: "adouou@gmail.com",            type: "Achat ancien sans travaux", source: "Direct" },
  { ref: "2025-3361", date: "2025-08-21 18:29:42", client: "BARDON DAVID",      phone: "0647597284",   email: "david.bardon.nantes@gmail.com",type: "Achat ancien sans travaux", source: "Direct" },
  { ref: "2025-3360", date: "2025-08-21 18:09:11", client: "COLIN Camille",     phone: "0612338761",   email: "carriecolin2510@gmail.com",    type: "Achat ancien sans travaux", source: "Direct" },
  { ref: "2025-3359", date: "2025-08-21 08:30:11", client: "THOMAS Amina",      phone: "0801229036",   email: "amina.thomas26@live.fr",       type: "Achat ancien sans travaux", source: "Appel entrant" },
  { ref: "2025-3358", date: "2025-08-21 12:08:13", client: "MONTELD Doriane",   phone: "0796636764",   email: "dehanoromai250@gmail.com",     type: "Achat ancien sans travaux", source: "Direct" },
  { ref: "2025-3357", date: "2025-08-21 11:18:20", client: "MISSE PATRICK",     phone: "0691057077",   email: "patrissel@gmail.com",          type: "Achat ancien sans travaux", source: "Apporteur" },
  { ref: "2025-3356", date: "2025-08-21 12:27:10", client: "CISSE Oumare sadio",phone: "0797578880",   email: "sadiocb@hotmail.com",          type: "Achat ancien sans travaux", source: "Direct" },
  { ref: "2025-3355", date: "2025-08-21 10:33:50", client: "RUBBE Naia",        phone: "06 29 07 70 02",email:"naria.rubbe@yahoo.fr",          type: "Achat ancien sans travaux", source: "Direct" },
  { ref: "2025-3354", date: "2025-08-21 11:25:59", client: "SCORFF Renaud",     phone: "0684179622",   email: "renaudscorff@gmail.com",       type: "Achat ancien sans travaux", source: "Direct" },
  { ref: "2025-3353", date: "2025-08-21 10:55:32", client: "TARTARI Loic",      phone: "06 84 70 26 91",email:"loic.tartari@gmail.com",        type: "Achat ancien sans travaux", source: "Direct" },
  { ref: "2025-3352", date: "2025-08-21 09:11:12", client: "BORDENAVE Luc",     phone: "0664728497",   email: "luc.bordenave@hotm.fr",         type: "Achat ancien sans travaux", source: "2e Courtage" },
  { ref: "2025-3351", date: "2025-08-21 08:31:24", client: "KOVACEVIC Sabrina", phone: "06 87 09 33 22",email:"sabrina.kovacevic23@gmail.com",  type: "Achat ancien sans travaux", source: "Direct" },
  { ref: "2025-3350", date: "2025-08-21 08:27:16", client: "EL KAMALY Ibou",    phone: "0685196649",   email: "thouelkamily54@gmail.com",     type: "Achat ancien sans travaux", source: "Direct" },
  { ref: "2025-3351", date: "2025-08-21 08:31:24", client: "KOVACEVIC Sabrina", phone: "06 87 09 33 22",email:"sabrina.kovacevic23@gmail.com",  type: "Achat ancien sans travaux", source: "Direct" },
  { ref: "2025-3350", date: "2025-08-21 08:27:16", client: "EL KAMALY Ibou",    phone: "0685196649",   email: "thouelkamily54@gmail.com",     type: "Achat ancien sans travaux", source: "Direct" },
];

const SourceBadge = ({ value }) => {
  const map = {
    Direct: "bg-cyan-100 text-cyan-700",
    Apporteur: "bg-amber-100 text-amber-700",
    "2e Courtage": "bg-violet-100 text-violet-700",
    "Appel entrant": "bg-emerald-100 text-emerald-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] ${map[value] || "bg-gray-100 text-gray-700"}`}>
      {value}
    </span>
  );
};

export default function ListProjetsTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const total = DEMO.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const rows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return DEMO.slice(start, start + pageSize);
  }, [page, pageSize]);

  return (
    <div className="max-w-[90rem] mx-auto px-4">
      <div className="bg-white border-2 border-white overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-[13px]">
            <thead className="bg-cyan-700 text-white">
              <tr className="divide-x divide-white/30">
                <th className="px-3 py-2 text-center font-semibold">Référence du dossier</th>
                <th className="px-3 py-2 text-center font-semibold">Date de réception</th>
                <th className="px-3 py-2 text-center font-semibold">Client</th>
                <th className="px-3 py-2 text-center font-semibold">Numéro Téléphone</th>
                <th className="px-3 py-2 text-center font-semibold">Email</th>
                <th className="px-3 py-2 text-center font-semibold">Type</th>
                <th className="px-3 py-2 text-center font-semibold">Source</th>
                <th className="px-3 py-2 text-center font-semibold w-[120px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={`${r.ref}-${i}`}
                  className={`${i % 2 ? "bg-cyan-50/40" : "bg-white"} hover:bg-cyan-50 transition-colors border-b border-cyan-100`}
                >
                  <td className="px-3 py-2 text-gray-800">{r.ref}</td>
                  <td className="px-3 py-2 text-gray-800 whitespace-nowrap">{r.date}</td>
                  <td className="px-3 py-2">
                    <a className="text-cyan-700 hover:underline font-medium" href="#">
                      {r.client}
                    </a>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <a className="text-gray-800 hover:underline" href={`tel:${r.phone}`}>
                      {r.phone}
                    </a>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap max-w-[260px]">
                    <a
                      className="text-gray-800 hover:underline block truncate"
                      title={r.email}
                      href={`mailto:${r.email}`}
                    >
                      {r.email}
                    </a>
                  </td>
                  <td className="px-3 py-2 text-gray-800">{r.type}</td>
                  <td className="px-3 py-2">
                    <SourceBadge value={r.source} />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="h-7 w-7 grid place-items-center rounded-full bg-blue-600 text-white hover:bg-emerald-600"
                        title="Éditer"
                      >
                        <FaWallet size={14} />
                      </button>
                      <button
                        className="h-7 w-7 grid place-items-center rounded-full bg-rose-500 text-white hover:bg-rose-600"
                        title="Supprimer"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-3 bg-white">
          {/* Left: total */}
          <div className="text-sm text-cyan-700">
            <span className="font-semibold">Total dossiers :</span>{" "}
            <span className="underline decoration-cyan-600">{total}</span>
          </div>

          {/* Center: 3-button pagination (‹ 1 ›) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-9 w-9 rounded-md border border-gray-300 grid place-items-center text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              aria-label="Page précédente"
            >
              ‹
            </button>

            <button
              className="h-9 w-9 rounded-md bg-cyan-500 text-white grid place-items-center font-semibold shadow"
              disabled
            >
              {page}
            </button>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-9 w-9 rounded-md border border-gray-300 grid place-items-center text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              aria-label="Page suivante"
            >
              ›
            </button>
          </div>

          {/* Right: page size */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <span>Éléments par page</span>
            <select
              value={pageSize}
              onChange={(e) => {
                const v = Number(e.target.value);
                setPageSize(v);
                setPage(1);
              }}
              className="h-8 rounded border border-cyan-400 bg-white px-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              {[10, 15, 25, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
