"use client";

import * as React from "react";
import { ChevronUp, ChevronDown, Minus, Plus } from "lucide-react";
import { cn } from "./button";

interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  variant?: "standard" | "stepper";
}

export function InputNumber({
  label,
  error,
  min = -Infinity,
  max = Infinity,
  step = 1,
  value,
  defaultValue,
  onChange,
  variant = "standard",
  className,
  ...props
}: InputNumberProps) {
  const [internalValue, setInternalValue] = React.useState<number>(defaultValue ?? value ?? 0);

  const updateValue = (newValue: number) => {
    const clamped = Math.max(min, Math.min(max, newValue));
    setInternalValue(clamped);
    onChange?.(clamped);
  };

  const increment = () => updateValue(internalValue + step);
  const decrement = () => updateValue(internalValue - step);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      updateValue(val);
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="text-sm font-bold text-foreground/80 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative flex items-center group">
        {variant === "stepper" && (
          <button
            type="button"
            onClick={decrement}
            disabled={internalValue <= min}
            className="absolute left-1 z-10 p-2 rounded-xl hover:bg-accent text-muted-foreground disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <Minus className="w-4 h-4" />
          </button>
        )}

        <input
          type="number"
          value={internalValue}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          className={cn(
            "w-full bg-accent/40 border-2 border-transparent rounded-2xl py-2.5 px-4 text-sm focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            variant === "stepper" && "text-center px-12",
            error ? "border-destructive/50 focus:border-destructive focus:ring-destructive/10" : "hover:border-primary/10",
            className
          )}
          {...props}
        />

        {variant === "stepper" ? (
          <button
            type="button"
            onClick={increment}
            disabled={internalValue >= max}
            className="absolute right-1 z-10 p-2 rounded-xl hover:bg-accent text-muted-foreground disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        ) : (
          <div className="absolute right-1 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={increment}
              className="p-1 rounded-md hover:bg-accent text-muted-foreground transition-colors"
            >
              <ChevronUp className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={decrement}
              className="p-1 rounded-md hover:bg-accent text-muted-foreground transition-colors"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-[11px] font-medium text-destructive ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
