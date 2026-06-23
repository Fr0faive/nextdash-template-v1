"use client";

import * as React from "react";
import { ChevronDown, X, Check, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./button";

export interface MultiSelectOption {
  label: string;
  value: string;
  group?: string;
}

export interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  helperText?: string;
  variant?: "basic" | "chips";
  searchable?: boolean;
  className?: string;
  disabled?: boolean;
  defaultValue?: string[];
}

export function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Select options...",
  helperText,
  variant = "chips",
  searchable = false,
  className,
  disabled = false,
  defaultValue = [],
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [internalValue, setInternalValue] = React.useState<string[]>(
    value || defaultValue
  );
  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen, searchable]);

  const toggleOption = (optionValue: string) => {
    if (disabled) return;
    const newValues = internalValue.includes(optionValue)
      ? internalValue.filter((v) => v !== optionValue)
      : [...internalValue, optionValue];
    
    setInternalValue(newValues);
    onChange?.(newValues);
  };

  const removeValue = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    if (disabled) return;
    const newValues = internalValue.filter((v) => v !== optionValue);
    setInternalValue(newValues);
    onChange?.(newValues);
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group options if they have a group property
  const groupedOptions = filteredOptions.reduce((acc, option) => {
    const group = option.group || "Ungrouped";
    if (!acc[group]) acc[group] = [];
    acc[group].push(option);
    return acc;
  }, {} as Record<string, MultiSelectOption[]>);

  const hasGroups = options.some((opt) => opt.group);
  const selectedOptions = options.filter((opt) =>
    internalValue.includes(opt.value)
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
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "min-h-14 w-full px-4 py-2 bg-accent/40 rounded-2xl border-2 border-transparent transition-all",
            !disabled ? "cursor-pointer" : "cursor-not-allowed opacity-50",
            "flex flex-wrap items-center gap-2 pr-10",
            isOpen
              ? "border-primary bg-card ring-4 ring-primary/5 shadow-lg"
              : "hover:bg-accent/60"
          )}
        >
          {selectedOptions.length > 0 ? (
            variant === "chips" ? (
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
              <span className="text-sm text-foreground font-medium truncate">
                {selectedOptions.map((o) => o.label).join(", ")}
              </span>
            )
          ) : (
            <span className="text-sm text-muted-foreground">{placeholder}</span>
          )}

          <ChevronDown
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-transform duration-300",
              isOpen && "rotate-180 text-primary"
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
              className="absolute z-50 w-full mt-2 bg-card/80 border rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col"
            >
              {searchable && (
                <div className="p-2 border-b border-border/50 bg-background/50">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="w-full bg-accent/50 border-none rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/60"
                      placeholder="Search options..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              )}

              <div className="max-h-60 overflow-y-auto custom-scrollbar p-2 space-y-1">
                {filteredOptions.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground py-4">
                    No options found.
                  </div>
                ) : hasGroups ? (
                  Object.entries(groupedOptions).map(([group, opts]) => (
                    <div key={group} className="mb-2 last:mb-0">
                      {group !== "Ungrouped" && (
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                          {group}
                        </div>
                      )}
                      <div className="space-y-1">
                        {opts.map((option) => {
                          const isSelected = internalValue.includes(option.value);
                          return (
                            <div
                              key={option.value}
                              onClick={() => toggleOption(option.value)}
                              className={cn(
                                "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                                isSelected
                                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                                  : "hover:bg-accent text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {option.label}
                              {isSelected && <Check className="w-4 h-4" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = internalValue.includes(option.value);
                    return (
                      <div
                        key={option.value}
                        onClick={() => toggleOption(option.value)}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors cursor-pointer",
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "hover:bg-accent text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {option.label}
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                    );
                  })
                )}
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
