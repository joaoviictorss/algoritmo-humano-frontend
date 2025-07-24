import { Input as ShadInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { IInputData } from "../data";

export const Input = ({
  id,
  placeholder,
  required,
  label,
  className,
  error,
  ...rest
}: IInputData) => {
  return (
    <div className="flex flex-col items-start gap-1">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      <ShadInput
        className={cn(`${error && "border-error"}`, className)}
        id={id}
        placeholder={placeholder}
        {...rest}
      />

      <span
        className={`h-0 overflow-hidden transition-all duration-150 ${
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
    </div>
  );
};
