import React, { useState } from "react";
import type { JSX } from "react/jsx-runtime";

type MandatsFilters = {
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

type Props = {
  onApply?: (filters: MandatsFilters) => void; // <- add this
};

export default function SuiviDocumentsFilter({ onApply }: Props): JSX.Element {
  const initial: MandatsFilters = {
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

  const [filters, setFilters] = useState<MandatsFilters>(initial);

  const update = (k: keyof MandatsFilters, v: string) =>
    setFilters((f) => ({ ...f, [k]: v }));

  // call this from parent when needed, or wire to a button if you add one later
  const apply = () => onApply?.(filters);

  const onInput =
    (key: keyof MandatsFilters) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      update(key, e.target.value);

  return (
    <div className="bg-white rounded-md border border-cyan-700 px-4 py-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Provenance */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Provenance</div>
          <input
            value={filters.provenance}
            onChange={onInput("provenance")}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* État du projet */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">État du projet</div>
          <input
            value={filters.etatProjet}
            onChange={onInput("etatProjet")}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* État */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">État</div>
          <input
            value={filters.etat}
            onChange={onInput("etat")}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Étape */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Étape</div>
          <input
            value={filters.etape}
            onChange={onInput("etape")}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Type */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Type</div>
          <input
            value={filters.type}
            onChange={onInput("type")}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Assignée à */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Assignée à</div>
          <input
            value={filters.assignee}
            onChange={onInput("assignee")}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Faisabilité */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Faisabilité</div>
          <input
            value={filters.faisabilite}
            onChange={onInput("faisabilite")}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Statut d’occupation */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Statut d’occupation</div>
          <input
            value={filters.statutOccupation}
            onChange={onInput("statutOccupation")}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Localisation */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Localisation</div>
          <input
            value={filters.localisation}
            onChange={onInput("localisation")}
            placeholder="Ville, Département, Région ..."
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Backoffice */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Backoffice</div>
          <input
            value={filters.backoffice}
            onChange={onInput("backoffice")}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* État dossier */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">État dossier</div>
          <input
            value={filters.etatDossier}
            onChange={onInput("etatDossier")}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Status mandat */}
        <div className="relative md:col-span-1">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">Status mandat</div>
          <input
            value={filters.statusMandat}
            onChange={onInput("statusMandat")}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
}
