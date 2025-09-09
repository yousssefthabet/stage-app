export type FilterType =
  | "select"
  | "multiselect"
  | "input"
  | "date"
  | "dateRange"
  | "dateTime";

export type FilterConfigBase<T extends FilterType, V = unknown> = {
  type: T;
  defaultValue?: V;
  label?: string;
  hidden?: boolean;
};

export type SelectFilterConfig = FilterConfigBase<
  "select" | "multiselect",
  string[]
> & {
  options: { label: string; value: string }[];
};

export type InputFilterConfig = FilterConfigBase<
  "input" | "date" | "dateTime",
  string
>;

export type DateRangeFilterConfig = FilterConfigBase<"dateRange", string>;

export type FilterConfig = Record<
  string,
  SelectFilterConfig | InputFilterConfig | DateRangeFilterConfig
>;

export interface FilterComponentProps {
  config: FilterConfig;
  search?: boolean;
  title?: string;
  periodeFilter?: boolean;
}
