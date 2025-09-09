"use client";

import { format, isDate } from "date-fns";
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
import type { DateField } from "../custom-field/custom-fields-types";
import { cn } from "../../lib/utils";
import { fr } from "date-fns/locale";
import TimeScroller from "../time-scroller";

export function DateTimeInputField({
  type,
  label,
  className,
  value,
  required,
  onChange,
  locale = fr,
}: DateField & { locale?: Locale }) {
  return (
    <div className={cn(className)}>
      <Label htmlFor="calendar-input" className="mb-2 font-semibold capitalize">
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            aria-label="Sélectionnez une date"
            id="calendar-input"
            aria-required={required}
          >
            {type === "date" && isDate(value)
              ? format(value, "dd/MM/yyyy", { locale })
              : type === "dateTime" && isDate(value)
                ? format(value, "dd/MM/yyyy HH:mm")
                : "Sélectionnez une date"}
            <CalendarIcon className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="sm:flex">
            <Calendar
              mode="single"
              selected={value}
              onSelect={(date) => date && onChange?.(date)}
              initialFocus
              locale={locale}
            />
            {type === "dateTime" && (
              <TimeScroller
                value={value}
                onChange={onChange}
                className="h-70"
              />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
