"use client";


import React, { useEffect, useMemo, useState } from "react";
import { IoMdCloudDownload } from "react-icons/io";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

/* ---------- types ---------- */
type Row = {
  num: string;
  nature: string;
  courtier: string;
  date: string;      // ISO (yyyy-mm-dd) in your demo
  ttc: number;
  restant: number;
  rejet: string;
  regleeLe: string;
  mode: string;
};

type HeaderState = {
  montantHT: string;
  dateEnvoi: string;
  datePrev: string;
  solde: string;
};

type Reglement = {
  montant: string;
  rejet: "Non" | "Oui" | string;
  mode: "Sepa" | "Virement" | "CB" | "Chèque" | string;
  regleLe: string;
  echeance: string;
  numChq: string;
};

type ReglementPayload = { header: HeaderState; regs: Reglement[] };

type ReglementModalProps = {
  open: boolean;
  row: Row | null;
  onClose: () => void;
  onConfirm?: (payload: ReglementPayload) => void;
};

/* ---------- utils ---------- */
const EUR = (n?: number | null): string =>
  ((n ?? 0).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " €");

/* ---------- demo data ---------- */
const ROWS: Row[] = [
  { num: "F23-131", nature: "Abonnement", courtier: "DESMAZON Christelle", date: "2023-08-01", ttc: 213.6, restant: 0, rejet: "-", regleeLe: "2023-08-05", mode: "Sepa" },
  { num: "F23-363", nature: "Abonnement", courtier: "DESMAZON Christelle", date: "2023-09-12", ttc: 213.6, restant: 0, rejet: "-", regleeLe: "2023-09-16", mode: "Virement" },
  { num: "F23-443", nature: "Abonnement", courtier: "DESMAZON Christelle", date: "2023-10-05", ttc: 213.6, restant: 0, rejet: "-", regleeLe: "2023-10-11", mode: "Virement" },
  { num: "F23-487", nature: "Abonnement", courtier: "DESMAZON Christelle", date: "2023-11-06", ttc: 213.6, restant: 0, rejet: "-", regleeLe: "2023-11-09", mode: "Virement" },
  { num: "F23-478", nature: "Abonnement", courtier: "DESMAZON Christelle", date: "2023-12-06", ttc: 213.6, restant: 0, rejet: "-", regleeLe: "2023-12-12", mode: "Virement" },
  { num: "112023052006", nature: "Production personnelle", courtier: "DESMAZON Christelle", date: "2024-02-27", ttc: 1250, restant: 0, rejet: "-", regleeLe: "2024-03-02", mode: "Virement" },
  { num: "F24-16", nature: "Abonnement", courtier: "DESMAZON Christelle", date: "2024-03-01", ttc: 213.6, restant: 0, rejet: "-", regleeLe: "2024-03-11", mode: "Sepa" },
  { num: "Prism Club 1120230520004", nature: "MLM", courtier: "DESMAZON Christelle", date: "2024-03-11", ttc: 1017.92, restant: 0, rejet: "-", regleeLe: "2024-03-21", mode: "Virement" },
  { num: "Prism Club 1120230520004", nature: "MLM", courtier: "DESMAZON Christelle", date: "2024-09-11", ttc: 500, restant: 0, rejet: "-", regleeLe: "2024-09-21", mode: "Virement" },
  { num: "Prism Club 1120230520005", nature: "MLM", courtier: "DESMAZON Christelle", date: "2024-03-11", ttc: 172.5, restant: 0, rejet: "-", regleeLe: "2023-12-21", mode: "Virement" },
];

/* ---------- small floating label wrapper ---------- */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
        {label}
      </div>
      {children}
    </div>
  );
}

