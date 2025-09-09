"use client";
import React, { useState } from "react";

type Filters = {
  reference: string;
  receptionDate: string;
  client: string;
  phone: string;
  email: string;
  type: string;
  source: string;
  societe: string;
};

type CorbeilleFilterProps = {
  onApply?: (filters: Filters) => void;
};

export default function CorbeilleFilter({ onApply }: CorbeilleFilterProps) {
  const initial: Filters = {
    reference: "",
    receptionDate: "",
    client: "",
    phone: "",
    email: "",
    type: "",
    source: "",
    societe: "",
  };

  const [filters, setFilters] = useState<Filters>(initial);
  const update = (k: keyof Filters, v: string) =>
    setFilters((f) => ({ ...f, [k]: v }));

  const wrapper =
    "relative md:col-span-1";
  const floatLabel =
    "absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold";
  const inputCls =
    "w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500";

  return (
    <div className="bg-white rounded-md border border-cyan-700 px-4 py-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Référence du dossier */}
        <div className={wrapper}>
          <div className={floatLabel}>Référence du dossier</div>
          <input
            value={filters.reference}
            onChange={(e) => update("reference", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Date de réception */}
        <div className={wrapper}>
          <div className={floatLabel}>Date de réception</div>
          <input
            type="date"
            value={filters.receptionDate}
            onChange={(e) => update("receptionDate", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Client */}
        <div className={wrapper}>
          <div className={floatLabel}>Client</div>
          <input
            value={filters.client}
            onChange={(e) => update("client", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Numéro Téléphone */}
        <div className={wrapper}>
          <div className={floatLabel}>Numéro Téléphone</div>
          <input
            value={filters.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Email */}
        <div className={wrapper}>
          <div className={floatLabel}>Email</div>
          <input
            value={filters.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Type */}
        <div className={wrapper}>
          <div className={floatLabel}>Type</div>
          <input
            value={filters.type}
            onChange={(e) => update("type", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Source */}
        <div className={wrapper}>
          <div className={floatLabel}>Source</div>
          <input
            value={filters.source}
            onChange={(e) => update("source", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Société (if you need it later) */}
        <div className={wrapper}>
          <div className={floatLabel}>Société</div>
          <input
            value={filters.societe}
            onChange={(e) => update("societe", e.target.value)}
            className={inputCls}
          />
        </div>
      </div>
    </div>
  );
}
