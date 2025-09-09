"use client";

import { cn } from "../../lib/utils"; // Make sure you have a cn utility
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import {
  cloneElement,
  isValidElement,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";

type DrawerComponentProps = {
  side?: "top" | "bottom" | "left" | "right";
  trigger?: ReactNode;
  title: string;
  description?: string;
  className?: string;
  children?: ReactElement;
};

export function DrawerComponent({
  side = "right",
  trigger,
  title,
  description,
  className,
  children,
}: DrawerComponentProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const enhancedChildren =
    isValidElement(children) &&
    cloneElement(children as ReactElement<{ onClose?: () => void }>, {
      onClose: () => closeBtnRef.current?.click(),
    });
  return (
    <Sheet>
      <SheetTrigger asChild ref={closeBtnRef}>
        {trigger}
      </SheetTrigger>
      <SheetContent
        side={side}
        className={cn(
          "sm:max-w-full", // Your desired width
          className, // Allow custom className from props
        )}
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="my-4 px-4">{enhancedChildren}</div>
      </SheetContent>
    </Sheet>
  );
}
