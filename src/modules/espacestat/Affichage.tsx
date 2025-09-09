"use client";

import React from "react";
import type { JSX } from "react";


const baseInput =
  "w-full h-9 border border-cyan-400 text-cyan-700 rounded-md px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500";
const labelChip =
  "absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  className?: string;
};

function TextField({ id, label, className = "", ...props }: TextFieldProps) {
  return (
    <div className="relative w-full">
      <label htmlFor={id} className={labelChip}>
        {label}
      </label>
      <input id={id} className={`${baseInput} ${className}`} {...props} />
    </div>
  );
}

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  className?: string;
};

function SelectField({
  id,
  label,
  children,
  className = "",
  ...props
}: SelectFieldProps) {
  return (
    <div className="relative w-full">
      <label htmlFor={id} className={labelChip}>
        {label}
      </label>
      <select id={id} className={`${baseInput} ${className}`} {...props}>
        {children}
      </select>
    </div>
  );
}

/* ---------- Main component ---------- */
export default function Stat(): JSX.Element {
  return (
    <div className="p-6 bg-white max-w-[83rem] mx-auto border border-gray-200 rounded-lg shadow-md">
      <h3 className="text-[16px] font-semibold text-cyan-700 mb-3">
        Vue sur mon agence
      </h3>

      {/* Row 1 — Entreprise, Courtier */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
        <TextField id="entreprise" label="***Entreprise" defaultValue="2L Courtage" />
        <TextField id="courtier" label="***Courtier" />
      </div>

      <h3 className="text-[16px] font-semibold text-cyan-700 mb-3">Donnes</h3>

      {/* Row 2 — CA, Type, Période, Pas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-3">
        <SelectField id="ca" label="***C_A" defaultValue="Facturé">
          <option>Facturé</option>
          <option>Encaissé</option>
          <option>Prévisionnel</option>
        </SelectField>

        <SelectField id="type-ca" label="***Type de C.A" defaultValue="CA Total">
          <option>CA Total</option>
          <option>Commissions bancaires</option>
          <option>Honoraires</option>
        </SelectField>

        <SelectField id="periode" label="***Période" defaultValue="Cette année">
          <option>Cette année</option>
          <option>Ce mois</option>
          <option>30 derniers jours</option>
          <option>Le mois dernier</option>
          <option>Semaine dernière</option>
        </SelectField>

        <SelectField id="pas" label="***Pas" defaultValue="Mois">
          <option>Année</option>
          <option>Mois</option>
          <option>Semaine</option>
        </SelectField>
      </div>

      <h3 className="text-[16px] font-semibold text-cyan-700 mb-3">Dossier</h3>

      {/* Row 3 — Étape, État, Date de dossier */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectField id="etape" label="***Étape" defaultValue="">
          <option value=""></option>
          <option>Prospect</option>
          <option>En cours</option>
          <option>Terminé</option>
        </SelectField>

        <SelectField id="etat" label="***État" defaultValue="">
          <option value=""></option>
          <option>En cours</option>
          <option>Terminé</option>
          <option>Annulé</option>
        </SelectField>

        <TextField id="date-dossier" label="***Date de dossier" type="date" />
      </div>

      {/* Actions */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 h-[32px] rounded"
        >
          Afficher
        </button>
      </div>
    </div>
  );
}
