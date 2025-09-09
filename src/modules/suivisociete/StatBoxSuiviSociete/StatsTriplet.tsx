import React from "react";
import StatCard from "./cardstat";
import type { JSX } from "react";

// One stat row
export type StatItem = {
  label?: string;
  value: string | number;
  isPrimary?: boolean;
  suffix?: string;
};

interface StatsTripletProps {
  leftItems?: StatItem[];
  middleItems?: StatItem[];
  rightItems?: StatItem[];
}

export default function StatsTriplet({
  leftItems = [],
  middleItems = [],
  rightItems = [],
}: StatsTripletProps): JSX.Element {
  return (
    <div className="flex gap-4 flex-wrap">
      <StatCard items={leftItems} className="w-full sm:w-64 md:w-72" />
      <StatCard items={middleItems} className="w-full sm:w-64 md:w-72" />
      <StatCard items={rightItems} className="w-full sm:w-64 md:w-72" />
    </div>
  );
}
