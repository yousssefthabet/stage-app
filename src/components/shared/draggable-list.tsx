"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useRef } from "react";
import { createSwapy, type SwapEndEvent, type Swapy } from "swapy";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

export function DraggableList({
  title = "",
  loading = false,
  children,
  className,
  canSwap = true,
  onSwapEnd,
}: {
  title?: string;
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
  canSwap?: boolean;
  onSwapEnd?: (e: SwapEndEvent) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const swapy = useRef<Swapy | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (containerRef.current && canSwap) {
      swapy.current = createSwapy(containerRef.current, {
        swapMode: "hover",
        animation: "spring",
        autoScrollOnDrag: true,
      });
      swapy.current.onSwapEnd((event) => {
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          onSwapEnd?.(event);
        }, 100);
      });
    }

    return () => {
      swapy.current?.destroy();
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [containerRef, canSwap, onSwapEnd]);

  return (
    <Card className={cn("h-[70vh] min-h-[400px] overflow-auto", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {loading && <Loader2 className="size-5 animate-spin" />}
      </CardHeader>
      <CardContent ref={containerRef}>{children}</CardContent>
    </Card>
  );
}
