"use client";

import React, { useEffect, useRef, useState } from "react";

type PeriodDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const PERIODS = [
  "Toute la periode",
  "L'année dernière",
  "12 derniers mois",
  "6 derniers mois",
  "Trimestre dernier",
  "30 derniers jours",
  "Le mois dernier",
  "Semaine dernière",
  "Cette année",
  "Ce mois",
];

export default function PeriodDropdown({
  value = "Ce mois",
  onChange,
}: PeriodDropdownProps) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(value);

  // ✅ type the ref so `.contains` exists
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => setLabel(value), [value]);

  useEffect(() => {
    // ✅ type the events; cast/guard target to Node
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (open && rootRef.current && target && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("click", onDocClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", onDocClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selectItem = (v: string) => {
    setLabel(v);
    onChange?.(v);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center justify-between bg-white hover:bg-cyan-100
                   text-cyan-500 text-sm h-[30px] rounded transition
                   w-[160px] border border-transparent whitespace-nowrap px-3"
      >
        <span className="truncate">{label}</span>
        <span className="ml-2 text-xs">▾</span>
      </button>

      {open && (
        <div
          className="absolute left-0 mt-2 w-64 z-50 bg-white rounded-md shadow
                     border border-cyan-400 overflow-hidden"
        >
          <ul className="max-h-80 overflow-auto" role="listbox" aria-label="Période">
            {PERIODS.map((p, idx) => (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => selectItem(p)}
                  className={[
                    "w-full text-left px-3 py-2 text-[13px]",
                    "hover:bg-cyan-50",
                    idx !== PERIODS.length - 1 ? "border-b border-cyan-300" : "",
                    p === label ? "bg-cyan-700 text-white" : "text-gray-700",
                  ].join(" ")}
                  role="option"
                  aria-selected={p === label}
                >
                  {p}
                </button>
              </li>
            ))}
          </ul>

          <div className="p-3 border-t border-cyan-300 bg-gray-50">
            <input
              type="date"
              className="w-full h-9 px-2 border border-cyan-400 rounded text-sm
                         focus:outline-none focus:ring-1 focus:ring-cyan-500 bg-white"
              onChange={(e) => selectItem(e.target.value)}
              placeholder="Sélectionner une date"
              title="Sélectionner une date"
            />
          </div>
        </div>
      )}
    </div>
  );
}
