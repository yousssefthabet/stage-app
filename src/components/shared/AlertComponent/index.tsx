"use client";

import React, { useRef, useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import {
  AlertDialogCancel,
  AlertDialogDescription,
} from "@radix-ui/react-alert-dialog";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

type AlertModalProps = {
  children?: ReactNode;
  title: string;
  description?: string;
  onConfirm: () => Promise<void>;
};

export function AlertModal({
  children,
  title,
  description,
  onConfirm,
}: AlertModalProps) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  async function handler() {
    setIsLoading(true);
    startTransition(async () => {
      await onConfirm();
      closeBtnRef.current?.click();
      setIsLoading(false);
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-md rounded-md">
        <AlertDialogHeader className="flex flex-col items-center gap-2 text-left">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            ref={closeBtnRef}
            className="bg-primary hover:bg-primary cursor-pointer rounded-md px-3 text-white"
          >
            Annuler
          </AlertDialogCancel>
          <Button
            onClick={handler}
            disabled={isPending || isLoading}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {isPending || isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
