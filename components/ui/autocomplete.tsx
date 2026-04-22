"use client";

import * as React from "react";
import { Search, X, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./button";

interface Option {
  label: string;
  value: string;
}

interface AutocompleteProps {
  label?: string;
  options: Option[];
  value?: string | string[];
  onChange?: (value: any) => void;
  placeholder?: string;
  isLoading?: boolean;
  multiple?: boolean;
  className?: string;
}

export function Autocomplete({
  label,
  options,
  value,
  onChange,
  placeholder = "Search...",
  isLoading = false,
  multiple = false,
  className,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [internalValue, setInternalValue] = React.useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : [],
  );
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

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

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase()),
  );

  const toggleOption = (optionValue: string, optionLabel: string) => {
    let newValues: string[];
    if (multiple) {
      newValues = internalValue.includes(optionValue)
        ? internalValue.filter((v) => v !== optionValue)
        : [...internalValue, optionValue];
      setQuery("");
    } else {
      newValues = [optionValue];
      setQuery(optionLabel);
      setIsOpen(false);
    }

    setInternalValue(newValues);
    onChange?.(multiple ? newValues : newValues[0]);
    if (multiple) inputRef.current?.focus();
  };

  const removeValue = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    const newValues = internalValue.filter((v) => v !== optionValue);
    setInternalValue(newValues);
    onChange?.(multiple ? newValues : newValues[0] || "");
    if (!multiple) setQuery("");
  };

  const selectedOptions = options.filter((opt) =>
    internalValue.includes(opt.value),
  );

  return (
    <div className={cn("space-y-2 w-full", className)} ref={containerRef}>
      {label && (
        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
          {label}
        </label>
      )}

      <div className="relative">
        <div
          onClick={() => inputRef.current?.focus()}
          className={cn(
            "min-h-14 w-full px-4 py-2 bg-accent/40 rounded-2xl border-2 border-transparent transition-all cursor-text",
            "flex flex-wrap items-center gap-2 pr-10",
            isOpen
              ? "border-primary bg-card ring-4 ring-primary/5 shadow-lg"
              : "hover:bg-accent/60",
          )}
        >
          {multiple &&
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
            ))}

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={
              multiple && internalValue.length > 0 ? "" : placeholder
            }
            className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm p-1"
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {!multiple && internalValue.length > 0 && !isOpen && (
              <button
                onClick={(e) => removeValue(e, internalValue[0])}
                className="p-1 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            ) : (
              <Search className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (query || filteredOptions.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-2 bg-card/80 border rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl p-2"
            >
              <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-1">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
                    const isSelected = internalValue.includes(option.value);
                    return (
                      <div
                        key={option.value}
                        onClick={() => toggleOption(option.value, option.label)}
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
                  })
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No results found for "{query}"
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
