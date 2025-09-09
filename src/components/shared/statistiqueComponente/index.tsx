"use client";

import { type ReactNode } from "react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Button } from "../../ui/button";
import { DataStats } from "./detailStats";
import { StatCard } from "./statestiqueCard";
import { FilterComponent } from "../FilterComponent";
import { type FilterConfig } from "../FilterComponent/type";
import { type ColumnDef, type Row } from "../custom-data-table/types";
import { DataTable } from "../custom-data-table/custom-data-table";
import { ArrowDownToLine } from "lucide-react";
type TableGroup<T> = {
  title: string;
  data: T[];
  stats: StatItem[];
};
type StatItem = {
  label: string;
  value: number;
  unit?: string;
};

type StatCardData = {
  title: string;
  titleValue: number;
  items: StatItem[];
};

type DashboardSectionProps<T extends Row> = {
  statCards: StatCardData[];
  statSummaries?: StatItem[][];
  filtersConfig?: FilterConfig;
  children?: ReactNode;
  titleStat?: string;
  tableColumns?: ColumnDef<T>[];
  tableDataGroups?: TableGroup<T>[];
  search?: boolean;
  periodeFilter?: boolean;
  url?: string;
  downloadNameBtn?: string;
};

export default function StatisticSection<T extends { id: string | number }>({
  statCards,
  statSummaries = [],
  filtersConfig,
  children,
  titleStat,
  tableColumns = [],
  tableDataGroups = [],
  url,
  search,
  periodeFilter,
  downloadNameBtn,
}: DashboardSectionProps<T>) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statCards.map((cardData, index) => (
          <StatCard
            key={index}
            title={cardData.title}
            titleValue={cardData.titleValue}
            items={cardData.items}
          />
        ))}
      </div>

      {filtersConfig && (
        <>
          <div className="mx-4 flex justify-between">
            <div className="mx-5 text-lg font-medium">{titleStat}</div>

            <div className="flex">
              {url ? (
                <Button onClick={() => downloadFromUrl(url)} className="me-2">
                  <ArrowDownToLine />
                  {downloadNameBtn}
                </Button>
              ) : null}
            </div>
          </div>
          <div className="mx-5 mt-5">
            <FilterComponent
              config={filtersConfig}
              search={search}
              periodeFilter={periodeFilter}
            />
          </div>
        </>
      )}
      {tableColumns && tableDataGroups.length > 0 && (
        <div className="m-4 space-y-6">
          {tableDataGroups.map((groupData, index) => (
            <Card key={index} className="p-4">
              <div className="font-semibold">{groupData.title}</div>
              <DataTable
                data={groupData.data}
                columns={tableColumns}
                className="rounded-md border sm:overflow-x-auto md:w-full"
              />
              <DataStats stats={groupData.stats} />
            </Card>
          ))}
        </div>
      )}

      {children}
      {statSummaries.length > 0 && (
        <Card className="m-4">
          <CardHeader>Total</CardHeader>
          <CardContent>
            {statSummaries.map((group, idx) => (
              <DataStats key={idx} stats={group} />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
const downloadFromUrl = (url: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
