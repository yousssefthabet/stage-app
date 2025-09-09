import React, { useEffect, useRef, useState } from "react";

type Filters = {
  commerciale: string;
  role: string;
  etatDossier: string;
  statutDossier: string;
  typeDate: string;
  month: string;
};

type CommissionFilterProps = {
  onApply?: (filters: Filters) => void;
};

export default function CommissionFilter({ onApply }: CommissionFilterProps) {
  const [filters, setFilters] = useState<Filters>({
    commerciale: "",
    role: "",
    etatDossier: "",
    statutDossier: "",
    typeDate: "",
    month: "",
  });

  const [openPeriodMenu, setOpenPeriodMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // close the (optional) period menu on outside click
  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (menuRef.current && target && !menuRef.current.contains(target)) {
        setOpenPeriodMenu(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const update = (key: keyof Filters, val: string) =>
    setFilters((f) => ({ ...f, [key]: val }));

  const apply = () => onApply?.(filters);

  return (
    <div className="bg-white rounded-md border border-cyan-700 px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Commerciale */}
        <div className="relative">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            ** Commerciale
          </div>
          <input
            value={filters.commerciale}
            onChange={(e) => update("commerciale", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Par rôle */}
        <div className="relative">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            ** Par Rôle
          </div>
          <input
            value={filters.role}
            onChange={(e) => update("role", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* État du dossier */}
        <div className="relative">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            ** État du dossier
          </div>
          <input
            value={filters.etatDossier}
            onChange={(e) => update("etatDossier", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Statut du dossier */}
        <div className="relative">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            ** Statut du dossier
          </div>
          <input
            value={filters.statutDossier}
            onChange={(e) => update("statutDossier", e.target.value)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Par Type Date */}
        <div className="relative">
          <div className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-cyan-700 font-semibold">
            ** Par Type Date
          </div>
          <input
            type="text"
            value={filters.typeDate}
            onChange={(e) => update("typeDate", e.target.value)}
            onFocus={() => setOpenPeriodMenu(true)}
            className="w-full h-9 border border-cyan-600 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />

          {openPeriodMenu && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-44 bg-white border border-teal-200 rounded-md shadow z-10"
            >
              {/* menu contenu si besoin */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
