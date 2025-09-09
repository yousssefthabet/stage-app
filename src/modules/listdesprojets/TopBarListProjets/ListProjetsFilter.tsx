"use client";

import React, { useState } from "react";

export default function MandatsFilter({ onApply }) {
  const initial = {
    provenance: "",
    etatProjet: "",
    etat: "",
    etape: "",
    type: "",
    assignee: "",
    faisabilite: "",
    statutOccupation: "",
    localisation: "",
    backoffice: "",
    etatDossier: "",
    statusMandat: "",
  };

  const [filters, setFilters] = useState(initial);
  const update = (k, v) => {
  setFilters((f) => ({ ...f, [k]: v }));
};

  const wrapper =
    "relative md:col-span-1"; // each field container
  const floatLabel =
    "absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold";
  const inputCls =
    "w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500";

  return (
    <div className="bg-white rounded-md border border-cyan-700 px-4 py-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 1 */}
        <div className={wrapper}>
          <div className={floatLabel}>Provenance</div>
          <input
            value={filters.provenance}
            onChange={(e) => update("provenance", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* 2 */}
        <div className={wrapper}>
          <div className={floatLabel}>État du projet</div>
          <input
            value={filters.etatProjet}
            onChange={(e) => update("etatProjet", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* 3 */}
        <div className={wrapper}>
          <div className={floatLabel}>***État</div>
          <input
            value={filters.etat}
            onChange={(e) => update("etat", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* 4 */}
        <div className={wrapper}>
          <div className={floatLabel}>Étape</div>
          <input
            value={filters.etape}
            onChange={(e) => update("etape", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* 5 */}
        <div className={wrapper}>
          <div className={floatLabel}>Type</div>
          <input
            value={filters.type}
            onChange={(e) => update("type", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* 6 */}
        <div className={wrapper}>
          <div className={floatLabel}>Assignée à</div>
          <input
            value={filters.assignee}
            onChange={(e) => update("assignee", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* 7 */}
        <div className={wrapper}>
          <div className={floatLabel}>Faisabilité</div>
          <input
            value={filters.faisabilite}
            onChange={(e) => update("faisabilite", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* 8 */}
        <div className={wrapper}>
          <div className={floatLabel}>Statut d’occupation</div>
          <input
            value={filters.statutOccupation}
            onChange={(e) => update("statutOccupation", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* 9 */}
        <div className={wrapper}>
          <div className={floatLabel}>Localisation</div>
          <input
            value={filters.localisation}
            onChange={(e) => update("localisation", e.target.value)}
            placeholder="Ville, Département, Région ..."
            className={inputCls}
          />
        </div>

        {/* 10 */}
        <div className={wrapper}>
          <div className={floatLabel}>Backoffice</div>
          <input
            value={filters.backoffice}
            onChange={(e) => update("backoffice", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* 11 */}
        <div className={wrapper}>
          <div className={floatLabel}>État dossier</div>
          <input
            value={filters.etatDossier}
            onChange={(e) => update("etatDossier", e.target.value)}
            className={inputCls}
          />
        </div>

        {/* 12 */}
        <div className={wrapper}>
          <div className={floatLabel}>Status mandat</div>
          <input
            value={filters.statusMandat}
            onChange={(e) => update("statusMandat", e.target.value)}
            className={inputCls}
          />
        </div>
      </div>
    </div>
  );
}
