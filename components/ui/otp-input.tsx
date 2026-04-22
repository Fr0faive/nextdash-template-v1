"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "./button";

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function OTPInput({
  length = 6,
  value = "",
  onChange,
  onComplete,
  label,
  disabled = false,
  className,
}: OTPInputProps) {
  const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(""));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (value) {
      setOtp(value.split("").slice(0, length));
    }
  }, [value, length]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const val = element.value.replace(/\D/g, "");

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);
    const combinedOtp = newOtp.join("");
    onChange?.(combinedOtp);

    // Focus next if a digit was entered
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (combinedOtp.length === length) {
      onComplete?.(combinedOtp);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      onChange?.(newOtp.join(""));
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const data = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .split("")
      .slice(0, length);
    if (data.length === 0) return;

    const newOtp = [...otp];
    data.forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    const combinedOtp = newOtp.join("");
    onChange?.(combinedOtp);

    // Focus last filled or first empty
    const nextIndex = Math.min(data.length, length - 1);
    inputRefs.current[nextIndex]?.focus();

    if (combinedOtp.length === length) {
      onComplete?.(combinedOtp);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
          {label}
        </label>
      )}

      <div className="flex gap-2 sm:gap-4 justify-between items-center">
        {otp.map((digit, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="flex-1 max-w-[64px]"
          >
            <input
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={disabled}
              onFocus={(e) => e.target.select()}
              onChange={(e) => handleChange(e.target, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              className={cn(
                "w-full h-14 sm:h-16 text-center text-xl sm:text-2xl font-black rounded-2xl bg-accent/40 border-2 border-transparent transition-all outline-none",
                "focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/5",
                digit &&
                  "border-primary/20 bg-card text-primary shadow-lg shadow-primary/5",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
