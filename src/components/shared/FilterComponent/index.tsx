"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  endOfMonth,
  endOfToday,
  endOfWeek,
  endOfYear,
  format,
  parseISO,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { type DateRange } from "react-day-picker";
import { Input } from "../../ui/input";
import { CalendarIcon, ChevronDown, Search, X } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Label } from "../../ui/label";
import { cn } from "../../lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover";
import { Calendar } from "../../ui/calendar";
import { MultiSelect } from "../multiselect-component";
import type { FilterComponentProps, SelectFilterConfig } from "./type";

export function FilterComponent({
  config,
  search = false,
  title,
  periodeFilter = false,
}: FilterComponentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      if (!searchParams.toString()) {
        const initParams = new URLSearchParams();
        Object.entries(config).forEach(([key, cfg]) => {
          if (cfg.defaultValue !== undefined) {
            if (Array.isArray(cfg.defaultValue)) {
              cfg.defaultValue.forEach((v) => initParams.append(key, v));
            } else {
              initParams.set(key, cfg.defaultValue);
            }
          }
        });
        router.replace(`?${initParams.toString()}`);
      }
    }
  }, [config, router, searchParams]);

  useEffect(() => {
    const newFilters: Record<string, string | string[]> = {};
    Object.entries(config).forEach(([key, cfg]) => {
      const values = searchParams.getAll(key);
      newFilters[key] = cfg.type === "multiselect" ? values : (values[0] ?? "");
    });
    setFilters(newFilters);
  }, [searchParams, config]);

  const updateParams = (updated: Record<string, string | string[]>) => {
    const params = new URLSearchParams();
    Object.entries(updated).forEach(([key, val]) => {
      params.delete(key);
      if (Array.isArray(val)) {
        val.forEach((v) => v && params.append(key, v));
      } else if (val) {
        params.set(key, val);
      }
    });
    router.push(`?${params.toString()}`);
  };

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const handleChange = (key: string, val: string | string[]) => {
    if (key === "search") {
      setSearchValue(val as string);

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        const updated = { ...filters, [key]: val };
        updateParams(updated);
      }, 500);
      return;
    }
    const updated = { ...filters, [key]: val };
    updateParams(updated);
  };

  const renderSelect = (key: string, cfg: SelectFilterConfig) => {
    const current = Array.isArray(filters[key])
      ? filters[key][0]
      : filters[key];
    const commonClasses =
      "cursor-pointer h-10 text-[12px] font-normal  w-full rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:border-gray-600";

    return (
      <div className="flex w-full flex-col md:w-[20vw]" key={key}>
        <Label
          className="mb-2 text-[12px] font-normal text-gray-700 dark:text-gray-200"
          title={key}
        >
          {cfg.label ?? key}
        </Label>
        {cfg.type === "select" ? (
          <Select
            value={current?.toString() ?? ""}
            onValueChange={(v) => handleChange(key, v)}
          >
            <SelectTrigger className={commonClasses}>
              <SelectValue
                className="text-[12px] font-normal"
                placeholder={cfg.label}
              />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800">
              {cfg.options.map(({ label, value }) => (
                <SelectItem
                  key={value === "" ? "all" : value}
                  value={value === "" ? "all" : value}
                  className={cn(
                    "cursor-pointer dark:text-gray-100",
                    value === "" && "font-normal",
                  )}
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <MultiSelect
            className={commonClasses}
            options={cfg.options}
            value={Array.isArray(filters[key]) ? filters[key] : []}
            onValueChange={(vals) => handleChange(key, vals)}
            placeholder={cfg.label}
            maxCount={1}
          />
        )}
      </div>
    );
  };

  const [dateRanges, setDateRanges] = useState<
    Record<string, DateRange | undefined>
  >({});

  useEffect(() => {
    Object.entries(filters).forEach(([key, value]) => {
      if (config[key]?.type === "dateRange" && value) {
        const [from, to] = (typeof value === "string" ? value : "")
          .split(",")
          .map((d) => parseISO(d));
        setDateRanges((prev) => ({ ...prev, [key]: { from, to } }));
      }
    });
  }, [filters, config]);

  const renderDateRange = (key: string) => {
    const handleDate = (r?: DateRange) => {
      setDateRanges((prev) => ({ ...prev, [key]: r }));
      const formatted =
        r?.from && r.to
          ? `${format(r.from, "yyyy-MM-dd")},${format(r.to, "yyyy-MM-dd")}`
          : "";
      handleChange(key, formatted);
    };

    const range = dateRanges[key];

    return (
      <div className="flex w-full flex-col md:w-[20vw]" key={key}>
        <Label className="mb-2 text-[12px] font-normal text-gray-700 dark:text-gray-200">
          Date Range
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="focus:border-primary focus:ring-primary h-10 w-full justify-start rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-[12px] font-normal text-gray-900 hover:bg-gray-50 focus:ring-1 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {range?.from ? (
                range.to ? (
                  `${format(range.from, "MMM dd")} - ${format(
                    range.to,
                    "MMM dd",
                  )}`
                ) : (
                  format(range.from, "MMM dd")
                )
              ) : (
                <span className="text-[12px] font-normal text-gray-400 dark:text-gray-500">
                  Pick a date range
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto bg-white p-0 text-[12px] font-normal dark:bg-gray-800">
            <Calendar
              mode="range"
              selected={range}
              onSelect={handleDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  // periode Filter State
  const [periodeFilterState, setPeriodeFilterState] =
    useState<string>("all_time");

  const formatRange = (from: Date, to: Date) => {
    const formatDate = (d: Date) => d.toISOString().split("T")[0];
    return `${formatDate(from)}%2C${formatDate(to)}`;
  };

  const translatePeriode = (periode: string) => {
    const today = new Date();

    switch (periode) {
      case "today":
        return formatRange(startOfToday(), endOfToday());

      case "this_week":
        return formatRange(
          startOfWeek(today, { weekStartsOn: 1 }),
          endOfWeek(today, { weekStartsOn: 1 }),
        );

      case "last_week": {
        const lastWeek = subWeeks(today, 1);
        return formatRange(
          startOfWeek(lastWeek, { weekStartsOn: 1 }),
          endOfWeek(lastWeek, { weekStartsOn: 1 }),
        );
      }

      case "this_month":
        return formatRange(startOfMonth(today), endOfMonth(today));

      case "last_month": {
        const lastMonth = subMonths(today, 1);
        return formatRange(startOfMonth(lastMonth), endOfMonth(lastMonth));
      }

      case "this_year":
        return formatRange(startOfYear(today), endOfYear(today));

      case "last_year": {
        const lastYear = subYears(today, 1);
        return formatRange(startOfYear(lastYear), endOfYear(lastYear));
      }

      case "all_time":
        return "";

      default:
        return periode;
    }
  };

  const formatBadgeValue = (key: string, value: string | string[]) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    if (key === "active") {
      return value === "Active" ? "Active" : "Inactive";
    }
    if (key === "type") {
      return value;
    }

    return value;
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex w-full items-center gap-2">
        {title && (
          <h2 className="text-primary text-2xl font-semibold dark:text-white">
            {title}
          </h2>
        )}
        {search && (
          <div className="relative w-[300px] md:w-[250px]">
            <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input
              placeholder="Rechercher..."
              value={searchValue}
              onChange={(e) => handleChange("search", e.target.value)}
              className="focus:border-primary focus:ring-primary h-10 w-full rounded-md border border-gray-300 bg-white pl-8 text-[12px] font-normal text-gray-900 placeholder:text-gray-400 focus:ring-1 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
          </div>
        )}
        <div className="ml-auto flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="focus:border-primary focus:ring-primary h-10 cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-[12px] font-normal text-gray-900 hover:bg-gray-50 focus:ring-1 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            >
              Filters
              <ChevronDown
                className={cn(
                  "ml-2 h-4 w-4 transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </Button>
          </CollapsibleTrigger>
          {periodeFilter && (
            <Select
              value={periodeFilterState}
              onValueChange={(v) => {
                setPeriodeFilterState(v);
                const formatted = translatePeriode(v);
                handleChange("periode", formatted);
              }}
            >
              <SelectGroup>
                <SelectTrigger className="focus:border-primary focus:ring-primary h-10 w-full min-w-[120px] cursor-pointer rounded-md border bg-white px-3 py-2 text-xs font-normal text-gray-900 placeholder:text-gray-400 focus:ring-1 sm:w-[160px] sm:text-[12px] md:w-[200px] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400">
                  <SelectValue
                    placeholder="Période"
                    className="text-xs font-normal sm:text-[12px]"
                  />
                </SelectTrigger>
                <SelectContent className="w-[var(--radix-select-trigger-width)] bg-white dark:bg-gray-800">
                  {[
                    { value: "today", label: "Aujourd'hui" },
                    { value: "this_week", label: "Cette semaine" },
                    { value: "last_week", label: "La semaine dernière" },
                    { value: "this_month", label: "Ce mois-ci" },
                    { value: "last_month", label: "Le mois dernier" },
                    { value: "this_year", label: "Cette année" },
                    { value: "last_year", label: "L'année dernière" },
                    { value: "all_time", label: "Toute la période" },
                    { value: "custom", label: "Personnalisé" },
                  ].map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="text-xs font-normal data-[highlighted]:bg-gray-100 sm:text-[12px] dark:data-[highlighted]:bg-gray-700"
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectGroup>
            </Select>
          )}
          {periodeFilterState === "custom" && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="focus:border-primary focus:ring-primary h-10 w-[250px] cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-[12px] font-normal text-gray-900 shadow-sm focus:ring-1 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
                  {dateRanges.periode?.from && dateRanges.periode?.to ? (
                    `${format(
                      dateRanges.periode.from,
                      "dd/MM/yyyy",
                    )} - ${format(dateRanges.periode.to, "dd/MM/yyyy")}`
                  ) : (
                    <span className="text-[12px] font-normal text-gray-400">
                      Sélectionnez une période
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 text-[12px] font-normal"
                align="start"
              >
                <Calendar
                  mode="range"
                  selected={dateRanges.periode}
                  onSelect={(r) => {
                    setDateRanges((prev) => ({ ...prev, periode: r }));
                    const formatted =
                      r?.from && r.to
                        ? `${format(r.from, "yyyy-MM-dd")},${format(
                            r.to,
                            "yyyy-MM-dd",
                          )}`
                        : "";
                    handleChange("periode", formatted);
                  }}
                  numberOfMonths={2}
                  initialFocus
                  defaultMonth={dateRanges.periode?.from}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      <div className="my-2 flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, val]) => {
          if (!val || (Array.isArray(val) && val.length === 0)) return null;

          const displayValue = formatBadgeValue(key, val);

          return (
            <Badge
              key={key}
              className="flex items-center gap-2 rounded-md bg-gray-100 px-2 py-1 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            >
              {displayValue}
              <button
                onClick={() => handleChange(key, Array.isArray(val) ? [] : "")}
                className="ml-1 cursor-pointer rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <X className="h-3 w-3 text-gray-600 dark:text-gray-300" />
              </button>
            </Badge>
          );
        })}
      </div>

      <CollapsibleContent>
        <div className="mt-5 mb-5 flex flex-wrap gap-4">
          {Object.entries(config).map(([key, cfg]) => {
            switch (cfg.type) {
              case "select":
              case "multiselect":
                return cfg.hidden != true ? renderSelect(key, cfg) : null;
              case "dateRange":
                return cfg.hidden != true ? renderDateRange(key) : null;
              case "date":
              case "dateTime":
                return cfg.hidden != true ? (
                  <div className="flex flex-col md:w-[20vw]" key={key}>
                    <Label className="mb-2 font-normal text-gray-700 dark:text-gray-200">
                      {key}
                    </Label>
                    <Input
                      type={cfg.type === "date" ? "date" : "datetime-local"}
                      value={filters[key] ?? ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="focus:border-primary focus:ring-primary h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-1 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
                    />
                  </div>
                ) : null;
              default:
                return cfg.hidden != true ? (
                  <div className="flex w-full flex-col" key={key}>
                    <Label className="mb-2 text-[12px] font-normal text-gray-700 dark:text-gray-200">
                      {key}
                    </Label>
                    <Input
                      placeholder={cfg.label}
                      value={(filters[key] as string) ?? ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="focus:border-primary focus:ring-primary h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-1 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
                    />
                  </div>
                ) : null;
            }
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
