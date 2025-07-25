import type { ReactNode } from "react";

export type DropdownOption = {
  id: string;
  label: string;
  action: () => void;
  icon?: ReactNode;
  selected?: boolean;
};

export type DropdownProps = {
  options: DropdownOption[];
  children: ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
};
