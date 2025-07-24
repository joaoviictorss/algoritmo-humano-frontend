"use client";

import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type DropdownOption = {
  id: string;
  label: string;
  action: () => void;
  icon?: ReactNode;
};

type DropdownProps = {
  options: DropdownOption[];
  children: ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
};

export const Dropdown = ({
  options,
  children,
  align = "end",
  side = "bottom",
  className = "",
}: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-56" side={side}>
        {options.map((option) => (
          <DropdownMenuItem
            className="flex w-full cursor-pointer items-center gap-2"
            key={option.id}
            onClick={(e) => {
              e.preventDefault();
              option.action();
            }}
          >
            {option.icon && <span className="">{option.icon}</span>}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
