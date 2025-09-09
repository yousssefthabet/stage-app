import React from "react";
import type { JSX } from "react";
type MandatItem = {
  label: string;
  value: number | string;
  suffix?: string;      // e.g. "%", "€"
  isPrimary?: boolean;  // the highlighted orange stat on the right
};

type StatBoxMandatsProps = {
  title: string;
  items?: MandatItem[];
  accentClassName?: string; // optional: customize bottom bar color
};

export default function StatBoxMandats({
  title,
  items = [],
  accentClassName = "bg-cyan-500",
}: StatBoxMandatsProps): JSX.Element {
  const primary = items.find((i) => i.isPrimary);
  const rest = items.filter((i) => !i.isPrimary).slice(0, 2); // keep it compact like the screenshot

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm w-full max-w-[270px]">
      <div className="px-1 pt-2 pb-1">
        {/* header: title left, primary stat right */}
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] text-gray-700">{title}</span>
          {primary ? (
            <span className="text-[12px] text-orange-500 font-semibold flex items-center gap-1">
              {/* tiny orange dot like in many KPI cards */}
        
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
