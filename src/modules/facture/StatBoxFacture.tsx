"use client";

import React from "react";
import type { JSX } from "react";
type Format = "eur" | undefined;

export type StatItem = {
  label?: string;
  value: number | string;
  format?: Format;
  isPrimary?: boolean;
};

type StatBoxFactureProps = {
  title: string;
  items?: StatItem[];
};

const fmt = (v: number | string, format?: Format): string => {
  if (format === "eur" && typeof v === "number") {
    return (
      v.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + " €"
    );
  }
  return String(v);
};

export default function StatBoxFacture({
  title,
  items = [],
}: StatBoxFactureProps): JSX.Element {
  const primary = items.find((i) => i.isPrimary);
  const rest = items.filter((i) => !i.isPrimary);

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm w-full">
      {/* header */}
      <div className="px-3 pt-2">
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] text-gray-600">{title}</span>
          {primary && (
            <span className="text-orange-500 font-semibold text-[12px]">
              {fmt(primary.value, primary.format)}
            </span>
          )}
        </div>

        {/* lines */}
        <div className="mt-2 space-y-1.5 text-[12px]">
          {rest.map((it, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-gray-600">{it.label}</span>
              <span className="text-gray-700">{fmt(it.value, it.format)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* cyan underline */}
      <div className="mt-3 h-[6px] bg-cyan-500 rounded-b-md" />
    </div>
  );
}