/* ---------- modal ---------- */
function ReglementModal({ open, row, onClose, onConfirm }: ReglementModalProps) {
  const [header, setHeader] = useState<HeaderState>({
    montantHT: "",
    dateEnvoi: "",
    datePrev: "",
    solde: "",
  });

  const [regs, setRegs] = useState<Reglement[]>([
    { montant: "", rejet: "Non", mode: "Sepa", regleLe: "", echeance: "", numChq: "" },
  ]);

  useEffect(() => {
    if (!row) return;
    setHeader({
      montantHT: String(row.ttc ?? ""),
      dateEnvoi: row.date ?? "",
      datePrev: "",
      solde: String(row.restant ?? 0),
    });
    setRegs([
      {
        montant: String(row.ttc ?? ""),
        rejet: "Non",
        mode: (row.mode as Reglement["mode"]) ?? "Sepa",
        regleLe: row.regleeLe ?? "",
        echeance: "",
        numChq: "",
      },
    ]);
  }, [row]);

  const ctrl =
    "w-full h-9 border border-cyan-400 rounded px-3 text-sm bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-cyan-600";

  const addReg = () =>
    setRegs((a) => [
      ...a,
      { montant: "", rejet: "Non", mode: "Sepa", regleLe: "", echeance: "", numChq: "" },
    ]);

  const removeReg = (i: number) =>
    setRegs((a) => (a.length > 1 ? a.filter((_, idx) => idx !== i) : a));

  const up = (i: number, k: keyof Reglement, v: string) =>
    setRegs((a) => a.map((r, idx) => (idx === i ? { ...r, [k]: v } : r)));

  if (!open || !row) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-10 bg-black/40">
      <div className="w-full max-w-3xl rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-cyan-700 text-white px-5 py-3 flex items-center justify-between">
          <h3 className="font-semibold">Modification règlements</h3>
          <button onClick={onClose} className="text-white/90 hover:text-white text-xl leading-none">×</button>
        </div>

        {/* Body */}
        <div className="bg-white px-5 py-5 space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Montant HT*">
              <input
                value={header.montantHT}
                onChange={(e) => setHeader({ ...header, montantHT: e.target.value })}
                className={ctrl}
              />
            </Field>
            <Field label="Date envoie de facture">
              <input
                type="date"
                value={header.dateEnvoi}
                onChange={(e) => setHeader({ ...header, dateEnvoi: e.target.value })}
                className={ctrl}
              />
            </Field>
            <Field label="Date prévisionnelle">
              <input
                type="date"
                value={header.datePrev}
                onChange={(e) => setHeader({ ...header, datePrev: e.target.value })}
                className={ctrl}
              />
            </Field>
            <Field label="Solde">
              <input
                value={header.solde}
                onChange={(e) => setHeader({ ...header, solde: e.target.value })}
                className={ctrl}
              />
            </Field>
          </div>

          <div className="flex">
            <button type="button" className="ml-auto bg-cyan-600 hover:bg-cyan-700 text-white h-9 px-4 rounded-full">
              Règlement définitif
            </button>
          </div>

          {/* Règlements blocks */}
          {regs.map((r, i) => (
            <div key={i} className="space-y-3">
              <div className="h-8 bg-cyan-700 rounded-sm text-white px-2 flex items-center text-sm font-semibold">
                <span className="inline-flex items-center gap-1">
                  <span className="underline underline-offset-2">Règlements {i + 1}</span>
                  {i === 0 ? (
                    <button
                      type="button"
                      onClick={addReg}
                      className="p-0.5 leading-none hover:opacity-90"
                      aria-label="Ajouter un règlement"
                    >
                      <FaPlusCircle className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeReg(i)}
                      className="p-0.5 leading-none hover:opacity-90"
                      aria-label={`Supprimer le règlement ${i + 1}`}
                    >
                      <FaMinusCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Montant*">
                  <input value={r.montant} onChange={(e) => up(i, "montant", e.target.value)} className={ctrl} />
                </Field>
                <Field label="Rejet de prélèvement">
                  <select value={r.rejet} onChange={(e) => up(i, "rejet", e.target.value)} className={ctrl}>
                    <option>Non</option>
                    <option>Oui</option>
                  </select>
                </Field>
                <Field label="Mode">
                  <select value={r.mode} onChange={(e) => up(i, "mode", e.target.value)} className={ctrl}>
                    <option>Sepa</option>
                    <option>Virement</option>
                    <option>CB</option>
                    <option>Chèque</option>
                  </select>
                </Field>
                <Field label="Réglé le">
                  <input type="date" value={r.regleLe} onChange={(e) => up(i, "regleLe", e.target.value)} className={ctrl} />
                </Field>
                <Field label="Échéance">
                  <input type="date" value={r.echeance} onChange={(e) => up(i, "echeance", e.target.value)} className={ctrl} />
                </Field>
                <Field label="N° Chq, etc.">
                  <input value={r.numChq} onChange={(e) => up(i, "numChq", e.target.value)} className={ctrl} />
                </Field>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-white px-5 pb-5 flex items-center justify-between">
          <button onClick={onClose} className="text-cyan-700 hover:underline">Fermer</button>
          <button
            onClick={() => onConfirm?.({ header, regs })}
            className="bg-cyan-600 hover:bg-cyan-700 text-white h-9 px-5 rounded-full"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- table ---------- */
export default function FactureCourtiersTable() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selected, setSelected] = useState<Row | null>(null);

  const total = ROWS.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const rows = useMemo<Row[]>(() => {
    const start = (page - 1) * pageSize;
    return ROWS.slice(start, start + pageSize);
  }, [page, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <>
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-[13px]">
            <thead className="bg-cyan-700 text-white">
              <tr className="[&>th]:px-3 [&>th]:py-2.5 [&>th]:font-medium divide-x divide-white/70">
                <th className="text-center">Num Facture</th>
                <th className="text-center">Nature</th>
                <th className="text-center">Courtier</th>
                <th className="text-center">Date de facture</th>
                <th className="text-center">TTC</th>
                <th className="text-center">Restant dû</th>
                <th className="text-center">Frais de rejet</th>
                <th className="text-center">Réglée le</th>
                <th className="text-center">Mode règlement</th>
                <th className="text-center w-24">Action</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.num + i}
                  className={[
                    i % 2 === 0 ? "bg-white" : "bg-cyan-50/50",
                    "hover:bg-cyan-50 transition-colors",
                  ].join(" ")}
                >
                  <td className="px-3 py-2 whitespace-nowrap text-center">
                    <button
                      type="button"
                      onClick={() => setSelected(r)}
                      className="text-cyan-700 font-medium underline-offset-2 hover:underline focus:underline outline-none"
                      title="Voir/éditer les règlements"
                    >
                      {r.num}
                    </button>
                  </td>

                  <td className="px-3 py-2 whitespace-nowrap text-center text-gray-800">{r.nature}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-center text-cyan-700">{r.courtier}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-center text-gray-800">{r.date}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-center font-medium text-gray-800">{EUR(r.ttc)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-center text-gray-800">{EUR(r.restant)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-center text-gray-800">{r.rejet}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-center text-gray-800">{r.regleeLe}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-center text-gray-800">{r.mode}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        title="Télécharger"
                        className="h-6 w-6 rounded-full bg-white text-black ring-1 ring-black/30 grid place-items-center hover:bg-cyan-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <IoMdCloudDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-3 py-3 border-t border-cyan-100">
          <div className="text-[12px] text-cyan-700">
            Total factures : <span className="font-medium">{total}</span>
          </div>

          {/* 3-button pagination: ‹ [page] › */}
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

          {/* Page size (right) */}
          <label className="flex items-center gap-2 text-[12px] text-cyan-700">
            <span>Éléments par page</span>
            <select
              value={pageSize}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPageSize(val);
                setPage(1);
              }}
              className="h-8 text-sm border border-cyan-400 rounded px-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-cyan-600"
            >
              {[5, 10, 15, 25, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Modal mount */}
      <ReglementModal
        open={!!selected}
        row={selected}
        onClose={() => setSelected(null)}
        onConfirm={(payload) => {
          console.log("Confirm with:", payload);
          setSelected(null);
        }}
      />
    </>
  );
}
