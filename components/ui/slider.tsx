"use client";

import * as React from "react";
import { cn } from "./button";

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue"> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  label?: string;
  error?: string;
  showValue?: boolean;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      onChange,
      label,
      error,
      disabled = false,
      showValue = false,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number>(
      value ?? defaultValue ?? min
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    // Calculate percentage for background fill
    const percentage = ((internalValue - min) / (max - min)) * 100;

    return (
      <div className={cn("space-y-3 w-full", className)}>
        {(label || showValue) && (
          <div className="flex items-center justify-between ml-1">
            {label && (
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-xs font-bold text-foreground bg-accent/50 px-2 py-0.5 rounded-md">
                {internalValue}
              </span>
            )}
          </div>
        )}

        <div className="relative flex items-center w-full h-5">
          {/* Custom track background (the unfilled part) */}
          <div className="absolute w-full h-2 bg-accent rounded-full overflow-hidden pointer-events-none">
            {/* The filled part */}
            <div
              className="h-full bg-primary transition-all duration-75"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={internalValue}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              "absolute w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
              // We make the actual input invisible but keep it on top to capture clicks and drags.
              // We'll style a custom thumb instead below if needed, but using native thumb is easier for touch.
              // To make native thumb work while hiding the track, we can use standard webkit/moz pseudo classes,
              // or just keep it simple: the input handles the interaction, our custom divs handle the track visual.
              // To ensure the thumb is visible, we actually need to style the native thumb, or use a custom element.
            )}
            {...props}
          />

          {/* Custom thumb visual */}
          <div
            className={cn(
              "absolute w-5 h-5 bg-card border-2 border-primary rounded-full shadow-md pointer-events-none transition-transform",
              disabled && "opacity-50 border-muted-foreground bg-muted"
            )}
            style={{
              left: `calc(${percentage}% - 10px)`, // Center the thumb
            }}
          />
        </div>

        {error && (
          <p className="text-[10px] font-medium text-destructive ml-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";
