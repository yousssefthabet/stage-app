// eslint-disable-next-line
export type Row = Record<string, any>;

type XOR<T, U> =
  // eslint-disable-next-line
  | (T & { [K in Exclude<keyof U, keyof T>]?: never })
  // eslint-disable-next-line
  | (U & { [K in Exclude<keyof T, keyof U>]?: never });

type ColumnHeader = { header: string } | { header: () => React.ReactNode };

type ColumnCell<TData extends Row> = {
  cell: (row: TData) => React.ReactNode;
};

type IdIdentifier = { id: string };
type AccessorIdentifier<TData extends Row> = { accessorKey: keyof TData };

type FeatureOptions = {
  sortable?: boolean;
};

type AccessorKeyColumnDef<TData extends Row> = AccessorIdentifier<TData> &
  Partial<ColumnHeader> &
  Partial<ColumnCell<TData>> &
  FeatureOptions;

type IdColumnDef<TData extends Row> = IdIdentifier &
  ColumnHeader &
  ColumnCell<TData>;

export type ColumnDef<TData extends Row> = XOR<
  AccessorKeyColumnDef<TData>,
  IdColumnDef<TData>
>;

export interface DataTableProps<TData extends Row> {
  columns: ColumnDef<TData>[];
  data: TData[];
  sortOrderSearchParam?: string;
  sortBySearchParam?: string;
  className?: string;
  isLoading?: boolean;
}
