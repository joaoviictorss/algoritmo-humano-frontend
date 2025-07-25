import { Input as ShadInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { IInputLayout } from "../data";

export const Input = ({
  id,
  placeholder,
  required,
  label,
  className,
  error,
  leftIcon,
  rightIcon,
  shouldShowError = true,
  ...rest
}: IInputLayout) => {
  return (
    <div className="flex w-full flex-col items-start">
      {label && (
        <Label className="mb-1" htmlFor={id}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      <div className="relative w-full">
        {leftIcon && (
          <div className="-translate-y-1/2 absolute top-1/2 left-3 transform text-muted-foreground">
            {leftIcon}
          </div>
        )}

        <ShadInput
          className={cn(
            `${error && "border-error"}`,
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          id={id}
          placeholder={placeholder}
          {...rest}
        />

        {rightIcon && (
          <div
            className={cn(
              "-translate-y-1/2 absolute top-1/2 right-3 transform text-muted-foreground"
            )}
          >
            {rightIcon}
          </div>
        )}
      </div>

      {shouldShowError && (
        <span
          className={`mt-1 h-0 overflow-hidden transition-all duration-150 ${
            error && "h-[1rem]"
          }`}
        >
          <div
            className={`text-xs opacity-0 ${
              error && "text-destructive opacity-100"
            }`}
          >
            {error}
          </div>
        </span>
      )}
    </div>
  );
};
