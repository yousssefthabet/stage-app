import React from "react";
import type { JSX } from "react";

export type StatItem = {
  label?: string;
  value: string | number;
  isPrimary?: boolean;
  suffix?: string;
};

interface StatCardProps {
  items?: StatItem[];   // <-- tell TS that items is an array of StatItem
  className?: string;
}

export default function StatCard({
  items = [],
  className = "",
}: StatCardProps): JSX.Element {
  return (
    <div
      className={`bg-white rounded-md shadow-sm w-52 h-[120px] 
                  flex flex-col justify-between overflow-hidden text-xs ${className}`}
    >
      <div className="p-3 space-y-4">
        {items.map(({ label, value, isPrimary, suffix }, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{label}</span>
            <span
              className={
                isPrimary ? "text-orange-400 font-semibold" : "text-gray-600"
              }
            >
              {value}
              {suffix ?? ""}
            </span>
          </div>
        ))}
      </div>

      <div className="h-[6px] bg-cyan-700" />
    </div>
  );
}
