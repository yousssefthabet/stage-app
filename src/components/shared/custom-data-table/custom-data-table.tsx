"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { type DataTableProps } from "./types";
import { getColumnKey, renderCell, renderHeader } from "./utils";
import { cn } from "../../lib/utils";
import { Skeleton } from "../../ui/skeleton";

export function DataTable<
  TData extends { id: number | string | bigint } = {
    id: number | string | bigint;
  },
>({
  columns,
  data,
  sortBySearchParam = "sortBy",
  sortOrderSearchParam = "sortOrder",
  className,
  isLoading = false,
}: DataTableProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get(sortBySearchParam);
  const currentOrder = searchParams.get(sortOrderSearchParam) as
    | "asc"
    | "desc"
    | null;

  const handleSort = (column: string) => {
    const finalParams = new URLSearchParams(searchParams);
    const newSortOrder =
      currentSort === column && currentOrder === "asc" ? "desc" : "asc";

    finalParams.set(sortBySearchParam, column);
    finalParams.set(sortOrderSearchParam, newSortOrder);

    router.push(`?${finalParams.toString()}`);
  };

  // root wrapper with light/dark border & bg
  const wrapperClasses = cn(
    "rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700",
    className,
  );
  const headerClasses =
    "bg-primary text-white dark:bg-gray-700 dark:text-gray-100 border-l border-r border-white";
  const cellClasses = "border-t border-gray-200 dark:border-gray-600";
  const rowClasses =
    "hover:bg-primary/10 dark:hover:bg-primary/50 transition-colors";

  return (
    <div className={wrapperClasses}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={getColumnKey(column)}
                className={cn(
                  headerClasses,
                  "px-2 py-2 text-left text-xs font-bold",
                )}
              >
                {renderHeader(column, handleSort, currentSort, currentOrder)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // 🦴 Rendu des lignes squelettes
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={`skeleton-${rowIndex}`} className={rowClasses}>
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={`skeleton-cell-${colIndex}`}
                    className={cn(cellClasses, "px-2 py-2")}
                  >
                    <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow className={rowClasses}>
              <TableCell
                colSpan={columns.length}
                className={cn(
                  cellClasses,
                  "h-24 text-center text-gray-500 dark:text-gray-400",
                )}
              >
                Pas de données disponibles
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow
                key={row.id}
                className={cn(rowClasses, "text-gray-900 dark:text-gray-100")}
              >
                {columns.map((column) => (
                  <TableCell
                    key={getColumnKey(column)}
                    className={cn(cellClasses, "px-2 py-2 text-xs")}
                  >
                    {renderCell(row, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
