"use client";

import React, { useEffect, useRef, useState } from "react";

const PERIODS = [
  "Retard",
  "Aujourd'hui",
  "Demain",
  "Cette semaine",
  "Ce mois-ci",
  "Le mois dernier",
  "Cette année",
  "Toute la période",
  "L'année dernière",
] as const;

type Period = typeof PERIODS[number];

type Props = {
  value?: Period | string;
  onChange?: (value: Period | string) => void;
};

export default function PeriodDropdownFactureCourtiers({
  value = "Ce mois-ci",
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState<string>(value);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => setLabel(value), [value]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onDocClick);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

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
        className="inline-flex items-center justify-between bg-cyan-600 hover:bg-cyan-700
                   text-white text-sm h-[32px] rounded-full px-3 min-w-[160px] transition"
      >
        <span className="truncate">{label}</span>
        <span className="ml-2 text-xs">▾</span>
      </button>

      {open && (
        <div
          className="absolute left-0 mt-2 w-64 z-50 bg-cyan-50 rounded-lg shadow-xl
                     ring-1 ring-cyan-300 overflow-hidden transform -translate-x-24 origin-top-left"
          role="listbox"
          aria-label="Période"
        >
          <div className="h-8 bg-cyan-700" />

          <ul className="bg-white">
            {PERIODS.map((p) => {
              const selected = p === label;
              return (
                <li key={p}>
                  <button
                    type="button"
                    onClick={() => selectItem(p)}
                    className={[
                      "w-full text-left px-4 py-2 text-[13px] transition",
                      "border-t border-cyan-300",
                      selected
                        ? "bg-cyan-700 text-white"
                        : "bg-white text-cyan-700 hover:bg-cyan-50",
                    ].join(" ")}
                    role="option"
                    aria-selected={selected}
                  >
                    {p}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="bg-cyan-50 p-3">
            <button
              type="button"
              onClick={() => selectItem("Personnaliser")}
              className="w-full h-9 rounded-md border border-cyan-400
                         text-cyan-700 text-[13px] bg-white hover:bg-cyan-50"
            >
              Personnaliser
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
