"use client";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";
import type { TimeScrollerPros } from "./custom-field/custom-fields-types";

export default function TimeScroller({
  value,
  onChange,
  className,
}: TimeScrollerPros) {
  function handleTimeChange(type: "hour" | "minute", val: number) {
    const newDate = new Date(value ?? new Date());

    if (type === "hour") newDate.setHours(val);
    if (type === "minute") newDate.setMinutes(val);

    onChange?.(newDate);
  }

  return (
    <div
      className={cn(
        "flex flex-col divide-y sm:min-h-[300px] sm:flex-row sm:divide-x sm:divide-y-0",
        className,
      )}
    >
      <ScrollArea className="w-64 sm:w-auto">
        <div className="flex p-2 sm:flex-col">
          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
            <Button
              key={hour}
              size="icon"
              variant={value?.getHours() === hour ? "default" : "ghost"}
              className="aspect-square shrink-0 sm:w-full"
              onClick={() => handleTimeChange("hour", hour)}
            >
              {hour}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="sm:hidden" />
      </ScrollArea>

      <ScrollArea className="w-64 sm:w-auto">
        <div className="flex p-2 sm:flex-col">
          {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
            <Button
              key={minute}
              size="icon"
              variant={value?.getMinutes() === minute ? "default" : "ghost"}
              className="aspect-square shrink-0 sm:w-full"
              onClick={() => handleTimeChange("minute", minute)}
            >
              {minute}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="sm:hidden" />
      </ScrollArea>
    </div>
  );
}
