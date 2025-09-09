"use client";

import { format } from "date-fns";
import type { Locale } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover";
import { Label } from "../../ui/label";
import type { DateRange } from "react-day-picker";
import { cn } from "../../lib/utils";
import type { DateRangeField } from "../custom-field/custom-fields-types";
import { fr } from "date-fns/locale";
import TimeScroller from "../time-scroller";

export function DateTimeRangeInputField({
  onChange,
  required,
  type,
  value,
  className,
  label,
  locale = fr,
}: DateRangeField & { locale?: Locale }) {
  function displayDateRange(date?: Date): string {
    if (!date) return "--/--/----";
    return format(date, "dd/MM/yyyy", { locale });
  }
  function displayDateTimeRange(date?: Date): string {
    if (!date) return "--/--/---- --:--";
    return format(date, "dd/MM/yyyy HH:mm", { locale });
  }

  function handleTimeChangeFor(boundary: "from" | "to", newDate: Date) {
    const newRange: DateRange = {
      from: value?.from ?? new Date(),
      to: value?.to ?? new Date(),
    };

    newRange[boundary] = newDate;
    onChange?.(newRange);
  }

  return (
    <div className={cn(className)}>
      <Label className="mb-2 font-semibold capitalize">{label}</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            aria-label="Sélectionnez une plage de date"
            aria-required={required}
          >
            {type === "dateRange" && value?.from && value?.to ? (
              <>
                {displayDateRange(value.from)} - {displayDateRange(value.to)}
              </>
            ) : type === "dateTimeRange" && value?.from && value?.to ? (
              <>
                {displayDateTimeRange(value.from)} -{" "}
                {displayDateTimeRange(value.to)}
              </>
            ) : (
              "Sélectionnez une plage de date"
            )}
            <CalendarIcon className="ml-auto h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-4">
          <div className="sm:flex">
            {type === "dateTimeRange" && (
              <TimeScroller
                className="h-70"
                value={value?.from ?? new Date()}
                onChange={(date) => handleTimeChangeFor("from", date)}
              />
            )}

            <Calendar
              mode="range"
              selected={value}
              onSelect={(range: DateRange | undefined) => {
                if (range) {
                  onChange?.(range);
                }
              }}
              numberOfMonths={2}
              initialFocus
              defaultMonth={value?.from ?? new Date()}
              locale={locale}
            />
            {type === "dateTimeRange" && (
              <TimeScroller
                className="h-70"
                value={value?.to ?? new Date()}
                onChange={(date) => handleTimeChangeFor("to", date)}
              />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
