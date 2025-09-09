// modules/prets/StatBoxPrets.tsx
import React from "react";
import type { JSX } from "react";

type StatItem = {
  label?: string;
  value: number | string;
  isPrimary?: boolean;
  suffix?: string; // e.g. "%", "€"
};

interface StatBoxPretsProps {
  title: string;
  items?: StatItem[];
  accentClassName?: string; // optional color for the bottom bar
}

export default function StatBoxPrets({
  title,
  items = [],
  accentClassName = "bg-cyan-500",
}: StatBoxPretsProps): JSX.Element {
  const primary = items.find((i) => i.isPrimary);
  const rest = items.filter((i) => !i.isPrimary).slice(0, 2); // keep two rows, like the screenshot

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm w-full max-w-[280px]">
      <div className="px-3 pt-2 pb-1">
        {/* header */}
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] text-gray-700">{title}</span>
          {primary ? (
            <span className="text-[12px] text-orange-500 font-semibold flex items-center gap-1">
              
              <span>
                {primary.value}
                {primary.suffix ? <span className="ml-0.5">{primary.suffix}</span> : null}
              </span>
            </span>
          ) : (
            <span className="text-[12px] text-gray-400">—</span>
          )}
        </div>

        {/* rows */}
        <div className="mt-2 space-y-1.5 text-[12px]">
          {rest.map((it, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-gray-500">{it.label}</span>
              <span className="text-gray-700">
                {it.value}
                {it.suffix ? <span className="ml-0.5">{it.suffix}</span> : null}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* bottom accent */}
      <div className={`mt-3 h-[6px] ${accentClassName} rounded-b-md`} />
    </div>
  );
}
