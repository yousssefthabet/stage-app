import type { ColumnDef, Row } from "./types";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";

export function getColumnKey<TData extends Row>(
  column: ColumnDef<TData>,
): string {
  if (typeof column.accessorKey === "string") return column.accessorKey;
  if (column.id) return column.id;
  throw new Error("Column must have either an accessorKey or an id.");
}

export function renderCell<TData extends Row>(
  row: TData,
  column: ColumnDef<TData>,
): React.ReactNode {
  if ("cell" in column && column.cell) {
    return column.cell(row);
  }

  if ("accessorKey" in column && column.accessorKey) {
    return row[column.accessorKey] as React.ReactNode;
  }

  throw new Error(
    "Column must have a cell. Use either the cell or accessorKey property.",
  );
}

export function getSortIcon<TData extends Row>(
  column: ColumnDef<TData>,
  currentSort: string | null,
  currentOrder: "asc" | "desc" | null,
) {
  if (!column.sortable) return null;
  if (currentSort === column.accessorKey) {
    return currentOrder === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  }
  return <ArrowUpDown className="ml-2 h-4 w-4" />;
}

export function renderHeader<TData extends Row>(
  column: ColumnDef<TData>,
  handleSort: (column: string) => void,
  currentSort: string | null,
  currentOrder: "asc" | "desc" | null,
) {
  const headerContent: React.ReactNode | string = (() => {
    if (typeof column.header === "string") {
      return column.header;
    } else if (typeof column.header === "function") {
      return column.header();
    } else if (typeof column.accessorKey === "string") {
      return column.accessorKey;
    }

    throw new Error(
      "Column must have a header. User either the header or accessorKey property.",
    );
  })();
  if (column.sortable) {
    return (
      <div
        onClick={() => handleSort(column.accessorKey as string)}
        className="hover:text-primary flex items-center p-0 select-none hover:bg-transparent"
      >
        {headerContent}
        {getSortIcon(column, currentSort, currentOrder)}
      </div>
    );
  }

  return headerContent;
}
