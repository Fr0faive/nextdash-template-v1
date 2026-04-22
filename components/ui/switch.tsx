import * as React from "react";
import { cn } from "./button";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-3 cursor-pointer group w-fit">
        <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50">
          <input
            type="checkbox"
            className="peer sr-only"
            ref={ref}
            {...props}
          />
          <div className={cn(
            "pointer-events-none block h-full w-full rounded-full bg-muted-foreground/20 border-2 border-transparent transition-all duration-300 peer-checked:bg-primary",
            className
          )} />
          <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-5" />
        </div>
        {label && <span className="text-sm font-medium text-foreground select-none">{label}</span>}
      </label>
    );
  }
);

Switch.displayName = "Switch";
