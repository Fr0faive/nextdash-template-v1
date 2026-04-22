"use client";

import * as React from "react";
import { ChevronDown, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./button";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value?: string | string[];
  onChange?: (value: any) => void;
  placeholder?: string;
  helperText?: string;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
  defaultValue?: string | string[];
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = "Select option...",
  helperText,
  multiple = false,
  className,
  disabled = false,
  defaultValue,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string[]>(
    Array.isArray(value || defaultValue)
      ? ((value || defaultValue) as string[])
      : value || defaultValue
        ? [(value || defaultValue) as string]
        : [],
  );
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(Array.isArray(value) ? value : value ? [value] : []);
    }
  }, [value]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    if (disabled) return;

    let newValues: string[];
    if (multiple) {
      newValues = internalValue.includes(optionValue)
        ? internalValue.filter((v) => v !== optionValue)
        : [...internalValue, optionValue];
    } else {
      newValues = [optionValue];
      setIsOpen(false);
    }

    setInternalValue(newValues);
    onChange?.(multiple ? newValues : newValues[0]);
  };

  const removeValue = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    if (disabled) return;
    const newValues = internalValue.filter((v) => v !== optionValue);
    setInternalValue(newValues);
    onChange?.(multiple ? newValues : newValues[0] || "");
  };

  const selectedOptions = options.filter((opt) =>
    internalValue.includes(opt.value),
  );
  const displayLabel = multiple
    ? null
    : selectedOptions.length > 0
      ? selectedOptions[0].label
      : placeholder;

  return (
    <div className={cn("space-y-2 w-full", className)} ref={containerRef}>
      {label && (
        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
          {label}
        </label>
      )}

      <div className="relative">
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "min-h-14 w-full px-4 py-2 bg-accent/40 rounded-2xl border-2 border-transparent transition-all",
            !disabled ? "cursor-pointer" : "cursor-not-allowed opacity-50",
            "flex flex-wrap items-center gap-2 pr-10",
            isOpen
              ? "border-primary bg-card ring-4 ring-primary/5 shadow-lg"
              : "hover:bg-accent/60",
          )}
        >
          {multiple ? (
            selectedOptions.length > 0 ? (
              selectedOptions.map((opt) => (
                <motion.div
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={opt.value}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-primary text-primary-foreground rounded-xl text-xs font-bold shadow-sm"
                >
                  {opt.label}
                  <X
                    className="w-3 h-3 cursor-pointer hover:bg-white/20 rounded-full transition-colors"
                    onClick={(e) => removeValue(e, opt.value)}
                  />
                </motion.div>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                {placeholder}
              </span>
            )
          ) : (
            <span
              className={cn(
                "text-sm",
                selectedOptions.length > 0
                  ? "text-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              {displayLabel}
            </span>
          )}

          <ChevronDown
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-transform duration-300",
              isOpen && "rotate-180 text-primary",
            )}
          />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-2 bg-card/80 border rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl p-2"
            >
              <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-1">
                {options.map((option) => {
                  const isSelected = internalValue.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      onClick={() => toggleOption(option.value)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors cursor-pointer",
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : "hover:bg-accent text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {option.label}
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {helperText && (
        <p className="text-[10px] font-medium text-muted-foreground ml-1">
          {helperText}
        </p>
      )}
    </div>
  );
}
