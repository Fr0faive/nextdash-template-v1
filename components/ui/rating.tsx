"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "./button";

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  maxItems?: number;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export function Rating({
  value,
  defaultValue = 0,
  onChange,
  maxItems = 5,
  readOnly = false,
  size = "md",
  label,
  error,
  className,
  disabled = false,
}: RatingProps) {
  const [internalValue, setInternalValue] = React.useState(
    value !== undefined ? value : defaultValue
  );
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleMouseEnter = (index: number) => {
    if (!readOnly && !disabled) {
      setHoverValue(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly && !disabled) {
      setHoverValue(null);
    }
  };

  const handleClick = (index: number) => {
    if (!readOnly && !disabled) {
      setInternalValue(index);
      onChange?.(index);
    }
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const gapClasses = {
    sm: "gap-1",
    md: "gap-1.5",
    lg: "gap-2",
  };

  const currentValue = hoverValue !== null ? hoverValue : internalValue;

  return (
    <div className={cn("space-y-2 w-full", className)}>
      {label && (
        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex items-center",
          gapClasses[size],
          disabled && "opacity-50 cursor-not-allowed",
          readOnly && "cursor-default",
          !disabled && !readOnly && "cursor-pointer"
        )}
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: maxItems }).map((_, i) => {
          const starValue = i + 1;
          const isActive = starValue <= currentValue;
          
          return (
            <div
              key={i}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onClick={() => handleClick(starValue)}
              className="transition-transform active:scale-90"
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "transition-colors duration-200",
                  isActive
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-accent text-accent-foreground/20 hover:text-accent-foreground/40"
                )}
              />
            </div>
          );
        })}
      </div>

      {error && (
        <p className="text-[10px] font-medium text-destructive ml-1">
          {error}
        </p>
      )}
    </div>
  );
}
