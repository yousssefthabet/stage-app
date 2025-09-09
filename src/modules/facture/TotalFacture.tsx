"use client";

import React from "react";

export default function TotalFacture() {
  // values (edit here)
  const honoraires = 29000;
  const commBancaires = 0;
  const dossiers = 12;

  const ca = honoraires + commBancaires;
  const fmt = (n) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" })
      .format(Number(n) || 0);

  const avgHon = dossiers ? honoraires / dossiers : 0;
  const avgCom = dossiers ? commBancaires / dossiers : 0;
  const avgDos = dossiers ? ca / dossiers : 0;

  return (
    <div className="text-[12px] text-gray-700 bg-white rounded-lg px-2 py-2 max-w-[79rem] mx-auto flex flex-wrap items-center gap-1 shadow-sm">
      <span className="whitespace-nowrap">Total Honoraires:</span>
      <span className="font-semibold text-gray-900">{fmt(honoraires)}</span>
      <span className="mx-1 text-gray-400">|</span>

      <span className="whitespace-nowrap">Total Comm. Bancaires:</span>
      <span className="font-semibold text-gray-900">{fmt(commBancaires)}</span>
      <span className="mx-1 text-gray-400">|</span>

      <span className="whitespace-nowrap">Total CA:</span>
      <span className="font-semibold text-gray-900">{fmt(ca)}</span>

      <span className="w-full" />

      <span className="whitespace-nowrap">Moyenne Honoraires:</span>
      <span className="font-semibold text-gray-900">{fmt(avgHon)}</span>
      <span className="mx-1 text-gray-400">|</span>

      <span className="whitespace-nowrap">Moyenne Comm. Bancaires:</span>
      <span className="font-semibold text-gray-900">{fmt(avgCom)}</span>
      <span className="mx-1 text-gray-400">|</span>

      <span className="whitespace-nowrap">Moyenne Dossier:</span>
      <span className="font-semibold text-gray-900">{fmt(avgDos)}</span>
    </div>
  );
}
