"use client";

import { Button } from "../../ui/button";
import React from "react";
import clsx from "clsx";

interface SharedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const SharedButton: React.FC<SharedButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <Button
      variant="outline"
      className={clsx(
        "bg-primary-dark hover:bg-primary-dark hover:text-secondary-clr h-10 w-10 cursor-pointer rounded-full border-0",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SharedButton;
