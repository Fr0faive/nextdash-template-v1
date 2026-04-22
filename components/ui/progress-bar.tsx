import * as React from "react";
import { cn } from "./button";

interface ProgressProps {
  value: number; // 0 to 100
  className?: string;
  indicatorClassName?: string;
  showValue?: boolean;
}

export function ProgressBar({ value, className, indicatorClassName, showValue }: ProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div className="w-full space-y-2">
      {showValue && (
        <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={cn("h-3 w-full bg-accent/50 rounded-full overflow-hidden", className)}>
        <div
          className={cn(
            "h-full bg-primary transition-all duration-500 ease-out rounded-full shadow-[0_0_12px_rgba(var(--primary),0.3)]",
            indicatorClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
