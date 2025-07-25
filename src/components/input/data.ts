import type { ComponentProps, ReactNode } from "react";

export interface IInputProps extends ComponentProps<"input"> {
  label?: string;
  error?: string;
  shouldShowError?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface IInputLayout extends IInputProps {}
