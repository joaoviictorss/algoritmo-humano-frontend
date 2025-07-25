"use client";

export * from "./data";

import { Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DropdownProps } from "./data";

export const Dropdown = ({
  options,
  children,
  align = "center",
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
            className={`flex w-full cursor-pointer items-center gap-2 ${
              option.selected
                ? "bg-accent font-medium text-accent-foreground"
                : ""
            }`}
            key={option.id}
            onClick={(e) => {
              e.preventDefault();
              option.action();
            }}
          >
            {option.icon && <span className="">{option.icon}</span>}
            <span className="flex-1">{option.label}</span>
            {option.selected && <Check className="text-primary" size={16} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
