"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  FiTrash2,
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";
import { GrPowerCycle } from "react-icons/gr";

/* ---------- types ---------- */
export type CorbeilleRow = {
  reference: string;
  receptionDate: string; // "YYYY-MM-DD HH:mm:ss"
  client: string;
  phone: string;
  email: string;
  type: string;
  source: string;
};

type Props = {
  rows?: CorbeilleRow[];
  onView?: (row: CorbeilleRow) => void;
  onDelete?: (row: CorbeilleRow) => void;
};

/* ---------- component ---------- */
export default function CorbeilleTable({
  rows: rowsProp,
  onView,
  onDelete,
}: Props) {
  // demo data (typed)
  const demo: CorbeilleRow[] = useMemo(
    () =>
      Array.from({ length: 47 }).map((_, i) => ({
        reference: `2025-${3305 - i}`,
        receptionDate: new Date(2025, 6, 28 + (i % 5), 10 + (i % 8), 12, 32)
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        client: [
          "PHION NOEL et GISELE",
          "DSDGSDGSDGDSGDSG",
          "BOUZID Ahmed",
          "MOKHTARI Anissa",
          "TONDEUX Sabrina",
          "ALCAN Marc-Anthony",
        ][i % 6],
        phone: ["074762580", "0123456789", "0713866789", "0791866099"][i % 4],
        email: [
          "noelphion@sf.fr",
          "boulnedhoubi@yahoo.fr",
          "boulnedhoubi@gmail.com",
          "solara.dahmani@gmail.com",
          "sabrinatondeux09@gmail.com",
          "marc1acan130@icloud.com",
        ][i % 6],
        type: "Achat ancien sans travaux",
        source: ["Direct", "Apporteur", "Appel entrant"][i % 3],
      })),
    []
  );

  const data = rowsProp?.length ? rowsProp : demo;

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(15);

  const pageCount = Math.max(1, Math.ceil(data.length / pageSize));

  // keep page within bounds when data/pageSize changes
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), pageCount));
  }, [pageCount]);

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  const goFirst = () => setPage(1);
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(pageCount, p + 1));
  const goLast = () => setPage(pageCount);
  const go = (n: number) => setPage(n);

  const cell = "px-3 py-2 whitespace-nowrap text-sm text-slate-700";
  const head = "px-3 py-2 text-center text-sm font-semibold text-white bg-[#0a8ea2]";

  // numbered buttons window
  const maxBtns = 5;
  const startBtn = Math.max(1, page - Math.floor(maxBtns / 2));
  const endBtn = Math.min(pageCount, startBtn + maxBtns - 1);
  const btns = Array.from({ length: endBtn - startBtn + 1 }, (_, i) => startBtn + i);

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-md border border-cyan-100">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="divide-x divide-white/30">
              <th className={head}>Référence du dossier</th>
              <th className={head}>Date de réception</th>
              <th className={head}>Client</th>
              <th className={head}>Numéro Téléphone</th>
              <th className={head}>Email</th>
              <th className={head}>Type</th>
              <th className={head}>Source</th>
              <th className={`${head} text-center`}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((r, idx) => (
              <tr key={`${r.reference}-${idx}`} className={idx % 2 ? "bg-[#eef8fb]" : "bg-white"}>
                <td className={`${cell} font-medium text-cyan-900`}>{r.reference}</td>
                <td className={cell}>{r.receptionDate}</td>
                <td className={cell}>{r.client}</td>
                <td className={cell}>{r.phone}</td>
                <td className={`${cell} max-w-[260px] truncate`} title={r.email}>
                  {r.email}
                </td>
                <td className={`${cell} max-w-[260px] truncate`} title={r.type}>
                  {r.type}
                </td>
                <td className={cell}>{r.source}</td>
                <td className={cell}>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onView?.(r)}
                      className="h-6 w-6 rounded-full bg-cyan-600 hover:bg-cyan-700 grid place-items-center"
                      title="Voir"
                    >
                      <GrPowerCycle className="text-white text-[12px]" />
                    </button>
                    <button
                      onClick={() => onDelete?.(r)}
                      className="h-6 w-6 rounded-full bg-rose-600 hover:bg-rose-700 grid place-items-center"
                      title="Supprimer"
                    >
                      <FiTrash2 className="text-white text-[12px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {pageData.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-sm text-slate-500 py-8">
                  Aucun élément trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-between gap-4 mt-3">
        <div className="flex items-center gap-1">
          <button
            onClick={goFirst}
            disabled={page === 1}
            className="h-8 w-8 grid place-items-center rounded-full border border-cyan-300 text-cyan-700 disabled:opacity-40"
            title="Première page"
          >
            <FiChevronsLeft />
          </button>
          <button
            onClick={goPrev}
            disabled={page === 1}
            className="h-8 w-8 grid place-items-center rounded-full border border-cyan-300 text-cyan-700 disabled:opacity-40"
            title="Précédent"
          >
            <FiChevronLeft />
          </button>

          {startBtn > 1 && (
            <>
              <button
                onClick={() => go(1)}
                className="h-8 w-8 rounded-full border border-cyan-300 text-cyan-700"
              >
                1
              </button>
              <span className="px-1 text-slate-500">…</span>
            </>
          )}

          {btns.map((n) => (
            <button
              key={n}
              onClick={() => go(n)}
              className={`h-8 w-8 rounded-full border ${
                n === page ? "bg-cyan-600 text-white border-cyan-600" : "border-cyan-300 text-cyan-700"
              }`}
            >
              {n}
            </button>
          ))}

          {endBtn < pageCount && (
            <>
              <span className="px-1 text-slate-500">…</span>
              <button
                onClick={() => go(pageCount)}
                className="h-8 w-8 rounded-full border border-cyan-300 text-cyan-700"
              >
                {pageCount}
              </button>
            </>
          )}

          <button
            onClick={goNext}
            disabled={page === pageCount}
            className="h-8 w-8 grid place-items-center rounded-full border border-cyan-300 text-cyan-700 disabled:opacity-40"
            title="Suivant"
          >
            <FiChevronRight />
          </button>
          <button
            onClick={goLast}
            disabled={page === pageCount}
            className="h-8 w-8 grid place-items-center rounded-full border border-cyan-300 text-cyan-700 disabled:opacity-40"
            title="Dernière page"
          >
            <FiChevronsRight />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Éléments par page</span>
          <select
            value={pageSize}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="h-8 border border-cyan-500/70 rounded-md px-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            {[10, 15, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
