import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "./button";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer group w-fit">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            className="peer sr-only"
            ref={ref}
            {...props}
          />
          <div className={cn(
            "w-5 h-5 rounded-lg border-2 border-muted-foreground/30 bg-transparent transition-all duration-200",
            "peer-checked:bg-primary peer-checked:border-primary peer-focus-visible:ring-4 peer-focus-visible:ring-primary/20",
            "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
            "group-hover:border-primary/50 peer-checked:group-hover:border-primary",
            className
          )} />
          <Check className="absolute w-3.5 h-3.5 text-primary-foreground opacity-0 scale-50 transition-all duration-200 peer-checked:opacity-100 peer-checked:scale-100" />
        </div>
        {label && <span className="text-sm font-medium text-foreground select-none">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
