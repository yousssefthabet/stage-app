import { type SearchParams } from "@/types/search-params";
import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const uniqueByField = <T, K extends keyof T>(
  arr: T[],
  field: K,
): T[] => {
  const seen = new Set<T[K]>();
  return arr.filter((obj) => {
    if (seen.has(obj[field])) return false;
    seen.add(obj[field]);
    return true;
  });
};

type SearchParamsSchema = {
  key: string;
  type: "string" | "number" | "boolean" | "array";
};

const alwaysIncludeKeys = ["page", "perPage", "sortOrder", "sortBy"];

export const handleSearchParams = (
  SearchParams: SearchParams,
  SearchParamsSchema: SearchParamsSchema[],
): string => {
  let queryString = "?";

  if (!SearchParams) return queryString;

  Object.entries(SearchParams).forEach(([key, value]) => {
    const isAlwaysIncluded = alwaysIncludeKeys.includes(key);
    const schema = SearchParamsSchema.find((param) => param.key === key);

    if (!schema && !isAlwaysIncluded) return;

    if (!isAlwaysIncluded) {
      switch (schema?.type) {
        case "string":
          if (typeof value !== "string") return;
          break;
        case "number":
          if (isNaN(Number(value))) return;
          break;
        case "boolean":
          if (value !== "true" && value !== "false") return;
          break;
        case "array":
          if (!Array.isArray(value)) return;
          break;
        default:
          return;
      }
    }

    if (Array.isArray(value)) {
      value.forEach((val) => {
        queryString += `${encodeURIComponent(key)}=${encodeURIComponent(val)}&`;
      });
    } else {
      queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
    }
  });

  queryString = queryString.endsWith("&")
    ? queryString.slice(0, -1)
    : queryString;

  return queryString;
};

export const formatBytes = (bytes?: number, decimals = 1) => {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const isImage = (mime?: string) => {
  return mime?.startsWith("image/");
};

export const isTextLike = (mime?: string) => {
  return mime?.includes("pdf") ?? mime?.startsWith("text/");
};

export const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "yyyy-MM-dd HH:mm:ss");
};
