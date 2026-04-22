"use client";

import * as React from "react";
import { ChevronDown, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./button";

const COUNTRY_CODES = [
  { code: "+62", country: "ID", flag: "🇮🇩" },
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
];

interface PhoneInputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export function PhoneInput({
  label,
  value = "",
  onChange,
  placeholder = "812 3456 7890",
  className,
  error,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(
    COUNTRY_CODES[0],
  );
  const [phoneNumber, setPhoneNumber] = React.useState(value);
  const containerRef = React.useRef<HTMLDivElement>(null);

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setPhoneNumber(val);
    onChange?.(`${selectedCountry.code}${val}`);
  };

  const handleCountrySelect = (country: (typeof COUNTRY_CODES)[0]) => {
    setSelectedCountry(country);
    setIsOpen(false);
    onChange?.(`${country.code}${phoneNumber}`);
  };

  return (
    <div className={cn("space-y-2 w-full", className)} ref={containerRef}>
      {label && (
        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
          {label}
        </label>
      )}

      <div className="relative flex gap-2">
        {/* Country Code Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "h-14 px-4 bg-accent/40 rounded-2xl border-2 border-transparent transition-all flex items-center gap-2 hover:bg-accent/60",
              isOpen &&
                "border-primary bg-card ring-4 ring-primary/5 shadow-lg",
            )}
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-bold">{selectedCountry.code}</span>
            <ChevronDown
              className={cn(
                "w-3 h-3 text-muted-foreground transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute z-50 mt-2 w-48 bg-card/80 border rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl p-2"
              >
                <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-1">
                  {COUNTRY_CODES.map((c) => (
                    <button
                      key={c.country}
                      onClick={() => handleCountrySelect(c)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors hover:bg-accent",
                        selectedCountry.country === c.country &&
                          "bg-primary/10 text-primary",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span>{c.flag}</span>
                        <span className="font-bold">{c.code}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {c.country}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Number Input */}
        <div className="relative flex-1 ">
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            className={cn(
              "h-14 w-full bg-accent/40 border-2 border-transparent rounded-2xl pl-11 pr-4 text-sm font-medium outline-none transition-all",
              "focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/5",
              error &&
                "border-destructive/50 focus:border-destructive focus:ring-destructive/5",
            )}
          />
        </div>
      </div>

      {error && (
        <p className="text-[10px] font-medium text-destructive ml-1">{error}</p>
      )}
    </div>
  );
}
