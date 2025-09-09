"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

/* ---------- minimal types for the tooltip ---------- */
type SimpleTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ value?: number }>;
};
type Datum = { day: number; value: number };

/* ---------- demo data ---------- */
const defaultData: Datum[] = [
  { day: 1, value: 0 },  { day: 2, value: 18000 }, { day: 3, value: 11000 },
  { day: 4, value: 10500 }, { day: 5, value: 0 },   { day: 6, value: 6500 },
  { day: 7, value: 27000 }, { day: 8, value: 0 },   { day: 9, value: 15000 },
  { day:10, value: 8000 },  { day:11, value: 17500 }, { day:12, value: 2500 },
  { day:13, value: 24000 }, { day:14, value: 900 }, { day:15, value: 0 },
  { day:16, value: 14000 }, { day:17, value: 39000 }, { day:18, value: 6200 },
  { day:19, value: 3200 },  { day:20, value: 7200 }, { day:21, value: 10500 },
  { day:22, value: 500 },   { day:23, value: 9800 }, { day:24, value: 0 },
  { day:25, value: 17000 }, { day:26, value: 7400 }, { day:27, value: 0 },
  { day:28, value: 0 },     { day:29, value: 0 },    { day:30, value: 25000 },
  { day:31, value: 0 },
];

/* ---------- helpers ---------- */
function formatValue(v: number, unit: string = "€") {
  if (unit === "€") {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(v);
  }
  return `${new Intl.NumberFormat("fr-FR").format(v)}${unit ? ` ${unit}` : ""}`;
}

/* ---------- typed tooltip (simple) ---------- */
const CustomTooltip: React.FC<SimpleTooltipProps & { unit?: string }> = ({
  active,
  payload,
  label,
  unit,
}) => {
  if (!active || !payload || payload.length === 0) return null;
  const v = (payload[0]?.value as number) ?? 0;

  return (
    <div className="rounded-md border border-cyan-200 bg-white px-3 py-2 text-[12px] shadow">
      <div className="font-semibold text-cyan-700">Jour {label}</div>
      <div className="text-gray-700">{formatValue(v, unit)}</div>
    </div>
  );
};

/* ---------- chart ---------- */
interface MonthlyBarChartProps {
  data?: Datum[];
  unit?: string;     // "€" by default
  height?: number;   // px
  className?: string;
}

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({
  data = defaultData,
  unit = "€",
  height = 320,
  className = "",
}) => {
  return (
    <div
      className={`bg-white p-4 rounded-md shadow border border-gray-200 max-w-[83rem] mx-auto ${className}`}
      aria-label="Histogramme mensuel"
    >
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
            barCategoryGap={8}
          >
            <defs>
              <linearGradient id="barCyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3CA5AD" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#3CA5AD" stopOpacity={0.65} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              tickMargin={6}
              tick={{ fontSize: 11, fill: "#374151" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              width={56}
              tickMargin={6}
              tick={{ fontSize: 11, fill: "#374151" }}
              tickFormatter={(v) => formatValue(v as number, unit)}
            />
            {/* pass a function — avoids TS type mismatch */}
            <Tooltip content={(p) => <CustomTooltip {...p} unit={unit} />} />

            <Bar dataKey="value" barSize={8} radius={[4, 4, 0, 0]}>
              {data.map((d, i) => (
                <Cell
                  key={i}
                  fill={d.value === 0 ? "#e5e7eb" : "url(#barCyan)"}
                  stroke={d.value === 0 ? "#e5e7eb" : "#3CA5AD"}
                  strokeWidth={d.value === 0 ? 0 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyBarChart;
