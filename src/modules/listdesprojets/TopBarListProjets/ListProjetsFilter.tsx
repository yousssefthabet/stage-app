import React, { useState } from "react";

type Filters = {
  provenance: string;
  etatProjet: string;
  etat: string;
  etape: string;
  type: string;
  assignee: string;
  faisabilite: string;
  statutOccupation: string;
  localisation: string;
  backoffice: string;
  etatDossier: string;
  statusMandat: string;
};

type MandatsFilterProps = {
  onApply?: (filters: Filters) => void;
};

export default function MandatsFilter({ onApply }: MandatsFilterProps) {
  const initial: Filters = {
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

  const [filters, setFilters] = useState<Filters>(initial);

  const update = (k: keyof Filters, v: string) => {
    setFilters((f) => ({ ...f, [k]: v }));
  };

  return (
    <div className="bg-white rounded-md border border-cyan-700 px-4 py-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Provenance</div>
          <input
            value={filters.provenance}
            onChange={(e) => update("provenance", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">État du projet</div>
          <input
            value={filters.etatProjet}
            onChange={(e) => update("etatProjet", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">***État</div>
          <input
            value={filters.etat}
            onChange={(e) => update("etat", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Étape</div>
          <input
            value={filters.etape}
            onChange={(e) => update("etape", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Type</div>
          <input
            value={filters.type}
            onChange={(e) => update("type", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Assignée à</div>
          <input
            value={filters.assignee}
            onChange={(e) => update("assignee", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Faisabilité</div>
          <input
            value={filters.faisabilite}
            onChange={(e) => update("faisabilite", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Statut d’occupation</div>
          <input
            value={filters.statutOccupation}
            onChange={(e) => update("statutOccupation", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Localisation</div>
          <input
            value={filters.localisation}
            onChange={(e) => update("localisation", e.target.value)}
            placeholder="Ville, Département, Région ..."
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Backoffice</div>
          <input
            value={filters.backoffice}
            onChange={(e) => update("backoffice", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">État dossier</div>
          <input
            value={filters.etatDossier}
            onChange={(e) => update("etatDossier", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Status mandat</div>
          <input
            value={filters.statusMandat}
            onChange={(e) => update("statusMandat", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
}
