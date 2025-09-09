import React, { useEffect, useRef, useState } from "react";

type PeriodDropdownProps = {
  value?: string;
  onChange?: (v: string) => void;
};

const PERIODS = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre","Cette année",
] as const;

export default function PeriodDropdown({
  value = "Ce mois",
  onChange,
}: PeriodDropdownProps) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState<string>(value);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setLabel(value), [value]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("click", onDocClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", onDocClick);
      window.removeEventListener("keydown", onKey);
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
        className="inline-flex items-center justify-between bg-cyan-600 hover:bg-cyan-500
                   text-white text-sm h-[30px] rounded transition
                   w-[120px] border border-gray-600 whitespace-nowrap px-2"
      >
        <span className="truncate">{label}</span>
        <span className="ml-1 text-xs">▾</span>
      </button>

      {open && (
        <div
          className="absolute -left-3 mt-2 w-48 z-50 bg-[#eff7f9] rounded-md shadow
                     border border-cyan-300 overflow-hidden -translate-x-15"
          role="listbox"
          aria-label="Période"
        >
          <ul className="max-h-72 overflow-auto">
            {PERIODS.map((p, idx) => (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => selectItem(p)}
                  className={[
                    "w-full text-left px-2 py-1.5 text-[12px]",
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

          <div className="p-2 border-t border-cyan-300 bg-gray-50">
            <input
              type="date"
              className="w-full h-8 px-2 border border-cyan-400 rounded text-[12px]
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
