"use client";

import * as React from "react";
import { X, Palette, Moon, Sun, Check } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/components/ui/button";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const accents = [
  { name: "Blue", value: "blue", class: "bg-blue-500" },
  { name: "Violet", value: "violet", class: "bg-violet-500" },
  { name: "Rose", value: "rose", class: "bg-rose-500" },
  { name: "Orange", value: "orange", class: "bg-orange-500" },
  { name: "Zinc", value: "zinc", class: "bg-zinc-500" },
] as const;

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const {
    theme,
    setTheme,
    accent,
    setAccent,
    toastPosition,
    setToastPosition,
  } = useTheme();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isLight = mounted && theme === "light";
  const isDark = mounted && theme === "dark";

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-60 transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={cn(
          "fixed right-0 top-0 bottom-0 w-80 bg-card border-l z-70 transition-transform duration-300 ease-in-out p-6 shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Theme Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-accent transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-8 mb-8">
          {/* Accent Color */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Accent Color
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {accents.map((a) => (
                <button
                  key={a.value}
                  onClick={() => setAccent(a.value as any)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-2xl border transition-all hover:border-primary",
                    accent === a.value
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-transparent bg-accent/50",
                  )}
                >
                  <div className={cn("w-4 h-4 rounded-full", a.class)} />
                  <span className="text-sm font-medium">{a.name}</span>
                  {accent === a.value && (
                    <Check className="w-3 h-3 ml-auto text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Appearance
            </h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl border transition-all",
                  isLight
                    ? "border-primary bg-primary/5"
                    : "border-transparent bg-accent/50",
                )}
              >
                <Sun className="w-5 h-5 text-orange-500" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold">Light Mode</span>
                  <span className="text-xs text-muted-foreground">
                    Classic bright appearance
                  </span>
                </div>
                {isLight && (
                  <Check className="w-4 h-4 ml-auto text-primary" />
                )}
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl border transition-all",
                  isDark
                    ? "border-primary bg-primary/5"
                    : "border-transparent bg-accent/50",
                )}
              >
                <Moon className="w-5 h-5 text-violet-500" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold">Dark Mode</span>
                  <span className="text-xs text-muted-foreground">
                    Easier on the eyes at night
                  </span>
                </div>
                {isDark && (
                  <Check className="w-4 h-4 ml-auto text-primary" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Toast Position */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Toast Position
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Top Left", value: "top-left" },
              { label: "Top Center", value: "top-center" },
              { label: "Top Right", value: "top-right" },
              { label: "Bottom Left", value: "bottom-left" },
              { label: "Bottom Center", value: "bottom-center" },
              { label: "Bottom Right", value: "bottom-right" },
            ].map((pos) => (
              <button
                key={pos.value}
                onClick={() => setToastPosition(pos.value as any)}
                className={cn(
                  "px-3 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-tight transition-all",
                  toastPosition === pos.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-transparent bg-accent/50 text-muted-foreground hover:border-primary/30",
                )}
              >
                {pos.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-accent/50 rounded-2xl border border-dashed border-muted-foreground/20">
          <p className="text-xs text-muted-foreground leading-relaxed text-center">
            Changes are applied instantly and saved to your browser's local
            storage.
          </p>
        </div>
      </aside>
    </>
  );
}
